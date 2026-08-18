import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LuxuryProduct } from '../types';
import {
  Search,
  ArrowLeft,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Store,
  Award,
  Coins,
  ArrowUpDown,
  ShoppingBag,
  Watch,
  Gem,
  Shirt,
  Footprints,
  Loader2,
  X,
  TrendingDown,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { MOCK_PRODUCTS, FILTER_PLATFORMS, BRANDS_BY_CATEGORY, POPULAR_BRANDS } from '../data/luxuryData';
import { ReLuxeLogo } from './ReLuxeLogo';
import { MegaCategoryMenu } from './MegaCategoryMenu';

/** 검색 결과 페이지 컴포넌트 Props */
interface SearchResultsPageProps {
  /** 검색 키워드 */
  query: string;
  /** 초기 선택된 카테고리 ID (기본값 'all') */
  initialCategory?: string;
  /** 홈 화면 이동 핸들러 */
  onGoHome: () => void;
  /** 카테고리/브랜드 선택 핸들러 */
  onSelectCategory: (categoryId: string, brand?: string, subQuery?: string) => void;
  /** 상품 상세 선택 핸들러 */
  onSelectProduct: (product: LuxuryProduct) => void;
  /** 신규 키워드 검색 핸들러 */
  onNewSearch: (newQuery: string, categoryId?: string) => void;
}

/** 검색창 하단 추천 인기 검색어 태그 */
const POPULAR_SEARCH_TERMS = [
  '샤넬 22백',
  '롤렉스 서브마리너',
  '에르메스 버킨',
  '디올 레이디백',
  '까르띠에 러브링',
  '루이비통 온더고',
  '프라다 호보백',
  '구찌 마몬트',
];

/** 상단 카테고리 탭 목록 */
const CATEGORY_TABS = [
  { id: 'all', name: '전체 카테고리', icon: Sparkles },
  { id: 'bag', name: '가방 (Bags)', icon: ShoppingBag },
  { id: 'watch', name: '시계 (Watches)', icon: Watch },
  { id: 'jewelry', name: '주얼리 (Jewelry)', icon: Gem },
  { id: 'apparel', name: '의류 (Apparel)', icon: Shirt },
  { id: 'shoes', name: '신발 (Shoes)', icon: Footprints },
];

/** 빠른 가격 범위 프리셋 버튼 */
const PRICE_PRESETS = [
  { label: '전체', min: 0, max: 100000000 },
  { label: '100만원 이하', min: 0, max: 1000000 },
  { label: '100~300만', min: 1000000, max: 3000000 },
  { label: '300~500만', min: 3000000, max: 5000000 },
  { label: '500~1,000만', min: 5000000, max: 10000000 },
  { label: '1,000만원 이상', min: 10000000, max: 100000000 },
];

/**
 * 5대 플랫폼 통합 매물 검색 결과 및 다차원 필터링/무한 스크롤 페이지 컴포넌트
 */
export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  initialCategory = 'all',
  onGoHome,
  onSelectCategory,
  onSelectProduct,
  onNewSearch,
}) => {
  // 검색어 입력 상태
  const [searchInput, setSearchInput] = useState(query);
  // 활성 카테고리
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  // 활성 거래 플랫폼 (전체, 중고나라, 번개장터, 당근, 구구스, 필웨이)
  const [activePlatform, setActivePlatform] = useState<string>('전체');
  // 선택된 브랜드
  const [selectedBrand, setSelectedBrand] = useState<string>('전체');
  // 정렬 기준 (최저가, 최고가, 최신순)
  const [sortBy, setSortBy] = useState<'lowest_price' | 'highest_price' | 'latest'>('lowest_price');
  // 가격 범위 필터 (최저가 / 최고가)
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000000);

  // query props 변경 시 인풋 동기화
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // initialCategory props 변경 시 카테고리 동기화
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // 반응형 한 행당 아이템 수 계산 (데스크탑 기준 5개)
  const [itemsPerRow, setItemsPerRow] = useState<number>(5);
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerRow(5);
      else if (w >= 768) setItemsPerRow(4);
      else if (w >= 640) setItemsPerRow(3);
      else setItemsPerRow(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 페이지네이션 배치 크기 (5줄 단위 = 25개)
  const batchSize = itemsPerRow * 5;
  const [visibleCount, setVisibleCount] = useState<number>(25);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 선택된 카테고리에 맞는 브랜드 목록 추출
  const availableBrands = useMemo(() => {
    if (activeCategory !== 'all' && BRANDS_BY_CATEGORY[activeCategory]) {
      return BRANDS_BY_CATEGORY[activeCategory];
    }
    return POPULAR_BRANDS;
  }, [activeCategory]);

  // 카테고리 변경 시 소속되지 않는 브랜드 선택 리셋
  useEffect(() => {
    if (selectedBrand !== '전체' && !availableBrands.includes(selectedBrand)) {
      setSelectedBrand('전체');
    }
  }, [activeCategory, availableBrands, selectedBrand]);

  // 검색어 및 필터 조건에 따른 매물 목록 필터링/정렬
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. 검색 키워드 매칭 (모델명, 한글명, 브랜드, 태그)
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        product.modelName.toLowerCase().includes(q) ||
        product.koreanName.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchQuery) return false;

      // 2. 카테고리 일치 검사
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // 3. 브랜드 일치 검사
      if (selectedBrand !== '전체' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 4. 거래 플랫폼 포함 여부 검사
      if (activePlatform !== '전체') {
        const platLower = activePlatform.toLowerCase();
        const hasPlatform = product.platformPrices?.some((p) => {
          const name = p.platformName.toLowerCase();
          if (platLower.includes('중고나라')) return name.includes('중고나라');
          return name.includes(platLower);
        });
        if (!hasPlatform) {
          return false;
        }
      }

      // 5. 가격 범위 검사
      if (product.lowestPrice < minPrice || product.lowestPrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // 정렬 처리
      if (sortBy === 'lowest_price') return a.lowestPrice - b.lowestPrice;
      if (sortBy === 'highest_price') return b.lowestPrice - a.lowestPrice;
      return 0; // 최신순 기본
    });
  }, [query, activeCategory, selectedBrand, activePlatform, minPrice, maxPrice, sortBy]);

  // 검색 결과 통계 (최저 시세, 최고 시세, 평균 시세)
  const priceStats = useMemo(() => {
    if (filteredProducts.length === 0) return null;
    const prices = filteredProducts.map((p) => p.lowestPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
    return { min, max, avg, count: filteredProducts.length };
  }, [filteredProducts]);

  // 무한 스크롤 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + batchSize, filteredProducts.length));
            setIsLoadingMore(false);
          }, 250);
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length, isLoadingMore, batchSize]);

  // 필터 변경 시 페이지 카운트 리셋
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [query, activeCategory, selectedBrand, activePlatform, sortBy, batchSize, minPrice, maxPrice]);

  // 필터 전체 초기화 핸들러
  const handleResetFilters = () => {
    setSelectedBrand('전체');
    setActivePlatform('전체');
    setSortBy('lowest_price');
    setMinPrice(0);
    setMaxPrice(100000000);
  };

  // 검색창 서밋 핸들러
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNewSearch(searchInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans-kr flex flex-col justify-between">
      <div>
        {/* 상단 고정 메가 네비게이션 */}
        <MegaCategoryMenu
          onSelectCategory={(catId, brand, subQuery) => {
            if (subQuery) {
              onNewSearch(subQuery);
            } else {
              onSelectCategory(catId, brand);
            }
          }}
          onGoHome={onGoHome}
        />

        {/* 검색 히어로 영역 */}
        <section className="bg-gradient-to-b from-[#F4EDE0] via-[#FAF5EC] to-[#FAF8F5] border-b border-[#E8DEC9] pt-8 pb-10 px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1680px] mx-auto">
            {/* 홈 돌아가기 버튼 */}
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6E6252] hover:text-[#1A1816] transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>홈으로 돌아가기</span>
              </button>
            </div>

            {/* 통합 검색창 */}
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              <form
                id="search-page-input-form"
                onSubmit={handleSearchSubmit}
                className="relative flex items-center shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white border-2 border-[#D8CDBC] focus-within:border-[#C5A059] focus-within:ring-4 focus-within:ring-[#C5A059]/15 overflow-hidden p-2 sm:p-2.5"
              >
                <div className="pl-3 sm:pl-5 text-[#8C7E6C] flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#C5A059]" />
                </div>

                <input
                  id="search-page-main-input"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="브랜드명, 모델명, 상품명을 검색해보세요..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-base sm:text-lg text-[#1A1816] placeholder-[#A89C8C] bg-transparent focus:outline-none font-sans-kr"
                />

                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="p-2 text-[#A89C8C] hover:text-[#2C2825] transition-colors cursor-pointer mr-1"
                    title="지우기"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <button
                  id="btn-search-page-submit"
                  type="submit"
                  className="shrink-0 px-6 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-[#2C2825] to-[#1E3A34] hover:from-[#1A1816] hover:to-[#142823] text-[#F3EAD8] font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <span>검색</span>
                </button>
              </form>

              {/* 인기 추천 검색어 칩 목록 */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                <span className="text-[#8C7E6C] font-medium mr-1">추천:</span>
                {POPULAR_SEARCH_TERMS.slice(0, 6).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchInput(term);
                      onNewSearch(term);
                    }}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-sans-kr transition-all cursor-pointer ${
                      query === term
                        ? 'bg-[#2C2825] text-[#F3EAD8] border border-[#2C2825] font-semibold'
                        : 'bg-white/80 hover:bg-white text-[#5C5245] hover:text-[#1A1816] border border-[#E0D5C3]'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* 검색 결과 수 및 최저/평균 시세 인덱스 카드 */}
            <div className="mt-8 pt-6 border-t border-[#E8DEC9]/80 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#C5A059]/15 text-[#8C6D2D] font-bold text-xs">
                    통합 검색 결과
                  </span>
                  <span className="text-xs text-[#7A6E5E]">중고나라 · 번개장터 · 당근 · 구구스 · 필웨이</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-[#1A1816] mt-1.5">
                  {query ? (
                    <>
                      <span className="text-[#8C6D2D] font-sans-kr">'{query}'</span> 검색 결과
                    </>
                  ) : (
                    '전체 등록 매물'
                  )}
                  <span className="text-base sm:text-lg font-normal text-[#7A6E5E] ml-2 font-sans-kr">
                    총 <strong className="text-[#1A1816] font-bold">{filteredProducts.length}</strong>개 매물
                  </span>
                </h1>
              </div>

              {/* 실시간 가격 통계 */}
              {priceStats && priceStats.count > 0 && (
                <div className="flex items-center gap-3 sm:gap-4 bg-white/90 border border-[#E2D6C3] rounded-2xl px-5 py-3 shadow-xs">
                  <div className="text-left pr-4 border-r border-[#ECE3D5]">
                    <div className="text-xs text-[#8C7E6C] font-medium flex items-center gap-1">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      최저 가격
                    </div>
                    <div className="text-base sm:text-lg font-bold text-emerald-700">
                      {priceStats.min.toLocaleString()}원
                    </div>
                  </div>
                  <div className="text-left pr-4 border-r border-[#ECE3D5]">
                    <div className="text-xs text-[#8C7E6C] font-medium">평균 가격</div>
                    <div className="text-base sm:text-lg font-bold text-[#2C2825]">
                      {priceStats.avg.toLocaleString()}원
                    </div>
                  </div>
                  <div className="text-left pl-1">
                    <div className="text-xs text-[#8C7E6C] font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-rose-600" />
                      최고 가격
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[#2C2825]">
                      {priceStats.max.toLocaleString()}원
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 메인 콘텐츠 영역 */}
        <main className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-10">
          {/* 카테고리 필터 탭 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-5 border-b border-[#E8DEC9]">
            {CATEGORY_TABS.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2C2825] text-[#F3EAD8] shadow-sm font-bold scale-[1.02]'
                      : 'bg-white hover:bg-[#F7F2EA] text-[#5C5245] border border-[#E8DEC9]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#8C7E6C]'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* 상세 필터 박스 (브랜드, 거래 플랫폼, 정렬, 가격 범위) */}
          <div className="luxury-glass rounded-2xl p-4 sm:p-6 border border-[#E8DEC9] mb-8 space-y-5 shadow-xs">
            {/* 필터 헤더 및 초기화 버튼 */}
            <div className="flex items-center justify-between border-b border-[#F0E6DA] pb-3.5">
              <div className="flex items-center gap-2 text-[#2C2825] font-bold text-base sm:text-lg font-sans-kr">
                <SlidersHorizontal className="w-5 h-5 text-[#C5A059]" />
                <span>
                  {activeCategory === 'bag' ? '가방 상세 필터 검색' : activeCategory === 'watch' ? '시계 상세 필터 검색' : '상세 필터 검색'}
                </span>
                {activeCategory !== 'all' && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF3E5] text-[#8C6D2D] border border-[#E5DAC8] font-semibold">
                    {CATEGORY_TABS.find(c => c.id === activeCategory)?.name}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E4D7C5] text-[#7C6E5D] hover:bg-[#F5ECE0] hover:text-[#2C2825] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-[#C5A059]" />
                <span>필터 초기화</span>
              </button>
            </div>

            {/* 브랜드 필터 버튼 (가방/시계 등 카테고리 선택 시 표시) */}
            {activeCategory !== 'all' && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#6B5E4F] mr-2 flex items-center gap-1.5 shrink-0">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  브랜드:
                </span>
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-[#2C2825] text-[#F9F6F1] shadow-2xs font-semibold'
                        : 'bg-white text-[#7C6E5D] border border-[#E4D7C5] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}

            {/* 거래 플랫폼 필터 버튼 */}
            <div className={`${activeCategory !== 'all' ? 'pt-3.5 border-t border-[#F0E6DA]' : ''} flex flex-wrap items-center gap-2`}>
              <span className="text-sm sm:text-base font-bold text-[#6B5E4F] mr-2 flex items-center gap-1.5 shrink-0">
                <Store className="w-4 h-4 text-[#C5A059]" />
                거래 플랫폼:
              </span>
              {FILTER_PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setActivePlatform(platform)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    activePlatform === platform
                      ? 'bg-[#2C2825] text-[#F9F6F1] shadow-2xs font-semibold'
                      : 'bg-white text-[#7C6E5D] border border-[#E4D7C5] hover:bg-[#F5ECE0]'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            {/* 정렬 방식 버튼 */}
            <div className="pt-3.5 border-t border-[#F0E6DA] flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-[#6B5E4F] mr-2 flex items-center gap-1.5 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-[#C5A059]" />
                정렬 방식:
              </span>
              {[
                { id: 'lowest_price', label: '최저가순' },
                { id: 'highest_price', label: '최고가순' },
                { id: 'latest', label: '최신순' },
              ].map((sortItem) => (
                <button
                  key={sortItem.id}
                  type="button"
                  onClick={() => setSortBy(sortItem.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    sortBy === sortItem.id
                      ? 'bg-[#2C2825] text-[#F9F6F1] shadow-2xs font-bold'
                      : 'bg-white text-[#7C6E5D] border border-[#E4D7C5] hover:bg-[#F5ECE0]'
                  }`}
                >
                  {sortItem.label}
                </button>
              ))}
            </div>

            {/* 가격 범위 입력 및 프리셋 버튼 */}
            <div className="pt-3.5 border-t border-[#F0E6DA] flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-sm sm:text-base">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[#6B5E4F] shrink-0 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#C5A059]" />
                    가격 범위 필터:
                  </span>

                  {/* 최저 가격 인풋 */}
                  <div className="flex items-center gap-1 bg-white border border-[#E0D5C5] rounded-xl px-2.5 py-1 focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/20 shadow-2xs">
                    <span className="text-xs text-[#8C7A65] font-semibold shrink-0">최저</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={minPrice === 0 ? '' : Math.floor(minPrice / 10000)}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setMinPrice(0);
                        } else {
                          const num = Number(val);
                          if (!isNaN(num) && num >= 0) {
                            setMinPrice(num * 10000);
                          }
                        }
                      }}
                      className="w-16 sm:w-20 bg-transparent text-right font-mono font-bold text-[#2C2825] outline-none text-sm sm:text-base"
                    />
                    <span className="font-bold text-[#6B5E4F] text-xs sm:text-sm shrink-0">만원</span>
                  </div>

                  <span className="text-[#8C7A65] font-bold">~</span>

                  {/* 최고 가격 인풋 */}
                  <div className="flex items-center gap-1 bg-white border border-[#E0D5C5] rounded-xl px-2.5 py-1 focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#C5A059]/20 shadow-2xs">
                    <span className="text-xs text-[#8C7A65] font-semibold shrink-0">최고</span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={maxPrice >= 100000000 ? '' : Math.floor(maxPrice / 10000)}
                      placeholder="무제한"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setMaxPrice(100000000);
                        } else {
                          const num = Number(val);
                          if (!isNaN(num) && num >= 0) {
                            setMaxPrice(num >= 10000 ? 100000000 : num * 10000);
                          }
                        }
                      }}
                      className="w-16 sm:w-20 bg-transparent text-right font-mono font-bold text-[#2C2825] outline-none text-sm sm:text-base"
                    />
                    <span className="font-bold text-[#6B5E4F] text-xs sm:text-sm shrink-0">만원</span>
                  </div>
                </div>

                {/* 빠른 가격 프리셋 */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {PRICE_PRESETS.map((preset) => {
                    const isSelected = minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A059] text-white shadow-2xs'
                            : 'bg-white text-[#7C6E5D] border border-[#E4D7C5] hover:bg-[#F5ECE0]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 듀얼 슬라이더 바 */}
              <div className="pt-2 pb-1 px-1 flex flex-col gap-2">
                <div className="relative w-full h-6 flex items-center">
                  <div className="absolute left-0 right-0 h-2 bg-[#E8DEC9] rounded-full" />
                  <div
                    className="absolute h-2 bg-gradient-to-r from-[#C5A059] to-[#8C6D2D] rounded-full transition-all duration-75"
                    style={{
                      left: `${(Math.min(minPrice, 20000000) / 20000000) * 100}%`,
                      right: `${100 - (Math.min(maxPrice >= 20000000 ? 20000000 : maxPrice, 20000000) / 20000000) * 100}%`,
                    }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={20000000}
                    step={200000}
                    value={Math.min(minPrice, 20000000)}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const currentMax = maxPrice >= 20000000 ? 20000000 : maxPrice;
                      if (val <= currentMax) {
                        setMinPrice(val);
                      }
                    }}
                    className="dual-slider absolute inset-0 w-full h-full z-20 cursor-pointer"
                    aria-label="최저 가격 조절"
                  />

                  <input
                    type="range"
                    min={0}
                    max={20000000}
                    step={200000}
                    value={maxPrice >= 20000000 ? 20000000 : maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const currentMin = Math.min(minPrice, 20000000);
                      if (val >= currentMin) {
                        setMaxPrice(val >= 20000000 ? 100000000 : val);
                      }
                    }}
                    className="dual-slider absolute inset-0 w-full h-full z-30 cursor-pointer"
                    aria-label="최대 가격 조절"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 검색 결과 매물 카드 그리드 */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#E5DAC8] rounded-3xl p-12 text-center my-8">
              <div className="w-16 h-16 rounded-full bg-[#FAF4EA] text-[#8C7E6C] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#2C2825] mb-2">
                '{query}' 조건에 맞는 매물이 없습니다
              </h3>
              <p className="text-sm text-[#7A6E5E] max-w-md mx-auto mb-6">
                선택하신 필터(브랜드/플랫폼/가격)를 변경하거나 필터 초기화 후 다시 검색해보세요.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#2C2825] text-[#F3EAD8] font-bold text-xs transition-colors cursor-pointer"
                >
                  필터 초기화하기
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
              {filteredProducts.slice(0, visibleCount).map((product) => {
                const discount = product.retailPrice
                  ? Math.round(((product.retailPrice - product.lowestPrice) / product.retailPrice) * 100)
                  : 0;
                const mainPlatform = product.platformPrices[0] || {
                  platformName: '중고나라',
                  price: product.lowestPrice,
                  grade: 'S',
                  inStock: true,
                };

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8DEC9] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* 썸네일 이미지 */}
                    <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                      <img
                        src={product.thumbnailUrl}
                        alt={product.koreanName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* 브랜드 태그 */}
                      <div className="absolute top-3 left-3 bg-[#2C2825]/90 backdrop-blur-xs text-[#F3EAD8] text-[12px] font-mono font-bold px-2.5 py-1 rounded-md shadow-xs">
                        {product.brand}
                      </div>

                      {/* 플랫폼 태그 */}
                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        <span className="bg-[#C5A059] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          {mainPlatform.platformName}
                        </span>
                      </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        {/* 모델명 */}
                        <h3 className="font-bold text-sm sm:text-base text-[#1A1816] line-clamp-2 group-hover:text-[#8C6D2D] transition-colors leading-snug mb-3">
                          {product.koreanName}
                        </h3>
                      </div>

                      {/* 가격 정보 */}
                      <div className="pt-3 border-t border-[#F2ECE1] space-y-1">
                        {product.retailPrice && discount > 0 && (
                          <div className="flex items-center justify-between text-xs text-[#A89C8C]">
                            <span>정가 {product.retailPrice.toLocaleString()}원</span>
                            <span className="text-rose-600 font-bold">-{discount}%</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-[11px] text-[#8C7E6C] block">판매가</span>
                            <div className="text-lg sm:text-xl font-bold text-[#1A1816]">
                              {product.lowestPrice.toLocaleString()}
                              <span className="text-xs font-normal text-[#7A6E5E] ml-0.5">원</span>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-[#FAF5EB] group-hover:bg-[#C5A059] group-hover:text-white text-[#8C7E6C] flex items-center justify-center transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 무한 스크롤 / 더보기 영역 */}
          {visibleCount < filteredProducts.length && (
            <div ref={loadMoreRef} className="py-12 flex justify-center items-center">
              {isLoadingMore ? (
                <div className="flex items-center gap-2 text-sm text-[#8C7E6C] font-medium">
                  <Loader2 className="w-5 h-5 animate-spin text-[#C5A059]" />
                  <span>더 많은 통합 매물을 불러오는 중입니다...</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + batchSize, filteredProducts.length))}
                  className="px-6 py-2.5 rounded-xl bg-white border border-[#D8CDBC] hover:border-[#C5A059] text-xs font-semibold text-[#4A4237] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>더 보기 ({visibleCount} / {filteredProducts.length})</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 푸터 영역 */}
      <footer className="w-full bg-[#2C2825] text-[#D8CFB9] py-12 sm:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 mt-20 border-t border-[#C5A059]/30">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7">
            <ReLuxeLogo size="md" variant="dark" showSubline={false} showGuideLines={false} />
            <div className="flex items-center gap-3.5 text-xs sm:text-sm text-white font-medium">
              <button type="button" className="hover:text-[#EAE2D2] transition-colors cursor-pointer">
                이용약관
              </button>
              <span className="text-[#8C7E6C]/60 select-none">|</span>
              <button type="button" className="hover:text-[#EAE2D2] transition-colors cursor-pointer">
                고객센터
              </button>
            </div>
          </div>
          <div className="text-xs text-[#8C7E6C]">
            <p>© 2026 Reverdi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
