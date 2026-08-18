import React, { useState } from 'react';
import { CategoryItem } from '../types';
import { X, Bell, Check, Sparkles } from 'lucide-react';

/** 오픈 예정 카테고리 알림 신청 모달 Props */
interface NotifyModalProps {
  /** 대상 카테고리 정보 (null인 경우 모달 숨김) */
  category: CategoryItem | null;
  /** 닫기 콜백 */
  onClose: () => void;
}

/**
 * 준비중인 카테고리(주얼리, 의류, 신발 등)의 서비스 오픈 사전 알림 신청 팝업 모달
 */
export const NotifyModal: React.FC<NotifyModalProps> = ({
  category,
  onClose
}) => {
  // 연락처(전화번호 또는 이메일) 입력 상태
  const [contact, setContact] = useState('');
  // 신청 완료 상태 플래그
  const [submitted, setSubmitted] = useState(false);

  if (!category) return null;

  // 알림 신청 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1816]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl border border-[#E8DEC9] shadow-2xl p-6 sm:p-8 text-[#2C2825]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 border border-[#E0D5C5] text-[#6B5E4F] hover:text-[#1A1816] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* 신청 완료 화면 */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-sans-kr font-bold text-2xl text-[#1A1816]">
              사전 알림 신청 완료!
            </h3>
            <p className="text-xs text-[#7C6E5D] font-sans-kr leading-relaxed">
              <strong className="text-[#2C2825]">{category.title}</strong> 카테고리가 오픈되면 <br />
              입력하신 정보({contact})로 가장 먼저 알림을 드리겠습니다.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#2C2825] text-white text-xs font-sans-kr font-medium hover:bg-[#1A1816] cursor-pointer"
            >
              확인
            </button>
          </div>
        ) : (
          /* 신청 입력 폼 화면 */
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F4EDE2] text-[#C5A059] flex items-center justify-center border border-[#E8DEC9]">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-xs font-sans-kr font-bold text-[#8C7A65]">
                {category.expectedLaunch || '오픈 서비스 준비중'}
              </span>
            </div>

            <h3 className="font-serif-luxury font-bold text-2xl text-[#1A1816]">
              {category.title} 서비스 사전 알림
            </h3>

            <p className="text-xs text-[#7C6E5D] font-sans-kr mt-2 leading-relaxed">
              {category.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-sans-kr font-semibold text-[#5A5043] mb-1.5">
                  휴대폰 번호 또는 이메일
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000 또는 example@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E0D5C5] text-sm font-sans-kr outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20"
                />
              </div>

              <div className="flex items-start gap-2 text-[11px] text-[#9A8A75] font-sans-kr">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>오픈 시 1만원 상당의 프리미엄 정품 검수 쿠폰을 지급해 드립니다.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2C2825] to-[#423B36] text-[#F3EFEA] text-sm font-sans-kr font-semibold hover:from-[#1A1816] hover:to-[#2C2825] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>무료 알림 신청하기</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
