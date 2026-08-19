import React from 'react';

/**
 * Reverdi 브랜드 로고 컴포넌트 Props
 */
interface ReverdiLogoProps {
  /** 로고 크기 프리셋 ('sm' | 'md' | 'lg' | 'xl' | 'responsive') */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  /** 로고 하단 포인트 언더라인 표시 여부 */
  showSubline?: boolean;
  /** 타이포그래피 가이드라인 표시 여부 */
  showGuideLines?: boolean;
  /** 추가 Tailwind 클래스 */
  className?: string;
  /** 테마 변형 ('light' 밝은 배경용 | 'dark' 어두운 푸터용) */
  variant?: 'light' | 'dark';
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

/**
 * 사용자 업로드 이미지와 1:1 일치하는 골드 메탈릭 크라운(왕관) SVG 아이콘
 * (좌우 끝 볼 피니얼, 중앙 최고점 링 피니얼, 하단 메탈 밴드 베이스)
 */
const ReverdiGoldCrown: React.FC<{ className?: string; variant?: 'light' | 'dark' }> = ({
  className = 'w-6 h-6',
  variant = 'light',
}) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      {/* 샴페인 골드 브러시드 메탈 그라데이션 */}
      <linearGradient id="reverdiCrownGold" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stopColor="#F7ECC9" />
        <stop offset="20%" stopColor="#E5CB8E" />
        <stop offset="45%" stopColor="#D4B776" />
        <stop offset="70%" stopColor="#BE9D59" />
        <stop offset="100%" stopColor="#8C6E33" />
      </linearGradient>

      {/* 내부 빛 반사 하이라이트 */}
      <linearGradient id="reverdiCrownShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#F9E8B8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#A8853D" stopOpacity="0.1" />
      </linearGradient>

      {/* 골드 엠보싱 섀도우 필터 */}
      <filter id="crownDepthShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#423012" floodOpacity={variant === 'dark' ? '0.6' : '0.28'} />
      </filter>
    </defs>

    <g filter="url(#crownDepthShadow)">
      {/* 왕관 본체 곡면 */}
      <path
        d="M 16 58 L 14 26 C 24 38, 36 46, 50 14 C 64 46, 76 38, 86 26 L 84 58 Z"
        fill="url(#reverdiCrownGold)"
        stroke={variant === 'dark' ? '#F7ECC9' : '#8A6D33'}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* 표면 은은한 하이라이트 반사 */}
      <path
        d="M 16 58 L 14 26 C 24 38, 36 46, 50 14 L 50 58 Z"
        fill="url(#reverdiCrownShimmer)"
      />

      {/* 왕관 하단 직사각형 메탈 밴드 */}
      <rect
        x="13"
        y="58"
        width="74"
        height="8.5"
        rx="1"
        fill="url(#reverdiCrownGold)"
        stroke={variant === 'dark' ? '#F7ECC9' : '#8A6D33'}
        strokeWidth="0.8"
      />

      {/* 중앙 최고점 원형 링(고리) 피니얼 */}
      <circle
        cx="50"
        cy="10.5"
        r="4.2"
        fill="none"
        stroke="url(#reverdiCrownGold)"
        strokeWidth="2.2"
      />
      <circle
        cx="50"
        cy="10.5"
        r="2"
        fill={variant === 'dark' ? '#2C2825' : '#FAF8F5'}
      />

      {/* 좌측 첨두 솔리드 볼 피니얼 */}
      <circle
        cx="14"
        cy="24"
        r="3.2"
        fill="url(#reverdiCrownGold)"
        stroke={variant === 'dark' ? '#F7ECC9' : '#8A6D33'}
        strokeWidth="0.6"
      />

      {/* 우측 첨두 솔리드 볼 피니얼 */}
      <circle
        cx="86"
        cy="24"
        r="3.2"
        fill="url(#reverdiCrownGold)"
        stroke={variant === 'dark' ? '#F7ECC9' : '#8A6D33'}
        strokeWidth="0.6"
      />
    </g>
  </svg>
);

