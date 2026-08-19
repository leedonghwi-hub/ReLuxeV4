# common_filter.py
import csv
import re
from pathlib import Path

# 타 브랜드 제외 키워드 매핑 (한글 / 영문 / 약어 확장)
OTHER_BRAND_KEYWORDS = {
    "구찌": ["구찌", "gucci"],
    "루이비통": ["루이비통", "루이뷔통", "louis vuitton", "louisvuitton", "lv"],
    "샤넬": ["샤넬", "chanel"],
    "프라다": ["프라다", "prada"],
    "디올": ["디올", "dior"],
    "에르메스": ["에르메스", "hermes"],
    "입생로랑": ["입생로랑", "생로랑", "ysl", "saint laurent"],
    "생로랑": ["입생로랑", "생로랑", "ysl", "saint laurent"],
    "보테가베네타": ["보테가", "보테가베네타", "bottega", "bottega veneta"],
    "발렌시아가": ["발렌시아가", "balenciaga"],
    "셀린느": ["셀린느", "셀린", "celine"],
    "버버리": ["버버리", "burberry"],
    "펜디": ["펜디", "fendi"],
    "고야드": ["고야드", "goyard"],
    "발렌티노": ["발렌티노", "valentino"],
    "지방시": ["지방시", "givenchy"],
    "톰브라운": ["톰브라운", "thombrowne", "thom browne"],
    "메종마르지엘라": ["마르지엘라", "maison margiela", "margiela"],
    "미우미우": ["미우미우", "miumiu", "miu miu"],
    "끌로에": ["끌로에", "chloe"],
    "로에베": ["로에베", "loewe"],
}

# 타 품목 제외 키워드 매핑
OTHER_CATEGORY_KEYWORDS = {
    "가방": [
        "지갑", "반지갑", "장지갑", "카드지갑", "동전지갑", "머니클립", "wallet",
        "벨트", "신발", "스니커즈", "로퍼", "구두", "시계", "목걸이", "반지",
        "귀걸이", "향수", "선글라스", "안경", "모자", "의류", "자켓", "패딩", "코트", "바지", "키링"
    ],
    "지갑": [
        "가방", "백팩", "토트백", "크로스백", "숄더백", "핸드백", "클러치", "bag",
        "신발", "스니커즈", "시계", "벨트", "의류"
    ],
    "신발": ["가방", "지갑", "시계", "벨트", "모자", "의류"],
    "시계": ["가방", "지갑", "신발", "벨트", "의류"],
}


def normalize_title_for_search(text: str) -> str:
    """특수문자(/, #, [, ], 쉼표 등)를 공백으로 치환하여 단어 단위 분리 매칭 지원"""
    return re.sub(r"[/,#\[\]\(\)\{\}\-_|]", " ", text.lower())


def save_to_csv_with_filter(data_list, filename, target_brand, target_category, min_price=40000):
    """수집된 데이터를 3대 조건(가격, 타브랜드 나열, 타품목)으로 엄격하게 필터링 후 CSV 저장"""
    if not data_list:
        print(f"[{target_brand} - {target_category}] 저장할 데이터가 없습니다.")
        return []

    # 1. 현재 타깃 브랜드의 모든 별칭(Alias) 목록
    target_brand_aliases = [
        alias.lower()
        for alias in OTHER_BRAND_KEYWORDS.get(target_brand, [target_brand.lower()])
    ]

    # 2. 현재 타깃 브랜드를 제외한 '모든 타 명품 브랜드' 키워드 수집
    excluded_brand_keywords = set()
    for b_name, aliases in OTHER_BRAND_KEYWORDS.items():
        if b_name != target_brand:
            for alias in aliases:
                alias_lower = alias.lower()
                if alias_lower not in target_brand_aliases:
                    excluded_brand_keywords.add(alias_lower)

    # 3. 제외할 타 품목 키워드 목록
    excluded_category_keywords = set()
    for cat_name, cat_keywords in OTHER_CATEGORY_KEYWORDS.items():
        if cat_name == target_category or target_category not in OTHER_CATEGORY_KEYWORDS:
            for kw in cat_keywords:
                excluded_category_keywords.add(kw.lower())

    filtered_products = []
    stat_price_dropped = 0
    stat_brand_dropped = 0
    stat_category_dropped = 0

    for item in data_list:
        title = item.get("제목", "")
        normalized_title = normalize_title_for_search(title)
        
        # (1) 가격 필터링 (40,000원 이하 제외)
        try:
            price_val = int(float(item.get("가격", 0)))
        except (ValueError, TypeError):
            price_val = 0

        if price_val <= min_price:
            stat_price_dropped += 1
            continue

        # (2) 타 브랜드명 다중 기입 검사 (정규화된 텍스트에서 검사)
        # 예: "[구찌/샤넬] 가방" -> " 구찌 샤넬 가방" -> "샤넬" 발견 시 즉시 제외
        is_multi_brand = False
        for b_kw in excluded_brand_keywords:
            if b_kw in normalized_title:
                is_multi_brand = True
                break

        if is_multi_brand:
            stat_brand_dropped += 1
            continue

        # (3) 타 품목명 포함 검사 (가방인데 지갑/시계/신발 등이 섞인 경우)
        is_other_category = False
        for c_kw in excluded_category_keywords:
            if c_kw in normalized_title:
                is_other_category = True
                break

        if is_other_category:
            stat_category_dropped += 1
            continue

        item["가격"] = price_val
        filtered_products.append(item)

    output_path = Path(filename)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    keys = ["플랫폼", "브랜드", "품목", "제목", "가격", "이미지URL", "매물URL"]
    with open(output_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(filtered_products)

    print("\n" + "=" * 60)
    print(f" [CSV 저장 완료 - '{output_path.name}']")
    print(f" - 원본 수집 건수: {len(data_list)}개")
    print(f" - {min_price:,}원 이하 제외: {stat_price_dropped}건")
    print(f" - 타 브랜드 다중 기입 제외: {stat_brand_dropped}건")
    print(f" - 타 품목(지갑/신발 등) 기입 제외: {stat_category_dropped}건")
    print(f" - 최종 저장된 유효 매물: {len(filtered_products)}개")
    print("=" * 60 + "\n")

    return filtered_products