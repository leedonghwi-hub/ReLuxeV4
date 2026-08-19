# daangn_crawler.py
import asyncio
import re
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlparse
from playwright.async_api import async_playwright
from common_filter import save_to_csv_with_filter

_PRICE_PATTERN = re.compile(r"(?:\d[\d,]*\s*원|나눔)")
_TIME_PATTERN = re.compile(r"(?:방금\s*전|(?:끌올\s*)?\d+\s*(?:초|분|시간|일|주|개월|달|년)\s*전)")
_IGNORED_LINES = {"끌올", "판매완료", "예약중", "거래완료"}


def resolve_daangn_item_url(raw_href: str | None) -> str | None:
    """당근마켓 링크에서 순수 매물 상세 URL만 정제"""
    if not raw_href:
        return None

    full_url = urljoin("https://www.daangn.com", raw_href.strip())
    parsed = urlparse(full_url)
    path = parsed.path.rstrip("/")

    prefix = "/kr/buy-sell/"
    if not path.startswith(prefix):
        return None

    remainder = path[len(prefix):]
    if not remainder or remainder == "s" or remainder.startswith("s/"):
        return None

    return f"{parsed.scheme}://{parsed.netloc}{parsed.path}"


def parse_daangn_card_text(raw_text: str):
    """당근마켓 카드 텍스트에서 제목과 가격 추출"""
    lines = [
        re.sub(r"\s+", " ", line).strip(" ·\t\r\n")
        for line in raw_text.splitlines()
        if line.strip() and line.strip() not in _IGNORED_LINES
    ]
    if not lines:
        return None, 0

    price_val = 0
    price_str = None
    for line in lines:
        match = _PRICE_PATTERN.search(line)
        if match:
            price_str = match.group(0)
            if "나눔" in price_str:
                price_val = 0
            else:
                digits = re.sub(r"[^0-9]", "", price_str)
                price_val = int(digits) if digits else 0
            break

    title = None
    for line in lines:
        if (price_str and price_str in line) or _TIME_PATTERN.search(line) or line.startswith(("관심 ", "채팅 ")):
            continue
        title = line
        break

    return title, price_val


async def scrape_daangn_async(
    brand="구찌", category="가방", min_price=40000, scroll_count=6, headless=True, output_filename=None
):
    """당근마켓 비동기 크롤링 함수 (결과: carrot/ 폴더 저장)"""
    query = f"{brand} {category}".strip()
    target_url = f"https://www.daangn.com/kr/buy-sell/?{urlencode({'search': query})}"
    
    # 기본 저장 경로를 carrot 폴더 내부로 설정
    output_filename = output_filename or f"csv_data/carrot/daangn_{brand}_{category}.csv"

    raw_products = []
    print(f"[당근마켓] '{brand} {category}' 수집 시작...")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=headless)
        page = await browser.new_page()
        await page.goto(target_url, wait_until="domcontentloaded", timeout=15000)

        for _ in range(scroll_count):
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await asyncio.sleep(1.2)

        cards = await page.query_selector_all("a[href*='/kr/buy-sell/']")
        print(f"[당근마켓] 탐색된 DOM 카드 수: {len(cards)}개")

        for card in cards:
            raw_href = await card.get_attribute("href")
            clean_url = resolve_daangn_item_url(raw_href)
            if not clean_url:
                continue

            raw_text = await card.inner_text()
            title, price_val = parse_daangn_card_text(raw_text)
            if not title:
                continue

            img_elem = await card.query_selector("img")
            img_url = ""
            if img_elem:
                img_url = await img_elem.evaluate(
                    """el => el.currentSrc || el.src || el.getAttribute('data-src') || el.getAttribute('srcset') || ''"""
                )
                if img_url and (" " in img_url or "," in img_url):
                    img_url = img_url.split(",")[0].strip().split(" ")[0]
                if img_url.startswith("data:image"):
                    img_url = ""

            if not img_url:
                bg_style = await card.evaluate("""el => {
                    const thumb = el.querySelector('[style*="background-image"]');
                    return thumb ? thumb.style.backgroundImage : '';
                }""")
                if bg_style and "url(" in bg_style:
                    bg_match = re.search(r'url\(["\']?(https?://[^"\')]+)["\']?\)', bg_style)
                    if bg_match:
                        img_url = bg_match.group(1)

            raw_products.append({
                "플랫폼": "당근마켓",
                "브랜드": brand,
                "품목": category,
                "제목": title,
                "가격": price_val,
                "이미지URL": img_url,
                "매물URL": clean_url,
            })

        await browser.close()

    return save_to_csv_with_filter(raw_products, output_filename, brand, category, min_price)


def scrape_daangn(brand="구찌", category="가방", min_price=40000, scroll_count=6, headless=True, output_filename=None):
    """동기 호출용 래퍼 함수"""
    return asyncio.run(
        scrape_daangn_async(brand, category, min_price, scroll_count, headless, output_filename)
    )

# 테스트
# if __name__ == "__main__":
    # scrape_daangn(brand="구찌", category="가방", scroll_count=6, headless=True)