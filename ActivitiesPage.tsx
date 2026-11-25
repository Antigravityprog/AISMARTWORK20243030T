import React, { useState } from 'react';
import { activitiesData } from '../data/activitiesData';
import { Activity } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Activity as ActivityIcon, 
  Calendar, 
  Building2, 
  Award, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academics', 'AI & Tech', 'Leadership', 'Competition & Project'];

  const filteredActivities = activitiesData.filter((act: Activity) => {
    if (selectedCategory !== 'All' && act.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Activities' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <ActivityIcon className="w-4 h-4" />
          <span>Extracurricular & Leadership Journey</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          학술 및 대외 활동
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          수업, 학습 모임, 공모전, 개인 프로젝트 등 실제 참여한 활동을 정리하는 공간입니다. 확인 가능한 활동만 추가하고, 기간과 본인의 역할을 함께 기록합니다.
        </p>
      </div>

      {/* Category Pills */}
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

      {/* Activities Timeline */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-slate-200">
        {filteredActivities.map((act) => (
          <div key={act.id} className="relative pl-10 sm:pl-12 group">
            {/* Timeline node */}
            <div className="absolute left-1.5 sm:left-2 top-2 w-4 h-4 rounded-full bg-cyan-600 ring-4 ring-cyan-100 group-hover:scale-125 transition-transform" />

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/30 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                    {act.category}
                  </span>
                  {act.isDemo && <DemoBadge />}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-semibold text-slate-600">{act.period}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {act.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{act.organization}</span>
                  <span>•</span>
                  <span className="text-slate-700 font-semibold">{act.role}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {act.description}
              </p>

              {/* Achievements bullets */}
              {act.achievements.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-600" />
                    <span>주요 달성 성과</span>
                  </div>
                  <ul className="space-y-1.5">
                    {act.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
          <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500">선택된 카테고리의 활동 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
