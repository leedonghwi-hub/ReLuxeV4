import { LuxuryProduct, CategoryItem } from '../types';

/**
 * ============================================================================
 * Re:Luxe 명품 데이터 저장소
 * 5대 메인 카테고리 메타데이터 및 다중 플랫폼 실시간 수집 연동 상품 Mock 데이터
 * ============================================================================
 */

/**
 * 메인 5대 카테고리 마스터 메타데이터
 * - 가방(bag), 시계(watch): 현재 서비스 활성화
 * - 주얼리(jewelry), 의류(apparel), 신발(shoes): 2026.Q4 오픈 예정
 */
export const SKETCH_CATEGORIES: CategoryItem[] = [
  {
    id: 'bag',
    title: '가방',
    subtitle: 'Bags & Handbags',
    sketchLabel: '가방',
    isPreparing: false,
    itemCount: 57,
    iconType: 'bag',
    description: '샤넬, 에르메스, 루이비통, 디올 등 최상급 중고 명품 가방 통합검색'
  },
  {
    id: 'watch',
    title: '시계',
    subtitle: 'Luxury Watches',
    sketchLabel: '시계',
    isPreparing: false,
    itemCount: 5,
    iconType: 'watch',
    description: '롤렉스, 까르띠에, 오메가, 파텍필립 등 하이엔드 타임피스 가격 비교'
  },
  {
    id: 'jewelry',
    title: '주얼리',
    subtitle: 'Fine Jewelry',
    sketchLabel: 'preparing\n(준비중)',
    isPreparing: true,
    iconType: 'jewelry',
    description: '반클리프 앤 아펠, 까르띠에, 티파니앤코 명품 주얼리 서비스 오픈 예정',
    expectedLaunch: '2026.Q4 오픈 예정'
  },
  {
    id: 'apparel',
    title: '의류',
    subtitle: 'Apparel & Fashion',
    sketchLabel: 'preparing\n(준비중)',
    isPreparing: true,
    iconType: 'apparel',
    description: '몽클레르, 샤넬 트위드, 자켓, 코트 및 명품 프리미엄 의류 통합 시세 오픈 예정',
    expectedLaunch: '2026.Q4 오픈 예정'
  },
  {
    id: 'shoes',
    title: '신발',
    subtitle: 'Luxury Shoes',
    sketchLabel: 'preparing\n(준비중)',
    isPreparing: true,
    iconType: 'shoes',
    description: '샤넬, 디올, 로저비비에, 스니커즈, 로퍼 등 명품 신발 통합 시세 오픈 예정',
    expectedLaunch: '2026.Q4 오픈 예정'
  }
];

