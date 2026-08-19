# 실행은 여기서
from bunjang_crawler import scrape_bunjang
from daangn_crawler import scrape_daangn
from jungonara_crawler import scrape_joongna

if __name__ == "__main__":
    brand = "구찌"           #default
    category = "가방"        #default
    #번개장터 
    # thunder/bunjang_구찌_가방.csv 로 저장됨
    # scrape_bunjang(brand="구찌", category="가방", max_pages=10)
    # scrape_bunjang(brand="에르메스", category="가방", max_pages=10)
    # scrape_bunjang(brand="보테가베네타",category="가방", max_pages=10)
    # scrape_bunjang(brand="디올", category="가방", max_pages=10)
    # scrape_bunjang(brand="프라다", category="가방",max_pages=10)
    # scrape_bunjang(brand="샤넬", category="가방", max_pages=10)
    

    # 당근마켓
    # carrot/daangn_구찌_가방.csv 로 저장됨
    # scrape_daangn(brand=brand, category=category, scroll_count=6, headless=True)
    
    # 중고나라 특수하게 카테고리 필터가 있음
    scrape_joongna(brand="구찌", category_id="103", category_filter="가방", min_price=40000, max_pages=3,headless=True)
    scrape_joongna(brand="프라다", category_id="103", category_filter="가방", min_price=40000, max_pages=3,headless=True)
    scrape_joongna(brand="보테가베네타", category_id="103", category_filter="가방", min_price=40000, max_pages=3,headless=True)
    scrape_joongna(brand="디올", category_id="103", category_filter="가방", min_price=40000, max_pages=3,headless=True)
    
    
# 해당 파일 실행전 크롤러들과 필터를 미리 실행둬야한다