/**
 * Reverdi 골드 메탈릭 럭셔리 워드마크 및 크라운 통합 로고
 * (사용자 업로드 디자인과 일치하는 브러시드 골드 피니시 및 디도네 세리프 룩)
 */
export const ReLuxeLogo: React.FC<ReverdiLogoProps> = ({
  size = 'responsive',
  showSubline = false,
  showGuideLines = false,
  className = '',
  variant = 'light',
  onClick,
}) => {
  // 크기별 폰트 사이즈 매핑
  const textSizeClass = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    responsive: 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl',
  }[size];

  // 크기별 상하 패딩 매핑 (왕관 공간 확보 및 수직 중앙 정렬)
  const paddingClass = {
    sm: 'px-1.5 pt-3 pb-0.5',
    md: 'px-2 pt-4 pb-1',
    lg: 'px-2.5 pt-6 sm:pt-7 pb-1.5',
    xl: 'px-3 pt-7 sm:pt-9 pb-2',
    responsive: 'px-3 pt-6 sm:pt-8 md:pt-10 pb-2',
  }[size];

  // 크기별 하단 골드 라인 너비
  const sublineSizeClass = {
    sm: 'w-12 h-[1px] mt-0.5',
    md: 'w-20 h-[1.2px] mt-1',
    lg: 'w-32 sm:w-40 h-[1.5px] mt-2.5',
    xl: 'w-44 sm:w-56 h-[2px] mt-3.5',
    responsive: 'w-28 sm:w-40 md:w-52 h-[1.5px] mt-3 sm:mt-4',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className={`relative inline-block ${paddingClass}`}>
        {/* 디자인 정렬 가이드 라인 (선택) */}
        {showGuideLines && (
          <div className="absolute inset-x-0 top-6 bottom-2 pointer-events-none flex flex-col justify-between py-[3%] opacity-40">
            <div className="w-full border-t border-[#C5A059]/30" />
            <div className="w-full border-t border-[#C5A059]/30 relative top-[18%]" />
            <div className="w-full border-t border-[#C5A059]/30" />
          </div>
        )}

        {/* Reverdi 메인 골드 메탈릭 워드마크 */}
        <div
          className={`font-brand ${textSizeClass} font-semibold tracking-[-0.015em] leading-none flex items-baseline relative z-10`}
          style={{
            letterSpacing: '-0.02em',
          }}
        >
          {/* 'R' 문자 + 상단 골드 크라운 */}
          <span className="relative inline-flex flex-col items-center">
            {/* R 상단 브러시드 골드 크라운 */}
            <span className="absolute -top-[0.58em] left-[46%] -translate-x-1/2 pointer-events-none flex items-center justify-center z-20">
              <ReverdiGoldCrown
                variant={variant}
                className="w-[0.76em] h-[0.58em] filter drop-shadow-[0_2px_4px_rgba(110,85,35,0.3)]"
              />
            </span>

            {/* 대문자 R (골드 메탈릭 텍스처) */}
            <span
              className="bg-gradient-to-b from-[#F9EDCC] via-[#D5B876] to-[#8C6D31] bg-clip-text text-transparent"
              style={{
                filter:
                  variant === 'dark'
                    ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 1px 1px rgba(247,236,201,0.3))'
                    : 'drop-shadow(0 2px 3px rgba(110,85,35,0.28)) drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
              }}
            >
              R
            </span>
          </span>

          {/* 소문자 'everdi' (동일한 골드 메탈릭 텍스처) */}
          <span
            className="bg-gradient-to-b from-[#F9EDCC] via-[#D5B876] to-[#8C6D31] bg-clip-text text-transparent"
            style={{
              filter:
                variant === 'dark'
                  ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 1px 1px rgba(247,236,201,0.3))'
                  : 'drop-shadow(0 2px 3px rgba(110,85,35,0.28)) drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
            }}
          >
            everdi
          </span>
        </div>
      </div>

      {/* 하단 포인트 언더라인 (선택) */}
      {showSubline && (
        <div
          className={`${sublineSizeClass} bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-75 rounded-full`}
        />
      )}
    </div>
  );
};

// 하위 호환성을 위해 ReverdiLogo 별칭도 함께 export
export { ReLuxeLogo as ReverdiLogo };


