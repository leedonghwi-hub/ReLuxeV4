# bunjang_crawler.py
import time
from pathlib import Path
import requests
from common_filter import save_to_csv_with_filter

BRAND_MAP_BUNJANG = {
    "구찌": "23",
    "루이비통": "16",
    "샤넬": "28",
    "프라다": "20",
    "디올": "31",
    "에르메스": "34",
    "입생로랑": "40",
    "생로랑": "40",
    "보테가베네타": "54",
    "발렌시아가": "52",
    "셀린느": "45",
}


def scrape_bunjang(brand="구찌", category="가방", min_price=40000, max_pages=10, output_filename=None):
    """번개장터 크롤링 함수 (결과: thunder/ 폴더 저장)"""
    search_keyword = f"{brand}{category}".strip()
    brand_id = BRAND_MAP_BUNJANG.get(brand, "")
    
    # 기본 저장 경로를 thunder 폴더 내부로 설정
    output_filename = output_filename or f"csv_data/thunder/bunjang_{brand}_{category}.csv"

    url = "https://api.bunjang.co.kr/api/1/find_v2.json"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        ),
        "Referer": "https://m.bunjang.co.kr/",
    }

    raw_products = []
    page = 0
    print(f"[번개장터] '{brand} {category}' 수집 시작...")

    while page < max_pages:
        params = {
            "q": search_keyword,
            "order": "score",
            "page": page,
            "f_category_id": "",
            "f_brand_id": brand_id,
            "status": "0",
        }

        try:
            res = requests.get(url, headers=headers, params=params, timeout=10)
            res.raise_for_status()
            items = res.json().get("list", [])
            if not items:
                print(f"[번개장터 {page + 1}페이지] 더 이상 매물이 없습니다.")
                break

            for item in items:
                pid = item.get("pid")
                raw_products.append({
                    "플랫폼": "번개장터",
                    "브랜드": brand,
                    "품목": category,
                    "제목": item.get("name", ""),
                    "가격": item.get("price", 0),
                    "이미지URL": item.get("product_image", ""),
                    "매물URL": f"https://m.bunjang.co.kr/products/{pid}" if pid else "",
                })

            print(f"[번개장터 {page + 1}페이지] {len(items)}개 수집 (누적: {len(raw_products)}개)")
            page += 1
            time.sleep(0.8)

        except Exception as e:
            print(f"[번개장터 오류] ({page + 1}페이지): {e}")
            break

    return save_to_csv_with_filter(raw_products, output_filename, brand, category, min_price)

# 테스트
# if __name__ == "__main__":
    # scrape_bunjang(brand="구찌", category="가방", max_pages=5)