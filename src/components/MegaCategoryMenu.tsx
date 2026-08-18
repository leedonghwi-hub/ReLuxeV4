import React, { useState } from 'react';
import { X, User, LogIn, Menu } from 'lucide-react';
import { ReLuxeLogo } from './ReLuxeLogo';
import { CategoryItem } from '../types';

/** 상단 네비게이션 및 메가 카테고리 메뉴 Props */
export interface MegaNavProps {
  /** 카테고리/브랜드/검색어 선택 시 호출되는 콜백 */
  onSelectCategory: (categoryId: string, brand?: string, subQuery?: string) => void;
  /** 준비중 카테고리 알림 신청 모달 오픈 콜백 */
  onOpenNotifyModal: (category: CategoryItem) => void;
  /** 홈 화면으로 이동 콜백 */
  onGoHome: () => void;
}

/** 메가 드롭다운 메뉴용 5대 카테고리 데이터 */
export const MEGA_CATEGORY_DATA = [
  {
    id: 'bag',
    title: '가방',
    iconType: 'bag',
    isPreparing: false,
  },
  {
    id: 'watch',
    title: '시계',
    iconType: 'watch',
    isPreparing: false,
  },
  {
    id: 'jewelry',
    title: '주얼리',
    iconType: 'jewelry',
    isPreparing: true,
  },
  {
    id: 'apparel',
    title: '의류',
    iconType: 'apparel',
    isPreparing: true,
  },
  {
    id: 'shoes',
    title: '신발',
    iconType: 'shoes',
    isPreparing: true,
  },
];

/**
 * 상단 고정 헤더 바 및 카테고리 전체보기 메가 드롭다운 메뉴 컴포넌트
 */