export const MOCK_PRODUCTS: LuxuryProduct[] = [
  {
    id: 'jn-229930686',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Supreme Tiger Tote Bag',
    koreanName: '구찌 GG 수프림 타이거 토트백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/23/1782196355943ipQ_umMuv.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 820000,
    lowestPrice: 750000,
    popularityRank: 1,
    views: 3420,
    likes: 210,
    tags: ['구찌', 'GG수프림', '타이거토트'],
    platformPrices: [
      { platformName: '중고나라', price: 750000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/229930686', sellerType: 'individual' },
      { platformName: '당근마켓', price: 770000, grade: 'S', inStock: true, linkUrl: 'https://www.daangn.com/', sellerType: 'individual' },
      { platformName: '번개장터', price: 760000, grade: 'A+', inStock: true, linkUrl: 'https://m.bunjang.co.kr/', sellerType: 'certified' }
    ]
  },
  {
    id: 'jn-231355626',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Zumi Chain Mini Bag',
    koreanName: '구찌 주미 체인 미니백 (정품)',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/08/1786147715457YGK_0wohs.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 770000,
    lowestPrice: 700000,
    popularityRank: 2,
    views: 2890,
    likes: 185,
    tags: ['구찌', '주미', '체인미니백'],
    platformPrices: [
      { platformName: '중고나라', price: 700000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231355626', sellerType: 'individual' },
      { platformName: '당근마켓', price: 720000, grade: 'A+', inStock: true, linkUrl: 'https://www.daangn.com/', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230723458',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Canvas Shoulder Bag',
    koreanName: '구찌 정품 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/17/1784299614111LZP_3cIcH.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 2050000,
    lowestPrice: 1870000,
    popularityRank: 3,
    views: 1950,
    likes: 120,
    tags: ['구찌', 'GG캔버스', '숄더백'],
    platformPrices: [
      { platformName: '중고나라', price: 1870000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230723458', sellerType: 'individual' },
      { platformName: '번개장터', price: 1890000, grade: 'S', inStock: true, linkUrl: 'https://m.bunjang.co.kr/', sellerType: 'certified' }
    ]
  },
  {
    id: 'jn-231431602',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont Shoulder Bag Black',
    koreanName: '구찌 GG 마몽 숄더백 블랙 (정품)',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786366495498bmi_vqDFH.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 780000,
    lowestPrice: 700000,
    popularityRank: 4,
    views: 4120,
    likes: 310,
    tags: ['구찌', 'GG마몽', '마틀라세'],
    platformPrices: [
      { platformName: '중고나라', price: 700000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231431602', sellerType: 'individual' },
      { platformName: '당근마켓', price: 715000, grade: 'A+', inStock: true, linkUrl: 'https://www.daangn.com/', sellerType: 'individual' },
      { platformName: '번개장터', price: 690000, grade: 'A+', inStock: true, linkUrl: 'https://m.bunjang.co.kr/', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-229690256',
    category: 'bag',
    brand: 'GUCCI',
    modelName: '331824 Python Lady Lock Clutch',
    koreanName: '구찌 331824 파이톤 레이디 락 클러치 시즌백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/16/1781573222910cFp_nX44n.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1050000,
    lowestPrice: 955000,
    popularityRank: 5,
    views: 1540,
    likes: 95,
    tags: ['구찌', '레이디락', '파이톤클러치'],
    platformPrices: [
      { platformName: '중고나라', price: 955000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/229690256', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231293821',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Embossed Leather Backpack',
    koreanName: '구찌 시그니처 GG 엠보싱 레더 백팩',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/05/1785941612976SCo_ie6fz.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 830000,
    lowestPrice: 750000,
    popularityRank: 6,
    views: 2310,
    likes: 160,
    tags: ['구찌', 'GG엠보싱', '레더백팩'],
    platformPrices: [
      { platformName: '중고나라', price: 750000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231293821', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231273125',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Canvas Belt Bag 630915',
    koreanName: '(정품) 구찌 GG캔버스 벨트백 크로스백 범백 630915',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/05/1785899501068Agl_tFAZ1.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 610000,
    lowestPrice: 550000,
    popularityRank: 7,
    views: 3100,
    likes: 240,
    tags: ['구찌', 'GG캔버스', '벨트백'],
    platformPrices: [
      { platformName: '중고나라', price: 550000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231273125', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231266946',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Jackie 1961 Small Tote Bag 727810',
    koreanName: '(정품) 새상품 구찌 재키백 1961 스몰 토트백 727810',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/05/1785881971829VMA_OiLvJ.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 3200000,
    lowestPrice: 2900000,
    popularityRank: 8,
    views: 5200,
    likes: 480,
    tags: ['구찌', '재키1961', '스몰토트'],
    platformPrices: [
      { platformName: '중고나라', price: 2900000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231266946', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231226869',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Bamboo Brown Canvas Shoulder Bag',
    koreanName: '구찌 숄더백 브라운 캔버스 뱀부 장식',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/03/1785749088167qB9_PSJoN.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1020000,
    lowestPrice: 930000,
    popularityRank: 9,
    views: 1820,
    likes: 110,
    tags: ['구찌', '뱀부', '브라운', '캔버스', '숄더백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 930000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231226869', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230538887',
    category: 'bag',
    brand: 'GUCCI',
    modelName: '257090 Jacquard Bamboo Shoulder Bag',
    koreanName: '구찌 257090 자가드 브라운 레더 뱀부 장식 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/12/1783812560940ZCd_2Qes2.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 210000,
    lowestPrice: 181000,
    popularityRank: 10,
    views: 2400,
    likes: 130,
    tags: ['구찌', '자가드', '뱀부', '숄더백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 181000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/230538887', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230538732',
    category: 'bag',
    brand: 'GUCCI',
    modelName: '181092 Jacquard Web Hobo Bag',
    koreanName: '구찌 181092 자가드 패브릭 삼선 스티치 호보 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/12/1783811796332GlO_Re5Pe.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 180000,
    lowestPrice: 160000,
    popularityRank: 11,
    views: 2980,
    likes: 175,
    tags: ['구찌', '자가드', '삼선', '호보백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 160000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/230538732', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230353222',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont Matelasse White Shoulder Bag',
    koreanName: '구찌 GG 마몽 마틀라세 숄더백 화이트',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/06/1783311440639f7f_hYyuO.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 780000,
    lowestPrice: 700000,
    popularityRank: 12,
    views: 3800,
    likes: 290,
    tags: ['구찌', 'GG마몽', '마틀라세', '화이트', '숄더백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 700000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/230353222', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231369733',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Web Strap Tote & Messenger Bag',
    koreanName: '(정품)새상품 구찌 웹 스트랩 토트백 숄더백 메신저백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/08/1786180032374Air_7GotB.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 350000,
    lowestPrice: 300000,
    popularityRank: 13,
    views: 1900,
    likes: 140,
    tags: ['구찌', '웹스트랩', '토트백', '메신저백', '새상품', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 300000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231369733', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231042143',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Classic Leather Tote Bag',
    koreanName: '(정품) 구찌 고급 레더 토트백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/28/1785195456440Zeo_kjGyL.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 520000,
    lowestPrice: 470000,
    popularityRank: 14,
    views: 2100,
    likes: 165,
    tags: ['구찌', '정품', '레더', '토트백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 470000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231042143', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-227099311',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Fabric Pouch Clutch',
    koreanName: '구찌 클러치 백 패브릭 파우치',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/04/04/177526080805233s_ZanMB.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 540000,
    lowestPrice: 490000,
    popularityRank: 15,
    views: 2600,
    likes: 180,
    tags: ['구찌', '클러치백', '파우치', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 490000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/227099311', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231131169',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont Matelasse Mini Shoulder Bag 448065',
    koreanName: '(정품) 구찌 마몬트 마틀라세 미니 숄더백 448065',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/31/1785459726070cHg_5SxOu.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 720000,
    lowestPrice: 650000,
    popularityRank: 16,
    views: 4500,
    likes: 380,
    tags: ['구찌', '마몬트', '마틀라세', '미니숄더백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 650000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231131169', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231381548',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Jolie Canvas Shopper Tote',
    koreanName: '구찌 졸리 캔버스 쇼퍼백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/09/1786230416807mdV_gjH9i.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 260000,
    lowestPrice: 230000,
    popularityRank: 17,
    views: 3100,
    likes: 220,
    tags: ['구찌', '졸리', '캔버스', '쇼퍼백', '토트백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 230000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/231381548', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231039457',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Eden Clutch Bag Box Set',
    koreanName: '구찌 클러치 에덴 클러치 풀박스',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/28/1785171447926bng_GBCHJ.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 450000,
    lowestPrice: 400000,
    popularityRank: 18,
    views: 1890,
    likes: 125,
    tags: ['구찌', '에덴', '클러치백', '풀박스', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 400000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231039457', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231316085',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont Matelasse Super Mini Bag',
    koreanName: '구찌 마틀라세 슈퍼미니',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/06/17860125180988QU_94zeO.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 750000,
    lowestPrice: 680000,
    popularityRank: 19,
    views: 4800,
    likes: 410,
    tags: ['구찌', '마틀라세', '슈퍼미니', '체인백', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 680000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231316085', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-229644553',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Soho Leather Chain Crossbody Bag',
    koreanName: '구찌 소호 체인 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/14/1781439082511fCf_rkqoT.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 560000,
    lowestPrice: 500000,
    popularityRank: 20,
    views: 3200,
    likes: 260,
    tags: ['구찌', '소호', '체인백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 500000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/229644553', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231200569',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont Matelasse Mini Camera Bag',
    koreanName: '구찌 GG 마몽 마틀라세 미니 카메라백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/02/1785665983981oCQ_27T4v.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1180000,
    lowestPrice: 1050000,
    popularityRank: 21,
    views: 3900,
    likes: 310,
    tags: ['구찌', 'GG마몽', '마틀라세', '카메라백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1050000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231200569', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231123122',
    category: 'bag',
    brand: 'CELINE',
    modelName: 'Monochrome Mini Crossbody Bag Set',
    koreanName: '셀린느 미니백+선글라스 모노크롬 03 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/30/1785416337096Zba_5d0XI.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 290000,
    lowestPrice: 260000,
    popularityRank: 22,
    views: 2800,
    likes: 210,
    tags: ['셀린느', '미니백', '크로스백', '선글라스', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 260000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231123122', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231218032',
    category: 'bag',
    brand: 'PRADA',
    modelName: 'Gaufre Nylon Crossbody Shoulder Bag',
    koreanName: '(마지막가격) 프라다 고프레 크로스백 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/03/1785731565365o4Z_rBMMx.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 380000,
    lowestPrice: 340000,
    popularityRank: 23,
    views: 3400,
    likes: 280,
    tags: ['프라다', '고프레', '크로스백', '숄더백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 340000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231218032', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434313',
    category: 'bag',
    brand: 'BOTTEGA VENETA',
    modelName: 'Intrecciato Leather Clutch Bag',
    koreanName: '보테가베네타 인트레치아토 클러치가방 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372255346Gp0_vGBv2.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 470000,
    lowestPrice: 420000,
    popularityRank: 24,
    views: 2900,
    likes: 230,
    tags: ['보테가베네타', '인트레치아토', '클러치백', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 420000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434313', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-227394983',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Monogram Leather Crossbody Bag',
    koreanName: '구찌 모노그램 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/04/11/1775907865101YMP_X5mAg.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1780000,
    lowestPrice: 1600000,
    popularityRank: 25,
    views: 1800,
    likes: 140,
    tags: ['구찌', '모노그램', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1600000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/227394983', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231304571',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Interlocking GG Supreme Messenger 726833',
    koreanName: '(정품) 구찌 인터로킹 GG 수프림 클러치 & 메신저백 726833',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/06/17859895854915m8_wMfno.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1050000,
    lowestPrice: 950000,
    popularityRank: 26,
    views: 3100,
    likes: 250,
    tags: ['구찌', '인터로킹', 'GG수프림', '메신저백', '클러치백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 950000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231304571', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231319007',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Vintage Canvas Shoulder Bag',
    koreanName: '[빈티지 명품/정품] 구찌 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/06/1786018898097vWq_lK7vv.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 450000,
    lowestPrice: 400000,
    popularityRank: 27,
    views: 2200,
    likes: 150,
    tags: ['구찌', '빈티지', '숄더백', '정품', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 400000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/231319007', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231321191',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Vintage Web Canvas Shoulder Bag',
    koreanName: '[정품/명품] 구찌 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/06/1786023905076ag3_Y7Cee.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 550000,
    lowestPrice: 500000,
    popularityRank: 28,
    views: 2500,
    likes: 190,
    tags: ['구찌', '정품', '숄더백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 500000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231321191', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-229469417',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Canvas Boston Tote Bag',
    koreanName: '구찌 보스턴백 토트백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/09/1780991406229buB_IppiF.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 480000,
    lowestPrice: 430000,
    popularityRank: 29,
    views: 2700,
    likes: 200,
    tags: ['구찌', '보스턴백', '토트백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 430000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/229469417', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230975783',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Diana Bamboo Vintage Tote Bag',
    koreanName: '정품 클래식 구찌 다이애나 뱀부 빅백 빈티지 토트백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/25/1784991186365VIM_nsSeF.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 420000,
    lowestPrice: 380000,
    popularityRank: 30,
    views: 3100,
    likes: 230,
    tags: ['구찌', '다이애나', '뱀부', '빈티지', '토트백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 380000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/230975783', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434392',
    category: 'bag',
    brand: 'PRADA',
    modelName: 'Re-Edition Nylon Mini Hobo Bag',
    koreanName: '프라다 숄더백 호보백 미니 리에디션',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372440771Zuq_blS4Q.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 370000,
    lowestPrice: 330000,
    popularityRank: 31,
    views: 4200,
    likes: 340,
    tags: ['프라다', '호보백', '리에디션', '미니백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 330000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434392', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434382',
    category: 'bag',
    brand: 'PRADA',
    modelName: 'Saffiano Tessuto Gold Hobo Bag',
    koreanName: '프라다 금장 사피아노 테수토 호보백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372422855qxn_YXHZ2.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 420000,
    lowestPrice: 380000,
    popularityRank: 32,
    views: 3900,
    likes: 310,
    tags: ['프라다', '사피아노', '테수토', '호보백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 380000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434382', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434332',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Microguccissima Emily Crossbody Bag',
    koreanName: '구찌 마이크로시마 에밀리 크로스백 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372313449XgB_oE9KS.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 360000,
    lowestPrice: 320000,
    popularityRank: 33,
    views: 2800,
    likes: 220,
    tags: ['구찌', '마이크로시마', '에밀리', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 320000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434332', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434323',
    category: 'bag',
    brand: 'PRADA',
    modelName: 'Vitello Move WOC Leather Crossbody Bag',
    koreanName: '프라다 비텔로 WOC 레더 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372281312p9b_k6yB8.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 420000,
    lowestPrice: 380000,
    popularityRank: 34,
    views: 3100,
    likes: 250,
    tags: ['프라다', '비텔로', 'WOC', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 380000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434323', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231356931',
    category: 'bag',
    brand: 'FENDI',
    modelName: 'Zucchino Canvas Shoulder Crossbody Bag',
    koreanName: '펜디 주키노 숄더백 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/08/1786151500861zqD_v4Pm7.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 360000,
    lowestPrice: 320000,
    popularityRank: 35,
    views: 2900,
    likes: 210,
    tags: ['펜디', '주키노', '숄더백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 320000, grade: 'A', inStock: true, linkUrl: 'https://web.joongna.com/product/231356931', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231434300',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Jackie Hobo Mini Crossbody Bag',
    koreanName: '구찌 재키백 호보백 미니 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/10/1786372229401wv2_IQ3pZ.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 380000,
    lowestPrice: 340000,
    popularityRank: 36,
    views: 3600,
    likes: 280,
    tags: ['구찌', '재키백', '호보백', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 340000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231434300', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231218052',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Dionysus Suede Chain Crossbody Bag',
    koreanName: '구찌 디오니소스 스웨이드 체인 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/03/1785731588285twr_JfzoI.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 650000,
    lowestPrice: 590000,
    popularityRank: 37,
    views: 3300,
    likes: 270,
    tags: ['구찌', '디오니소스', '스웨이드', '체인백', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 590000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231218052', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-229520345',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Horsebit 1955 Small Shoulder Bag',
    koreanName: '구찌 홀스빗 1955 스몰 숄더백 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/11/1781108710969JUj_ydoVG.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 3000000,
    lowestPrice: 2750000,
    popularityRank: 38,
    views: 5800,
    likes: 520,
    tags: ['구찌', '홀스빗1955', '스몰숄더백', '크로스백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 2750000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/229520345', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-220709758',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Horsebit 1955 Medium Shoulder Bag Navy',
    koreanName: '구찌 홀스빗 1955 미디엄 숄더백 네이비',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2025/10/14/1760448991859roW_PRmHP.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 2800000,
    lowestPrice: 2500000,
    popularityRank: 39,
    views: 4200,
    likes: 390,
    tags: ['구찌', '홀스빗1955', '네이비', '숄더백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 2500000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/220709758', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230963931',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Bamboo 1947 Small Top Handle Bag',
    koreanName: '구찌 뱀부 1947 스몰 탑핸들백 (정품)',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/25/1784965159838a7F_zSolV.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 2300000,
    lowestPrice: 2050000,
    popularityRank: 40,
    views: 4900,
    likes: 430,
    tags: ['구찌', '뱀부1947', '스몰탑핸들', '정품', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 2050000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230963931', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230961739',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Neo Vintage Canvas Messenger Bag',
    koreanName: '구찌 네오빈티지 메신저백 크로스백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/25/1784960878296AZd_WnsF9.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1100000,
    lowestPrice: 980000,
    popularityRank: 41,
    views: 3800,
    likes: 310,
    tags: ['구찌', '네오빈티지', '메신저백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 980000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230961739', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230621480',
    category: 'bag',
    brand: 'BAO BAO',
    modelName: 'Platinum Large Tote Shoulder Bag',
    koreanName: '바오바오백 토트백 숄더백 라지 플래티넘',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/14/1784024135761ocI_a9iBF.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 690000,
    lowestPrice: 620000,
    popularityRank: 42,
    views: 2600,
    likes: 190,
    tags: ['바오바오', '플래티넘', '토트백', '숄더백', '중고나라', '무료배송'],
    platformPrices: [
      { platformName: '중고나라', price: 620000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/230621480', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230822602',
    category: 'bag',
    brand: 'MAISON MARGIELA',
    modelName: '5AC Leather Bucket Bag',
    koreanName: '메종 마르지엘라 버킷백 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/21/17845970929771fn_vQbpK.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 820000,
    lowestPrice: 730000,
    popularityRank: 43,
    views: 3500,
    likes: 290,
    tags: ['메종마르지엘라', '버킷백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 730000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/230822602', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231030011',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Horsebit 1955 Korea Exclusive Top Handle',
    koreanName: '구찌 홀스빗 1955 코리아 익스클루시브 탑 핸들백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/27/1785148469940zdt_iMH3q.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 2050000,
    lowestPrice: 1850000,
    popularityRank: 44,
    views: 4100,
    likes: 360,
    tags: ['구찌', '홀스빗1955', '코리아익스클루시브', '탑핸들', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1850000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231030011', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230820344',
    category: 'bag',
    brand: 'DIOR',
    modelName: 'Oblique Canvas Pouch Clutch Bag',
    koreanName: '디올 오블리크 클러치백 파우치백 A급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/21/1784591465220p3o_ymrYD.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 920000,
    lowestPrice: 830000,
    popularityRank: 45,
    views: 3200,
    likes: 240,
    tags: ['디올', '오블리크', '클러치백', '파우치백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 830000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/230820344', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230878930',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'Bamboo 1947 Mini Top Handle Black',
    koreanName: '구찌 뱀부 1947 미니 토트 크로스백 블랙',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/22/1784724017305Grp_3lSvC.png?impolicy=thumb&size=150',
    avgSecondhandPrice: 2150000,
    lowestPrice: 1950000,
    popularityRank: 46,
    views: 4600,
    likes: 410,
    tags: ['구찌', '뱀부1947', '미니토트', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1950000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230878930', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230998784',
    category: 'bag',
    brand: 'BURBERRY',
    modelName: 'House Check Canvas Shoulder Tote Bag',
    koreanName: '버버리 하우스체크 숄더백 토트백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/26/1785063207348UVH_EALj8.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 750000,
    lowestPrice: 670000,
    popularityRank: 47,
    views: 2900,
    likes: 210,
    tags: ['버버리', '하우스체크', '숄더백', '토트백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 670000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230998784', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230871843',
    category: 'bag',
    brand: 'FENDI',
    modelName: 'Peekaboo Mini Monster Limited Edition',
    koreanName: '펜디 피카부 미니 몬스터 한정판 크로스백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/22/17847110783269v3_WlpdS.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 2200000,
    lowestPrice: 1950000,
    popularityRank: 48,
    views: 5100,
    likes: 460,
    tags: ['펜디', '피카부', '미니몬스터', '한정판', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1950000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230871843', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-229938325',
    category: 'bag',
    brand: 'GUCCI',
    modelName: 'GG Marmont White Round Mini Bag',
    koreanName: '구찌 GG 마몽 화이트 라운드 미니 숄더백',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/06/23/1782209201705LWR_jMOHe.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 830000,
    lowestPrice: 750000,
    popularityRank: 49,
    views: 3100,
    likes: 240,
    tags: ['구찌', 'GG마몽', '화이트', '라운드백', '미니백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 750000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/229938325', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230910045',
    category: 'bag',
    brand: 'LOUIS VUITTON',
    modelName: 'Empreinte Leather Pouch Clutch Bag',
    koreanName: '루이비통 앙프렝뜨 클러치백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/23/1784807392174uqL_y0TC4.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 800000,
    lowestPrice: 720000,
    popularityRank: 50,
    views: 3800,
    likes: 310,
    tags: ['루이비통', '앙프렝뜨', '클러치백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 720000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230910045', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230871195',
    category: 'bag',
    brand: 'CELINE',
    modelName: 'Triomphe Canvas Mini Cabas Crossbody',
    koreanName: '셀린느 트리옹프 카바스 미니 크로스백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/22/1784710066588lTM_fFHPB.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1280000,
    lowestPrice: 1150000,
    popularityRank: 51,
    views: 4700,
    likes: 420,
    tags: ['셀린느', '트리옹프', '카바스', '미니백', '크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1150000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230871195', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230994687',
    category: 'bag',
    brand: 'CHANEL',
    modelName: 'Classic Large Pouch Gold Hardware',
    koreanName: '샤넬 클래식 클러치백 라지 샴골 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/26/1785054595102z4A_ikrLf.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1720000,
    lowestPrice: 1550000,
    popularityRank: 52,
    views: 6100,
    likes: 580,
    tags: ['샤넬', '클래식', '클러치백', '라지', '샴페인골드', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1550000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230994687', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231265708',
    category: 'bag',
    brand: 'BALENCIAGA',
    modelName: 'City Motor Bag Mini Crossbody',
    koreanName: '발렌시아가 시티 모터백 미니 크로스백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/05/1785863469085jYs_BcuUj.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 1950000,
    lowestPrice: 1750000,
    popularityRank: 53,
    views: 4300,
    likes: 390,
    tags: ['발렌시아가', '시티백', '모터백', '미니크로스백', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 1750000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/231265708', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230688922',
    category: 'bag',
    brand: 'SAINT LAURENT',
    modelName: 'New Medium Pouch Clutch Bag',
    koreanName: '입생로랑 생로랑 뉴미듐 클러치백 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/16/1784204458328nPk_BGDYu.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 580000,
    lowestPrice: 520000,
    popularityRank: 54,
    views: 3400,
    likes: 270,
    tags: ['생로랑', '입생로랑', '클러치백', '뉴미듐', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 520000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230688922', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231259230',
    category: 'bag',
    brand: 'THOM BROWNE',
    modelName: 'Tricolor Small Leather Clutch Bag',
    koreanName: '톰브라운 클러치백 스몰 A급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/08/04/1785844557720xFI_ub501.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 360000,
    lowestPrice: 320000,
    popularityRank: 55,
    views: 2500,
    likes: 180,
    tags: ['톰브라운', '클러치백', '삼선', '스몰', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 320000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/product/231259230', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230593558',
    category: 'bag',
    brand: 'GOYARD',
    modelName: 'Senat Pouch Clutch MM S Grade',
    koreanName: '고야드 세나 클러치 파우치백 MM S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/13/1783947157295nCd_qJkBt.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 740000,
    lowestPrice: 670000,
    popularityRank: 56,
    views: 4200,
    likes: 380,
    tags: ['고야드', '세나클러치', '파우치백', 'MM', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 670000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230593558', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-230593697',
    category: 'bag',
    brand: 'MIU MIU',
    modelName: 'Matelasse Leather Crossbody Wallet',
    koreanName: '미우미우 마틀라세 크로스백 장지갑 S급',
    thumbnailUrl: 'https://img2.joongna.com/media/original/2026/07/13/1783947411913p9q_r33F2.jpg?impolicy=thumb&size=150',
    avgSecondhandPrice: 580000,
    lowestPrice: 520000,
    popularityRank: 57,
    views: 3100,
    likes: 260,
    tags: ['미우미우', '마틀라세', '크로스백', '장지갑', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 520000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/product/230593697', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231500101',
    category: 'watch',
    brand: 'ROLEX',
    modelName: 'Submariner Date 126610LN',
    koreanName: '롤렉스 서브마리너 데이트 블랙 126610LN (풀셋)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    avgSecondhandPrice: 18500000,
    lowestPrice: 17200000,
    popularityRank: 1,
    views: 8900,
    likes: 720,
    tags: ['롤렉스', '서브마리너', '126610LN', '블랙', '시계', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 17200000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/', sellerType: 'certified' },
      { platformName: '번개장터', price: 17500000, grade: 'S', inStock: true, linkUrl: 'https://m.bunjang.co.kr/', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231500102',
    category: 'watch',
    brand: 'CARTIER',
    modelName: 'Santos de Cartier Large WSSA0018',
    koreanName: '까르띠에 산토스 드 까르띠에 라지 스틸 WSSA0018',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&auto=format&fit=crop&q=80',
    avgSecondhandPrice: 9200000,
    lowestPrice: 8500000,
    popularityRank: 2,
    views: 6400,
    likes: 510,
    tags: ['까르띠에', '산토스', '라지', '스틸', '시계', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 8500000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/', sellerType: 'individual' },
      { platformName: '당근마켓', price: 8700000, grade: 'S', inStock: true, linkUrl: 'https://www.daangn.com/', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231500103',
    category: 'watch',
    brand: 'OMEGA',
    modelName: 'Speedmaster Professional Moonwatch 310.30.42.50.01.001',
    koreanName: '오메가 스피드마스터 문워치 프로페셔널 사파이어',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80',
    avgSecondhandPrice: 8300000,
    lowestPrice: 7600000,
    popularityRank: 3,
    views: 5200,
    likes: 430,
    tags: ['오메가', '스피드마스터', '문워치', '사파이어', '시계', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 7600000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/', sellerType: 'individual' }
    ]
  },
  {
    id: 'jn-231500104',
    category: 'watch',
    brand: 'ROLEX',
    modelName: 'Datejust 36 Blue Motif Dial 126234',
    koreanName: '롤렉스 데이저스트 36 청판 모티브 126234',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=300&auto=format&fit=crop&q=80',
    avgSecondhandPrice: 15400000,
    lowestPrice: 14500000,
    popularityRank: 4,
    views: 7300,
    likes: 610,
    tags: ['롤렉스', '데이저스트', '126234', '청판', '시계', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 14500000, grade: 'S', inStock: true, linkUrl: 'https://web.joongna.com/', sellerType: 'certified' }
    ]
  },
  {
    id: 'jn-231500105',
    category: 'watch',
    brand: 'CARTIER',
    modelName: 'Tank Must Large WSTA0041',
    koreanName: '까르띠에 탱크 머스트 라지 가죽 WSTA0041',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop&q=80',
    avgSecondhandPrice: 4200000,
    lowestPrice: 3800000,
    popularityRank: 5,
    views: 4800,
    likes: 390,
    tags: ['까르띠에', '탱크머스트', '라지', '가죽시계', '중고나라'],
    platformPrices: [
      { platformName: '중고나라', price: 3800000, grade: 'A+', inStock: true, linkUrl: 'https://web.joongna.com/', sellerType: 'individual' }
    ]
  }
];

/**
 * 각 카테고리별 브랜드 필터 목록 (검색 페이지 브랜드 필터 드롭다운 연동)
 */
export const BRANDS_BY_CATEGORY: Record<string, string[]> = {
  bag: ['전체', 'GUCCI', 'CHANEL', 'HERMÈS', 'LOUIS VUITTON', 'DIOR', 'PRADA', 'CELINE', 'GOYARD', 'SAINT LAURENT', 'BOTTEGA VENETA', 'BALENCIAGA', 'FENDI', 'BURBERRY', 'MAISON MARGIELA', 'THOM BROWNE', 'MIU MIU', 'BAO BAO'],
  watch: ['전체', 'ROLEX', 'CARTIER', 'OMEGA', 'PATEK PHILIPPE', 'AUDEMARS PIGUET', 'IWC', 'VACHERON CONSTANTIN'],
  jewelry: ['전체', 'VAN CLEEF & ARPELS', 'CARTIER', 'TIFFANY & CO.', 'BULGARI', 'CHANEL', 'HERMÈS'],
  apparel: ['전체', 'CHANEL', 'MONCLER', 'DIOR', 'PRADA', 'LOUIS VUITTON', 'HERMÈS'],
  shoes: ['전체', 'CHANEL', 'DIOR', 'HERMÈS', 'ROGER VIVIER', 'PRADA', 'LOUIS VUITTON']
};

/**
 * 검색 필터용 거래 플랫폼 옵션 (전체, 중고나라, 당근마켓, 번개장터)
 */
export const FILTER_PLATFORMS = ['전체', '중고나라', '당근마켓', '번개장터'];

/**
 * 전체 카테고리 선택 시 기본 제공되는 대표 인기 명품 브랜드 목록
 */
export const POPULAR_BRANDS = [
  '전체', 'GUCCI', 'CHANEL', 'HERMÈS', 'LOUIS VUITTON', 'DIOR', 'PRADA', 'CELINE', 'GOYARD', 'SAINT LAURENT', 'BOTTEGA VENETA', 'BALENCIAGA', 'FENDI'
];

