import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { ReLuxeLogo } from './ReLuxeLogo';

/** 메인 히어로 헤더 Props */
interface HeaderProps {
  /** 검색 실행 시 호출되는 콜백 함수 */
  onSearch?: (query: string) => void;
}

/** 메인 화면 인기 추천 검색어 목록 */
const POPULAR_KEYWORDS = [
  '샤넬 22백',
  '롤렉스 서브마리너',
  '에르메스 버킨',
  '디올 레이디백',
  '까르띠에 러브링',
  '루이비통 온더고',
];

/**
 * 메인 홈 화면의 히어로 섹션 (로고, 서브타이틀, 메인 검색 바, 인기 검색어 칩)
 */
export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  // 사용자가 입력 중인 검색 키워드 상태
  const [keyword, setKeyword] = useState('');

  // 폼 제출(Enter 또는 검색 버튼 클릭) 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword.trim());
    }
  };

  // 인기 검색어 칩 클릭 시 즉시 검색 실행
  const handleKeywordClick = (kw: string) => {
    setKeyword(kw);
    if (onSearch) {
      onSearch(kw);
    }
  };

  return (
    <header className="relative w-full text-center pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12">
      {/* 배경 은은한 방사형 골드 글로우 이펙트 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-[#FFF5E6] via-[#FAF3E5]/60 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* 브랜드 로고 (Reverdi) */}
      <div className="my-3 sm:my-5 flex justify-center">
        <ReLuxeLogo size="responsive" showSubline={false} showGuideLines={false} />
      </div>

      {/* 한글 타이틀 & 설명 */}
      <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3D352B] mt-6 sm:mt-8 tracking-widest">
        중고명품 통합검색 사이트
      </p>
      <p className="text-base sm:text-lg md:text-xl text-[#7C6F5E] mt-3 sm:mt-4 font-sans-kr font-normal max-w-3xl mx-auto">
        국내 주요 플랫폼의 매물을 검색하여 운명을 찾아보세요
      </p>

      {/* 중앙 메인 통합 검색창 */}
      <div className="mt-12 sm:mt-16 max-w-4xl lg:max-w-5xl mx-auto w-full px-2 sm:px-4">
        <form
          id="main-hero-search-form"
          onSubmit={handleSubmit}
          className="relative flex items-center shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white border-2 border-[#D8CDBC] focus-within:border-[#C5A059] focus-within:ring-4 focus-within:ring-[#C5A059]/15 overflow-hidden p-2 sm:p-2.5"
        >
          {/* 돋보기 아이콘 */}
          <div className="pl-3 sm:pl-5 text-[#8C7E6C] flex items-center justify-center">
            <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059]" />
          </div>

          {/* 검색어 입력 인풋 */}
          <input
            id="main-hero-search-input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="브랜드명, 모델명, 상품명을 검색해보세요 (예: 샤넬 클래식, 롤렉스 서브마리너)"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg text-[#1A1816] placeholder-[#A89C8C] bg-transparent focus:outline-none font-sans-kr"
          />

          {/* 검색어 지우기 (X) 버튼 */}
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="p-2.5 text-[#A89C8C] hover:text-[#2C2825] transition-colors cursor-pointer mr-1"
              title="검색어 지우기"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* 통합검색 제출 버튼 */}
          <button
            id="main-hero-search-submit-btn"
            type="submit"
            className="shrink-0 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#2C2825] to-[#1E3A34] hover:from-[#1A1816] hover:to-[#142823] text-[#F3EAD8] font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>통합검색</span>
          </button>
        </form>

        {/* 하단 영역: 좌측 인기 검색어 칩 목록 & 우측 통합검색 버튼 밑 '전체매물 보러가기' */}
        <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
          {/* 좌측: 인기 검색어 칩 목록 (왼쪽 정렬 및 위로 조금 올림) */}
          <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className="text-[#8C7E6C] font-medium flex items-center gap-1.5 mr-1">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              인기 검색어:
            </span>
            {POPULAR_KEYWORDS.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleKeywordClick(kw)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FAF4EA] hover:bg-[#F3E8D8] text-[#5C5245] hover:text-[#1A1816] border border-[#E8DFC8] hover:border-[#C5A059] transition-all cursor-pointer font-sans-kr text-xs sm:text-sm"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* 우측 (통합검색 버튼 바로 밑): "전체매물 보러가기" 링크 버튼 */}
          <button
            id="btn-hero-view-all"
            type="button"
            onClick={() => {
              if (onSearch) onSearch('');
            }}
            className="shrink-0 self-end sm:self-auto flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#6E6252] hover:text-[#1A1816] hover:underline underline-offset-4 transition-colors cursor-pointer py-1 px-1.5"
          >
            <span>전체매물 보러가기</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </header>
  );
};

