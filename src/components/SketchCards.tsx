import React from 'react';
import { CategoryItem } from '../types';
import { MOCK_PRODUCTS } from '../data/luxuryData';

/**
 * 메인 5대 카테고리 카드 섹션 Props
 */
interface SketchCardsProps {
  /** 5대 카테고리 목록 메타데이터 */
  categories: CategoryItem[];
  /** 카테고리 선택 시 호출되는 콜백 */
  onSelectCategory: (id: string) => void;
}

/**
 * 메인 홈 화면의 5대 핵심 명품 카테고리 카드 갤러리 컴포넌트
 */
export const SketchCards: React.FC<SketchCardsProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-14">
      {/* 섹션 헤더 타이틀 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-7 px-2">
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2825] flex items-center gap-2">
            <span>카테고리 선택</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#7C6F5E] mt-1.5 sm:mt-2 font-sans-kr">
            원하는 명품 카테고리를 클릭하여 매물을 검색하세요
          </p>
        </div>
      </div>

      {/* 5개 수직 카드 그리드 (컴팩트 사이즈) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {categories.map((item) => {
          const isPreparing = item.isPreparing;
          const actualCount = MOCK_PRODUCTS.filter(p => p.category === item.id).length;

          return (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="group relative rounded-xl sm:rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white/90 hover:bg-white border-2 border-[#EADFCF] hover:border-[#C5A059]/70 card-shadow hover:card-shadow-hover hover:-translate-y-1.5 cursor-pointer min-h-[250px] sm:min-h-[270px]"
            >
              {/* 일러스트 아이콘 박스 */}
              <div className="py-6 sm:py-8 px-3 sm:px-4 flex-1 flex flex-col items-center justify-center text-center">
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105 ${
                    isPreparing
                      ? 'bg-[#F9F5EE]/60 text-[#B8A895]'
                      : 'bg-gradient-to-br from-[#FFF9F0] to-[#F5ECE0] text-[#332D27] group-hover:from-[#FFF3E0] group-hover:to-[#EDE1D0] shadow-inner'
                  }`}
                >
                  {/* 가방 일러스트 아이콘 */}
                  {item.iconType === 'bag' && (
                    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round text-[#2C2825]">
                      <path d="M 36,36 C 36,18 64,18 64,36" />
                      <path d="M 18,36 Q 22,34 82,36 Q 88,38 84,82 Q 80,86 20,86 Q 16,86 16,36 Z" />
                      <path d="M 18,36 Q 50,56 82,36" />
                      <circle cx="50" cy="54" r="5" className="fill-[#D4AF37] stroke-[#332D27] stroke-[1.5]" />
                      <path d="M 47,54 L 53,54" />
                      <path d="M 24,80 L 76,80" strokeDasharray="3 3" opacity="0.4" />
                    </svg>
                  )}

                  {/* 시계 일러스트 아이콘 */}
                  {item.iconType === 'watch' && (
                    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round text-[#2C2825]">
                      <path d="M 38,8 L 38,26 C 38,28 62,28 62,26 L 62,8 Z" />
                      <path d="M 38,74 L 38,92 C 38,94 62,94 62,92 L 62,74 Z" />
                      <circle cx="50" cy="50" r="26" className="stroke-[2.5]" />
                      <circle cx="50" cy="50" r="20" opacity="0.6" />
                      <rect x="76" y="46" width="5" height="8" rx="1.5" className="fill-[#D4AF37] stroke-[#332D27]" />
                      <path d="M 50,50 L 50,38" className="stroke-[2.5]" />
                      <path d="M 50,50 L 60,54" className="stroke-[2]" />
                      <circle cx="50" cy="50" r="2.5" className="fill-[#D4AF37]" />
                    </svg>
                  )}

                  {/* 주얼리 아이콘 (준비중) */}
                  {item.iconType === 'jewelry' && (
                    <div className="flex flex-col items-center justify-center text-[#B5A492] group-hover:text-[#C5A059] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round mb-0.5">
                        <circle cx="12" cy="15" r="6" />
                        <path d="M9 3h6l2 4L12 10 7 7 9 3z" />
                        <path d="M7 7h10" />
                        <path d="M12 3v7" />
                      </svg>
                      <span className="font-serif-luxury text-xs sm:text-sm font-medium">Jewelry</span>
                    </div>
                  )}

                  {/* 의류 아이콘 (준비중) */}
                  {item.iconType === 'apparel' && (
                    <div className="flex flex-col items-center justify-center text-[#B5A492] group-hover:text-[#C5A059] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11 fill-none stroke-current stroke-[1.5]">
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                      </svg>
                      <span className="font-serif-luxury text-xs sm:text-sm font-medium">Apparel</span>
                    </div>
                  )}

                  {/* 신발 아이콘 (준비중) */}
                  {item.iconType === 'shoes' && (
                    <div className="flex flex-col items-center justify-center text-[#B5A492] group-hover:text-[#C5A059] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-11 sm:h-11 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round">
                        <path d="M 19 12.5 V 20" />
                        <path d="M 3 18 C 6 18, 9 17, 12 13 L 15.5 8.5 C 17 6.8, 19.5 7.2, 20.2 9 L 21 12 C 18.5 13.2, 16 15, 14 18 H 3 Z" />
                        <path d="M 12 13 C 14 11, 16.5 10, 18.5 10.5" />
                      </svg>
                      <span className="font-serif-luxury text-xs sm:text-sm font-medium">Shoes</span>
                    </div>
                  )}
                </div>

                {/* 카테고리명 */}
                <h3 className="font-sans-kr text-xl sm:text-2xl lg:text-2xl font-bold text-[#2C2825] mt-3 sm:mt-4 group-hover:text-[#1A1816] tracking-tight">
                  {item.title}
                </h3>

                {/* 매물 수 또는 준비중 표기 */}
                {isPreparing ? (
                  <div className="mt-1.5 flex flex-col items-center">
                    <span className="font-brand text-lg sm:text-xl lg:text-2xl text-[#9E8E7D] tracking-wide leading-none">
                      preparing
                    </span>
                    <span className="font-sans-kr text-[11px] sm:text-xs text-[#A89887] font-medium mt-0.5">
                      (준비중)
                    </span>
                  </div>
                ) : (
                  <span className="text-xs sm:text-sm text-[#8C7D6B] font-sans-kr font-medium mt-1.5">
                    {actualCount.toLocaleString()}개 통합 매물
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
