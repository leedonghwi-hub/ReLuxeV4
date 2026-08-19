import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LuxuryProduct } from '../types';
import { Sparkles, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/luxuryData';

/** 추천물품 섹션 컴포넌트 Props */
interface RecommendedProductsProps {
  /** 상품 카드 클릭 시 호출되는 콜백 함수 */
  onSelectProduct: (product: LuxuryProduct) => void;
  /** 전체 매물 둘러보기 클릭 시 호출되는 콜백 */
  onViewAll?: () => void;
}

const ITEMS_PER_PAGE = 10; // 5개씩 2줄 = 10개
const TOTAL_PAGES = 10; // 최대 10쪽

/**
 * 메인 홈 화면의 에디터 추천 명품 매물 갤러리 컴포넌트
 * - 5개씩 2줄 (10개 매물) 1쪽 구성
 * - 10초마다 왼쪽으로 자동 슬라이드 (최대 10쪽 지원)
 */
export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  onSelectProduct,
  onViewAll,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressKey, setProgressKey] = useState<number>(0);

  // 10쪽 분량의 100개 추천 아이템 데이터 (5개씩 2줄 x 10쪽)
  const pagesData = useMemo(() => {
    const pages: LuxuryProduct[][] = [];
    for (let p = 0; p < TOTAL_PAGES; p++) {
      const pageItems: LuxuryProduct[] = [];
      for (let i = 0; i < ITEMS_PER_PAGE; i++) {
        const productIndex = (p * ITEMS_PER_PAGE + i) % MOCK_PRODUCTS.length;
        pageItems.push({
          ...MOCK_PRODUCTS[productIndex],
          id: `rec-p${p}-i${i}-${MOCK_PRODUCTS[productIndex].id}`,
        });
      }
      pages.push(pageItems);
    }
    return pages;
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % TOTAL_PAGES);
    setProgressKey((prev) => prev + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES);
    setProgressKey((prev) => prev + 1);
  }, []);

  const handleGoToPage = (index: number) => {
    setCurrentPage(index);
    setProgressKey((prev) => prev + 1);
  };

  // 10초마다 다음 쪽으로 자동 슬라이드
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNextPage();
    }, 10000);

    return () => clearInterval(timer);
  }, [isPaused, handleNextPage, progressKey]);

  return (
    <section
      className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-10 lg:mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 섹션 헤더 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          {/* 에디터 픽 뱃지 */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#8C6D2D] font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              Reverdi 에디터 픽
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#1A1816] tracking-tight">
            추천물품
          </h2>
          <p className="text-base sm:text-lg text-[#7A6E5E] mt-2 font-sans-kr">
            Reverdi가 추천하는 명품 매물
          </p>
        </div>

        {/* 컨트롤 및 전체 매물 보기 버튼 */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* 페이지 카운터 & 이전/다음 버튼 */}
          <div className="flex items-center gap-2 bg-white/90 border border-[#E2D6C3] rounded-full px-3 py-1.5 shadow-xs">
            <button
              type="button"
              onClick={handlePrevPage}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3EAD8] text-[#5C5042] transition-colors cursor-pointer"
              aria-label="이전 추천 매물 10개"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm font-medium font-mono text-[#2C2825] px-1 select-none min-w-[52px] text-center">
              <strong className="text-[#C5A059] font-bold">{currentPage + 1}</strong> / {TOTAL_PAGES}
            </div>
            <button
              type="button"
              onClick={handleNextPage}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3EAD8] text-[#5C5042] transition-colors cursor-pointer"
              aria-label="다음 추천 매물 10개"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3EAD8] text-[#8C7E6C] transition-colors cursor-pointer border-l border-[#ECE3D5] pl-2 ml-1"
              title={isPaused ? '자동 롤링 시작' : '자동 롤링 일시정지'}
              aria-label={isPaused ? '자동 롤링 시작' : '자동 롤링 일시정지'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="hidden sm:inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#6E6252] hover:text-[#1A1816] transition-colors cursor-pointer group"
            >
              <span>전체 매물</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>

      {/* 10초 타이머 프로그레스 바 */}
      <div className="w-full bg-[#EAE2D2] h-1 rounded-full mb-6 overflow-hidden">
        <div
          key={progressKey}
          className={`h-full bg-[#C5A059] rounded-full transition-all ${
            isPaused ? 'opacity-50' : 'animate-[recommendTimer_10s_linear]'
          }`}
          style={{ width: isPaused ? '100%' : undefined }}
        />
      </div>

      {/* 5개씩 2줄 (10개) 10쪽 캐러셀 슬라이더 컨테이너 */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pagesData.map((pageItems, pageIdx) => (
            <div key={pageIdx} className="w-full shrink-0">
              {/* 5열 2행 그리드 (총 10개) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {pageItems.map((product) => {
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
                      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#E8DEC9] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      {/* 상품 썸네일 이미지 영역 */}
                      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF7F2]">
                        <img
                          src={product.thumbnailUrl}
                          alt={product.koreanName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />

                        {/* 브랜드 라벨 */}
                        <div className="absolute top-3.5 left-3.5 bg-[#2C2825]/90 backdrop-blur-xs text-[#F3EAD8] text-xs font-mono font-bold px-3 py-1.5 rounded-lg shadow-xs">
                          {product.brand}
                        </div>

                        {/* 대표 플랫폼 뱃지 */}
                        <div className="absolute top-3.5 right-3.5">
                          <span className="bg-[#C5A059] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                            {mainPlatform.platformName}
                          </span>
                        </div>
                      </div>

                      {/* 상품 상세 정보 (이름, 가격) */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-[#1A1816] line-clamp-2 group-hover:text-[#8C6D2D] transition-colors leading-snug mb-3">
                            {product.koreanName}
                          </h3>
                        </div>

                        {/* 가격 정보 영역 */}
                        <div className="pt-4 border-t border-[#F2ECE1] space-y-1.5">
                          {product.retailPrice && discount > 0 && (
                            <div className="flex items-center justify-between text-xs sm:text-sm text-[#A89C8C]">
                              <span>정가 {product.retailPrice.toLocaleString()}원</span>
                              <span className="text-rose-600 font-bold">-{discount}%</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <span className="text-xs text-[#8C7E6C] block">판매가</span>
                              <div className="text-lg sm:text-xl font-bold text-[#1A1816]">
                                {product.lowestPrice.toLocaleString()}
                                <span className="text-sm font-normal text-[#7A6E5E] ml-0.5">원</span>
                              </div>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-[#FAF5EB] group-hover:bg-[#C5A059] group-hover:text-white text-[#8C7E6C] flex items-center justify-center transition-all shadow-xs">
                              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 10쪽 페이지네이션 인디케이터 도트 */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleGoToPage(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentPage === idx
                ? 'w-8 bg-[#C5A059]'
                : 'w-2.5 bg-[#DCD2C0] hover:bg-[#B3A490]'
            }`}
            aria-label={`${idx + 1}쪽으로 이동`}
          />
        ))}
      </div>
    </section>
  );
};
