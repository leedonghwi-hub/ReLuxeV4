import React, { useState } from 'react';
import { Header } from './components/Header';
import { MegaCategoryMenu } from './components/MegaCategoryMenu';
import { ReLuxeLogo } from './components/ReLuxeLogo';
import { SketchCards } from './components/SketchCards';
import { SearchResultsPage } from './components/SearchResultsPage';
import { RecommendedProducts } from './components/RecommendedProducts';
import { SKETCH_CATEGORIES } from './data/luxuryData';
import { LuxuryProduct } from './types';

/**
 * Re:Luxe 명품 최저가 검색 플랫폼 루트 컴포넌트
 * 홈 화면(홈 헤더, 5대 카테고리 카드, 추천 에디터스 픽)과 검색 결과 페이지의 라우팅 및 전역 상태를 관리합니다.
 */
export default function App() {
  // 현재 뷰 상태 ('home': 메인 홈, 'search': 검색 및 매물 리스트 결과 페이지)
  const [currentView, setCurrentView] = useState<'home' | 'search'>('home');
  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // 선택된 브랜드
  const [selectedBrand, setSelectedBrand] = useState<string>('전체');
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState<string>('');

  /**
   * 홈 화면으로 초기화 및 이동 핸들러
   */
  const handleGoHome = () => {
    setSelectedCategory('all');
    setSelectedBrand('전체');
    setSearchQuery('');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 통합 검색 결과 페이지로 이동 핸들러
   * @param query 검색 키워드
   * @param categoryId 카테고리 ID
   * @param brand 브랜드명
   */
  const handleOpenSearchPage = (query: string, categoryId?: string, brand?: string) => {
    setSearchQuery(query);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    if (brand) {
      setSelectedBrand(brand);
    }
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 상품 카드 클릭 시 해당 플랫폼 원본 링크로 새 창 이동 핸들러
   */
  const handleSelectProduct = (prod: LuxuryProduct) => {
    const mainPlatform = prod.platformPrices?.[0];
    const linkUrl = mainPlatform?.linkUrl || 'https://web.joongna.com';
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
  };

  // 검색 결과 페이지 렌더링
  if (currentView === 'search') {
    return (
      <SearchResultsPage
        query={searchQuery}
        initialCategory={selectedCategory || 'all'}
        onGoHome={handleGoHome}
        onSelectCategory={(categoryId, brand, subQuery) => {
          handleOpenSearchPage(subQuery || '', categoryId, brand);
        }}
        onSelectProduct={handleSelectProduct}
        onNewSearch={(newQuery, catId) => handleOpenSearchPage(newQuery, catId)}
      />
    );
  }

  // 메인 홈 화면 렌더링
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans-kr flex flex-col justify-between">
      <div>
        {/* 상단 고정 메가 네비게이션 드롭다운 바 */}
        <MegaCategoryMenu
          onSelectCategory={(catId, _brand, subQuery) => {
            if (subQuery) {
              handleOpenSearchPage(subQuery, catId);
            } else {
              handleOpenSearchPage('', catId);
            }
          }}
          onGoHome={handleGoHome}
        />

        {/* 메인 홈 헤더 (중앙 검색창 및 카테고리 퀵 링크) */}
        <Header
          onSearch={(query) => {
            handleOpenSearchPage(query, 'all');
          }}
        />

        {/* 5대 카테고리 카드 섹션 (가방, 시계, 주얼리, 의류, 신발) */}
        <SketchCards
          categories={SKETCH_CATEGORIES}
          onSelectCategory={(catId) => handleOpenSearchPage('', catId)}
        />

        {/* 에디터스 픽 추천 명품 10종 그리드 (1줄 5개씩 2줄 배치) */}
        <RecommendedProducts
          onSelectProduct={handleSelectProduct}
          onViewAll={() => handleOpenSearchPage('')}
        />
      </div>

      {/* 푸터 영역 */}
      <footer className="w-full bg-[#2C2825] text-[#D8CFB9] py-12 sm:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 mt-20 sm:mt-28 border-t border-[#C5A059]/30">
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
          <div className="text-xs text-[#8C7E6C] font-sans-kr space-y-1">
            <p>© 2026 Reverdi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


