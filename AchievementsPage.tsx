import React, { useState } from 'react';
import { achievementsData } from '../data/achievementsData';
import { Achievement } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { DemoBadge } from '../components/common/DemoBadge';
import { Modal } from '../components/common/Modal';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Building
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [verifyingItem, setVerifyingItem] = useState<Achievement | null>(null);

  const categories = ['All', 'Award', 'Certification', 'Course Completion', 'Academic Honor'];

  const filtered = achievementsData.filter(ach => {
    if (selectedCategory !== 'All' && ach.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Achievements' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Awards, Certifications & Honors</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          수상 및 자격 인증
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          수상, 자격증, 교육 수료 등 증빙 가능한 이력을 기록하는 공간입니다. 현재는 확인되지 않은 이력을 임의로 등록하지 않았습니다.
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setVerifyingItem(item)}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5">
                  {item.isDemo && <DemoBadge />}
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-1.5 leading-snug">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                <Building className="w-3.5 h-3.5 text-cyan-600" />
                <span>{item.issuer}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400 truncate max-w-[180px]">
                ID: {item.credentialId || 'N/A'}
              </span>
              <span className="text-cyan-600 font-bold group-hover:underline flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>인증 정보 조회</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><Award className="w-8 h-8 text-slate-300 mx-auto" /><p className="mt-3 text-sm font-semibold text-slate-600">등록된 수상·자격 정보가 없습니다.</p><p className="text-xs text-slate-400 mt-1">증빙 가능한 이력만 직접 추가해 주세요.</p></div>}

      {/* Verification Modal */}
      <Modal
        isOpen={Boolean(verifyingItem)}
        onClose={() => setVerifyingItem(null)}
        title="자격 및 수상 인증 상세 검증"
        maxWidth="md"
      >
        {verifyingItem && (
          <div className="space-y-5 text-center sm:text-left">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                  <span className="text-xs font-bold uppercase text-cyan-600">
                    {verifyingItem.category}
                  </span>
                  {verifyingItem.isDemo && <DemoBadge />}
                </div>
                <h4 className="text-base font-bold text-slate-900 break-words">
                  {verifyingItem.title}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {verifyingItem.issuer}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400">발급 일자</span>
                <span className="font-semibold text-slate-800">{verifyingItem.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400">자격/증서 번호</span>
                <span className="font-mono font-semibold text-slate-800">{verifyingItem.credentialId || '공식 서한 증명'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400">검증 상태</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>증빙 자료 확인 필요</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              {verifyingItem.description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setVerifyingItem(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
