import React from 'react';

/**
 * Re:Luxe 브랜드 로고 컴포넌트 Props
 */
interface ReLuxeLogoProps {
  /** 로고 크기 프리셋 ('sm' | 'md' | 'lg' | 'xl' | 'responsive') */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  /** 로고 하단 골드 언더라인 표시 여부 */
  showSubline?: boolean;
  /** 타이포그래피 그리드 가이드라인 표시 여부 (디자인 스케치 룩) */
  showGuideLines?: boolean;
  /** 추가 Tailwind 클래스 */
  className?: string;
  /** 테마 변형 ('light' 밝은 배경용 | 'dark' 어두운 푸터용) */
  variant?: 'light' | 'dark';
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

/**
 * 로고 상단 골드 크라운(왕관) SVG 아이콘
 */
const LogoCrown: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="crownGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="25%" stopColor="#E5C158" />
        <stop offset="50%" stopColor="#C5A059" />
        <stop offset="75%" stopColor="#9C7733" />
        <stop offset="100%" stopColor="#684E1A" />
      </linearGradient>
      <linearGradient id="crownShimmer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#FFEAA5" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#C5A059" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#E0F2FE" />
        <stop offset="80%" stopColor="#7DD3FC" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* 왕관 본체 */}
    <path
      d="M 10 60 L 4 28 L 26 44 L 50 16 L 74 44 L 96 28 L 90 60 Z"
      fill="url(#crownGoldMain)"
      stroke="#594111"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M 50 16 L 50 60 L 74 44 Z" fill="url(#crownShimmer)" />
    <path d="M 4 28 L 26 44 L 20 60 Z" fill="url(#crownShimmer)" />
    {/* 왕관 하단 밴드 */}
    <rect x="8" y="58" width="84" height="12" rx="3" fill="#9C7733" stroke="#4A340A" strokeWidth="1" />
    {/* 보석 포인트 */}
    <circle cx="50" cy="16" r="5" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="1" />
    <circle cx="4" cy="28" r="3.5" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="96" cy="28" r="3.5" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="0.8" />
  </svg>
);

/**
 * Re:Luxe 브랜드 심볼 및 워드마크 통합 로고 컴포넌트
 */
export const ReLuxeLogo: React.FC<ReLuxeLogoProps> = ({
  size = 'responsive',
  showSubline = true,
  showGuideLines = false,
  className = '',
  variant = 'light',
  onClick,
}) => {
  // 크기별 폰트 사이즈 매핑
  const textSizeClass = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    responsive: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl',
  }[size];

  // 크기별 하단 골드 라인 너비
  const sublineSizeClass = {
    sm: 'w-16 h-[1px] mt-1',
    md: 'w-24 h-[1.2px] mt-1.5',
    lg: 'w-36 sm:w-44 h-[1.5px] mt-3',
    xl: 'w-48 sm:w-60 h-[2px] mt-4',
    responsive: 'w-28 sm:w-40 md:w-52 h-[1.5px] mt-3 sm:mt-4',
  }[size];

  const textColorLuxe = variant === 'dark' ? 'text-[#F5F0EB]' : 'text-[#111111]';
  const guideLineStyle = variant === 'dark' ? 'border-[#C5A059]/25' : 'border-[#111111]/20';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative inline-block px-2 pt-6 pb-2">
        {/* 타이포그래피 정렬 가이드 라인 (옵션) */}
        {showGuideLines && (
          <div className="absolute inset-x-0 top-6 bottom-2 pointer-events-none flex flex-col justify-between py-[3%] opacity-40">
            <div className={`w-full border-t ${guideLineStyle}`} />
            <div className={`w-full border-t ${guideLineStyle} relative top-[18%]`} />
            <div className={`w-full border-t ${guideLineStyle}`} />
          </div>
        )}

        {/* Re:Luxe 메인 워드마크 */}
        <div className={`font-brand ${textSizeClass} font-bold tracking-normal leading-none flex items-baseline relative z-10`}>
          {/* "Re" 섹션 (골드 그라데이션) */}
          <span className="inline-flex items-baseline relative">
            <span className="relative inline-flex flex-col items-center">
              {/* 대문자 R 상단 왕관 심볼 */}
              <span className="absolute -top-[0.55em] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center z-20">
                <span className="absolute w-[1em] h-[1em] bg-[#FFE58F]/20 rounded-full blur-sm -z-10" />
                <LogoCrown className="w-[0.75em] h-[0.52em] filter drop-shadow-[0_1px_3px_rgba(197,160,89,0.35)]" />
              </span>

              {/* R 글자 */}
              <span className="bg-gradient-to-b from-[#F7E7BD] via-[#C5A059] to-[#826019] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                R
              </span>
            </span>

            {/* e 글자 */}
            <span className="bg-gradient-to-b from-[#F7E7BD] via-[#C5A059] to-[#826019] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
              e
            </span>
          </span>

          {/* 콜론 ":" */}
          <span className="text-[#C5A059] mx-[0.05em] font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
            :
          </span>

          {/* "Luxe" 섹션 */}
          <span className={`${textColorLuxe} font-serif tracking-tight`}>
            Luxe
          </span>
        </div>
      </div>

      {/* 중앙 골드 포인트 언더라인 */}
      {showSubline && (
        <div className={`${sublineSizeClass} bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80 rounded-full`} />
      )}
    </div>
  );
};
