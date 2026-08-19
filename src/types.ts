// ============================================================================
// Reverdi 중고명품 통합검색 플랫폼 - 핵심 TypeScript 타입 정의
// ============================================================================

/**
 * 카테고리 고유 식별자 타입
 * - 'bag': 가방 카테고리
 * - 'watch': 시계 카테고리
 * - 'jewelry' | 'apparel' | 'shoes': 주얼리, 의류, 신발 카테고리
 */
export type CategoryId = 'bag' | 'watch' | 'jewelry' | 'apparel' | 'shoes';

/**
 * 메인 5대 카테고리 및 상단 네비게이션 드롭다운 메뉴용 카테고리 메타데이터 인터페이스
 */
export interface CategoryItem {
  /** 카테고리 고유 식별자 (예: 'bag', 'watch', 'jewelry') */
  id: string;
  /** 한글 카테고리명 (예: '가방', '시계', '주얼리', '의류', '신발') */
  title: string;
  /** 영문 서브타이틀 (예: 'Bags & Handbags', 'Luxury Watches') */
  subtitle: string;
  /** UI 디자인용 스케치 라벨 */
  sketchLabel: string;
  /** 서비스 준비중 여부 */
  isPreparing: boolean;
  /** 카테고리 내 등록된 매물 수 */
  itemCount?: number;
  /** 카테고리별 일러스트/아이콘 타입 */
  iconType: 'bag' | 'watch' | 'jewelry' | 'apparel' | 'shoes' | 'accessory';
  /** 카테고리 소개 및 설명 문구 */
  description?: string;
  /** 오픈 예정일 안내 문구 */
  expectedLaunch?: string;
}

/**
 * 각 중고 거래 플랫폼별(중고나라, 번개장터, 당근마켓 등) 개별 매물 정보
 */
export interface PlatformPrice {
  /** 플랫폼 명칭 (예: '중고나라', '번개장터', '당근마켓') */
  platformName: string;
  /** 플랫폼별 등록 판매 가격 (원) */
  price: number;
  /** 상품 컨디션 등급 ('S': 미사용신품, 'A+': 극미중고, 'A': 양호, 'B': 사용감있음) */
  grade: 'S' | 'A+' | 'A' | 'B';
  /** 재고 보유 여부 */
  inStock: boolean;
  /** 해당 플랫폼의 원본 상품 페이지 링크 URL */
  linkUrl: string;
  /** 판매자 인증 유형 ('guaranteed': 정품보증, 'certified': 인증셀러, 'individual': 개인거래) */
  sellerType: 'guaranteed' | 'certified' | 'individual';
}

/**
 * 통합 명품 상품 마스터 엔티티
 * 다중 플랫폼의 매물 정보와 시세 통계를 집약한 핵심 데이터 구조
 */
export interface LuxuryProduct {
  /** 상품 고유 식별자 (ID) */
  id: string;
  /** 소속 메인 카테고리 */
  category: 'bag' | 'watch';
  /** 명품 브랜드 영문명 (예: 'CHANEL', 'ROLEX', 'HERMÈS', 'GUCCI') */
  brand: string;
  /** 영문 공식 모델명 */
  modelName: string;
  /** 한글 상품명 */
  koreanName: string;
  /** 고유 레퍼런스 번호 (선택) */
  referenceNumber?: string;
  /** 대표 썸네일 이미지 URL */
  thumbnailUrl: string;
  /** 백화점 정가 / 공식 발매가 (원) */
  retailPrice?: number;
  /** 중고 시장 평균 거래 시세 (원) */
  avgSecondhandPrice: number;
  /** 각 플랫폼 중 최저 판매가 (원) */
  lowestPrice: number;
  /** 플랫폼별 실시간 매물 및 가격 리스트 */
  platformPrices: PlatformPrice[];
  /** 인기 순위 */
  popularityRank?: number;
  /** 검색 및 필터링용 키워드 태그 목록 */
  tags: string[];
  /** 누적 조회수 */
  views?: number;
  /** 찜 / 관심 수 */
  likes?: number;
}