export const MegaCategoryMenu: React.FC<MegaNavProps> = ({
  onSelectCategory,
  onOpenNotifyModal,
  onGoHome,
}) => {
  // 드롭다운 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 클릭으로 메뉴 고정 상태
  const [isPinned, setIsPinned] = useState(false);

  // 카테고리 버튼 클릭 핸들러 (토글 및 핀 고정)
  const handleCategoryButtonClick = () => {
    if (isOpen) {
      if (isPinned) {
        setIsPinned(false);
        setIsOpen(false);
      } else {
        setIsPinned(true);
      }
    } else {
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  return (
    <div
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8DEC9] select-none text-[#2C2825] shadow-xs transition-shadow"
      onMouseLeave={() => {
        if (!isPinned) {
          setIsOpen(false);
        }
      }}
    >
      {/* 상단 메인 네비게이션 바 */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* 좌측 카테고리 토글 버튼 */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handleCategoryButtonClick}
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm sm:text-base font-bold transition-all rounded-lg cursor-pointer ${
                isOpen
                  ? 'text-[#1A1816] font-extrabold bg-[#F5ECE0]'
                  : 'text-[#332D27] hover:text-[#1A1816] hover:bg-[#FAF6F0]'
              }`}
            >
              {isOpen ? (
                <X className="w-4 h-4 text-[#1A1816] stroke-[2.5]" />
              ) : (
                <Menu className="w-4 h-4 text-[#332D27]" />
              )}
              <span>카테고리</span>
            </button>
          </div>

          {/* 우측 영역: 로그인, 마이페이지 및 Re:Luxe 로고 */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-medium text-[#4A4237]">
              <button
                id="btn-nav-login"
                type="button"
                className="px-2.5 py-1.5 rounded-lg hover:bg-[#F7F2EA] hover:text-[#1A1816] text-[#4A4237] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#8C7E6C]" />
                <span className="hidden sm:inline">로그인</span>
              </button>
              <span className="text-[#D8CDBC] text-xs select-none">|</span>
              <button
                id="btn-nav-mypage"
                type="button"
                className="px-2.5 py-1.5 rounded-lg hover:bg-[#F7F2EA] hover:text-[#1A1816] text-[#4A4237] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#8C7E6C]" />
                <span className="hidden sm:inline">마이페이지</span>
              </button>
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#E8DEC9] mx-0.5" />

            {/* 브랜드 홈 이동 로고 */}
            <div
              id="header-nav-logo"
              onClick={onGoHome}
              className="cursor-pointer hover:opacity-85 transition-opacity py-1 pl-1"
              title="홈으로 가기"
            >
              <ReLuxeLogo size="sm" showSubline={false} showGuideLines={false} />
            </div>
          </div>
        </div>
      </div>

      {/* 전체 너비 메가 드롭다운 오버레이 */}
      {isOpen && (
        <div
          className="absolute left-0 top-full w-full max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-md border-b-2 border-[#E5DAC8] shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => {
            if (!isPinned) {
              setIsOpen(false);
            }
          }}
        >
          <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
            <div className="w-full">
              {/* 메인 화면 5대 카테고리와 동일한 5컬럼 그리드 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 py-2 px-1">
                {MEGA_CATEGORY_DATA.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className={`flex flex-col justify-between ${
                      idx !== MEGA_CATEGORY_DATA.length - 1 ? 'lg:border-r border-[#F0E8DC] lg:pr-6' : ''
                    }`}
                  >
                    {/* 카테고리 인터랙티브 통합 카드 (상하 넉넉한 높이 확보 및 호버 시 잘림 방지) */}
                    <div
                      onClick={() => {
                        if (!cat.isPreparing) {
                          if (!isPinned) setIsOpen(false);
                          onSelectCategory(cat.id);
                        } else {
                          onOpenNotifyModal({
                            id: cat.id,
                            title: cat.title,
                            subtitle: 'ReLuxe Category',
                            sketchLabel: 'preparing',
                            isPreparing: true,
                            iconType: cat.iconType || 'bag',
                            description: `${cat.title} 서비스는 곧 오픈될 예정입니다.`,
                          });
                        }
                      }}
                      className={`group/icon rounded-2xl flex flex-col items-center justify-between p-5 transition-all duration-200 cursor-pointer min-h-[165px] sm:min-h-[185px] ${
                        cat.isPreparing
                          ? 'bg-[#F9F5EE]/70 text-[#B8A895] border border-dashed border-[#E5DACE] hover:border-[#C5A059]'
                          : 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F3E8D8] text-[#332D27] hover:from-[#FFF7EA] hover:to-[#EFE2CE] border border-[#E8DFC8] hover:border-[#C5A059] shadow-2xs hover:shadow-lg'
                      }`}
                    >
                      {/* 일러스트 아이콘 */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-200 group-hover/icon:scale-105 my-auto">
                        {cat.iconType === 'bag' && (
                          <svg viewBox="0 0 100 100" className="w-11 h-11 fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round text-[#2C2825]">
                            <path d="M 36,36 C 36,18 64,18 64,36" />
                            <path d="M 18,36 Q 22,34 82,36 Q 88,38 84,82 Q 80,86 20,86 Q 16,86 16,36 Z" />
                            <path d="M 18,36 Q 50,56 82,36" />
                            <circle cx="50" cy="54" r="4.5" className="fill-[#D4AF37] stroke-[#332D27] stroke-[1.5]" />
                            <path d="M 47,54 L 53,54" />
                          </svg>
                        )}
                        {cat.iconType === 'watch' && (
                          <svg viewBox="0 0 100 100" className="w-11 h-11 fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round text-[#2C2825]">
                            <path d="M 38,8 L 38,26 C 38,28 62,28 62,26 L 62,8 Z" />
                            <path d="M 38,74 L 38,92 C 38,94 62,94 62,92 L 62,74 Z" />
                            <circle cx="50" cy="50" r="25" className="stroke-[2.5]" />
                            <circle cx="50" cy="50" r="19" opacity="0.6" />
                            <rect x="75" y="46" width="5" height="8" rx="1.5" className="fill-[#D4AF37] stroke-[#332D27]" />
                            <path d="M 50,50 L 50,38" className="stroke-[2.5]" />
                            <path d="M 50,50 L 60,54" className="stroke-[2]" />
                            <circle cx="50" cy="50" r="2.5" className="fill-[#D4AF37]" />
                          </svg>
                        )}
                        {cat.iconType === 'jewelry' && (
                          <svg viewBox="0 0 24 24" className="w-9 h-9 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round text-[#8C7D6B] group-hover/icon:text-[#C5A059]">
                            <circle cx="12" cy="15" r="5.5" />
                            <path d="M9 3h6l2 4L12 10 7 7 9 3z" />
                            <path d="M7 7h10" />
                            <path d="M12 3v7" />
                          </svg>
                        )}
                        {cat.iconType === 'apparel' && (
                          <svg viewBox="0 0 24 24" className="w-9 h-9 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round text-[#8C7D6B] group-hover/icon:text-[#C5A059]">
                            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                          </svg>
                        )}
                        {cat.iconType === 'shoes' && (
                          <svg viewBox="0 0 24 24" className="w-9 h-9 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round text-[#8C7D6B] group-hover/icon:text-[#C5A059]">
                            <path d="M 19 12.5 V 20" />
                            <path d="M 3 18 C 6 18, 9 17, 12 13 L 15.5 8.5 C 17 6.8, 19.5 7.2, 20.2 9 L 21 12 C 18.5 13.2, 16 15, 14 18 H 3 Z" />
                            <path d="M 12 13 C 14 11, 16.5 10, 18.5 10.5" />
                          </svg>
                        )}
                      </div>

                      {/* 카테고리 텍스트 라벨 */}
                      <div className="w-full text-center pt-3">
                        <div className="flex items-center justify-center gap-1.5 font-sans-kr font-bold text-sm sm:text-base text-[#1A1816] group-hover/icon:text-[#8C6D2D] transition-colors">
                          <span>{cat.title}</span>
                          {cat.isPreparing && (
                            <span className="text-[10px] bg-[#EFE9DF] text-[#8C7E6C] px-1.5 py-0.5 rounded font-normal">
                              준비중
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
