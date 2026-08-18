import React from 'react';
import { LuxuryProduct } from '../types';
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/luxuryData';

/** 추천물품 섹션 컴포넌트 Props */
interface RecommendedProductsProps {
  /** 상품 카드 클릭 시 호출되는 콜백 함수 */
  onSelectProduct: (product: LuxuryProduct) => void;
  /** 전체 매물 둘러보기 클릭 시 호출되는 콜백 */
  onViewAll?: () => void;
}

/**
 * 메인 홈 화면의 에디터 추천 인기 명품 매물 8선 갤러리 컴포넌트
 */
export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  onSelectProduct,
  onViewAll,
}) => {
  // 상위 10개 인기 추천 매물 추출 (1줄 5개씩 2줄 배치)
  const recommendedItems = MOCK_PRODUCTS.slice(0, 10);

  return (
    <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mt-16 sm:mt-24 lg:mt-28">
      {/* 섹션 헤더 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          {/* 에디터 픽 뱃지 */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#8C6D2D] font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              Re:Luxe 에디터 픽
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-[#1A1816] tracking-tight">
            추천물품
          </h2>
          <p className="text-base sm:text-lg text-[#7A6E5E] mt-2 font-sans-kr">
            실시간 다중 플랫폼 시세 비교 및 검증을 마친 인기 명품 매물
          </p>
        </div>

        {/* 전체 매물 보기 버튼 */}
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#6E6252] hover:text-[#1A1816] transition-colors cursor-pointer group shrink-0"
          >
            <span>전체 매물 둘러보기</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {/* 1줄에 5개씩 배치되는 추천 상품 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {recommendedItems.map((product) => {
          // 백화점 정가 대비 할인율 계산
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

              {/* 상품 상세 정보 (이름, 시세/최저가) */}
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
    </section>
  );
};
