import asyncio
import re
from pathlib import Path
from urllib.parse import quote
from playwright.async_api import async_playwright
from common_filter import save_to_csv_with_filter

_STATUS_MARKERS = {
    "안심결제", "안심번호", "인증셀러", "판매완료", "예약중", "거래완료", 
    "착불", "무료배송", "배송비포함", "직거래", "택배거래"
}


def parse_joongna_card_text(raw_text: str):
    """
    중고나라 상품 카드 텍스트 파싱
    - '안심결제', '인증셀러' 등 배지 단독 줄 제외
    - 제목에 '안심결제'가 붙어있는 경우 배지 텍스트만 제거 후 순수 제목 추출
    """
    lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
    if not lines:
        return None, ""

    title = ""
    price = ""
    found_title = False

    for line in lines:
        # 배지 키워드 제거
        cleaned_line = line
        for marker in _STATUS_MARKERS:
            cleaned_line = cleaned_line.replace(marker, "").strip()

        # 1. 제목 탐색
        if not found_title:
            # 배지만 있던 줄이거나 "판매하기" 등의 UI 텍스트는 건너뜀
            if cleaned_line in _STATUS_MARKERS or len(cleaned_line) <= 1 or cleaned_line == "판매하기":
                continue

            title = cleaned_line
            found_title = True
            continue

        # 2. 가격 탐색
        if found_title and price == "":
            if line == "원":
                continue
            if "원" in line or (
                line.replace(",", "").isdigit() and len(line.replace(",", "")) >= 3
            ):
                price = line
                break

    if not title or title == "판매하기":
        return None, ""

    return title, price


async def scrape_joongna_async(
    brand="구찌",
    category_id="103",
    category_filter="가방",
    min_price=40000,
    max_pages=5,
    headless=True,
    output_filename=None,
):
    """중고나라 크롤링 및 common_filter 적용 함수"""
    output_filename = (
        output_filename or f"csv_data/joongna/joongna_{brand}_{category_filter}.csv"
    )
    encoded_keyword = quote(brand)
    raw_products = []

    print(
        f"[중고나라] '{brand}' (카테고리ID: {category_id}, 필터명: {category_filter}) 수집 시작... (최대 {max_pages}페이지)"
    )

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=headless,
            args=["--disable-blink-features=AutomationControlled"],
        )
        context = await browser.new_context(
            viewport={"width": 1280, "height": 800},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ),
        )
        page = await context.new_page()
        page.set_default_timeout(60000)

        for page_num in range(1, max_pages + 1):
            target_url = (
                f"https://web.joongna.com/search/{encoded_keyword}?page={page_num}&category={category_id}"
            )
            print(f"[중고나라 {page_num}페이지] 접속 중: {target_url}")

            try:
                await page.goto(
                    target_url, wait_until="domcontentloaded", timeout=60000
                )
                await asyncio.sleep(2)

                # 스크롤 렌더링 유도
                for _ in range(3):
                    await page.mouse.wheel(0, 1000)
                    await asyncio.sleep(0.8)

                product_cards = await page.query_selector_all(
                    "a[href*='/product/']"
                )
                if not product_cards:
                    print(
                        f"--> {page_num} 페이지에서 상품을 찾지 못해 수집을 마칩니다."
                    )
                    break

                page_items = []
                for card in product_cards:
                    try:
                        href = await card.get_attribute("href")
                        detail_url = (
                            f"https://web.joongna.com{href}"
                            if href and href.startswith("/")
                            else href
                        )

                        raw_text = await card.inner_text()
                        title, price_str = parse_joongna_card_text(raw_text)
                        if not title:
                            continue

                        # 숫자 가격 변환 ('250,000원' -> 250000)[cite: 4]
                        price_digits = re.sub(r"[^0-9]", "", price_str)
                        price_val = int(price_digits) if price_digits else 0

                        # 이미지 URL 추출 (Lazy loading 대응)
                        img_elem = await card.query_selector("img")
                        img_url = ""
                        if img_elem:
                            img_url = await img_elem.evaluate(
                                """el => el.currentSrc || el.src || el.getAttribute('data-src') || el.getAttribute('srcset') || ''"""
                            )
                            if img_url and (" " in img_url or "," in img_url):
                                img_url = (
                                    img_url.split(",")[0]
                                    .strip()
                                    .split(" ")[0]
                                )
                            if img_url.startswith("data:image"):
                                img_url = ""

                        page_items.append(
                            {
                                "플랫폼": "중고나라",
                                "브랜드": brand,
                                "품목": category_filter,
                                "제목": title,
                                "가격": price_val,
                                "이미지URL": img_url,
                                "매물URL": detail_url,
                            }
                        )
                    except Exception:
                        continue

                # 중복 제거 (매물URL 기준)
                unique_items = list(
                    {item["매물URL"]: item for item in page_items}.values()
                )
                if not unique_items:
                    print(
                        f"--> {page_num} 페이지 데이터 정리 중 끝을 감지했습니다."
                    )
                    break

                raw_products.extend(unique_items)
                print(
                    f"    └ {len(unique_items)}개 상품 수집 완료 (누적: {len(raw_products)}개)"
                )
                await asyncio.sleep(1.5)

            except Exception as e:
                print(f"⚠️ {page_num} 페이지 진행 중 오류 발생: {e}")
                continue

        await browser.close()

    # URL 기준 전체 중복 제거
    final_unique_products = list(
        {item["매물URL"]: item for item in raw_products}.values()
    )

    # common_filter.py의 3대 필터링(가격, 타브랜드, 타품목) 적용 후 joongna/ 저장
    return save_to_csv_with_filter(
        final_unique_products,
        output_filename,
        target_brand=brand,
        target_category=category_filter,
        min_price=min_price,
    )


def scrape_joongna(
    brand="구찌",
    category_id="103",
    category_filter="가방",
    min_price=40000,
    max_pages=5,
    headless=True,
    output_filename=None,
):
    """동기 호출용 래퍼 함수"""
    return asyncio.run(
        scrape_joongna_async(
            brand=brand,
            category_id=category_id,
            category_filter=category_filter,
            min_price=min_price,
            max_pages=max_pages,
            headless=headless,
            output_filename=output_filename,
        )
    )


# if __name__ == "__main__":
    # scrape_joongna(brand="구찌", category_id="103", category_filter="가방", min_price=40000, max_pages=3,headless=True)