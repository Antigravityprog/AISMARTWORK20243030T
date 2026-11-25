import React from 'react';
import { skillsData } from '../data/skillsData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { 
  Layers, 
  Code, 
  Cpu, 
  Cloud, 
  TrendingUp, 
  CheckCircle,
  Clock
} from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Web')) return <Code className="w-5 h-5 text-cyan-600" />;
    if (category.includes('AI')) return <Cpu className="w-5 h-5 text-blue-600" />;
    if (category.includes('Cloud')) return <Cloud className="w-5 h-5 text-indigo-600" />;
    return <TrendingUp className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Skills' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>Technical Competencies Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          보유 기술 및 엔지니어링 역량
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          수업과 개인 프로젝트에서 학습하거나 사용한 도구와 분야를 정리합니다. 숙련도는 본인이 실제 경험을 기준으로 직접 평가한 뒤 입력할 수 있습니다.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillsData.map((cat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  {getCategoryIcon(cat.category)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {cat.category}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skills list */}
              <div className="mt-6 space-y-5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {skill.experience}
                        </span>
                      </div>
                      <span className="font-bold text-slate-400">{skill.level > 0 ? `${skill.level}%` : '미평가'}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>본인 경험에 맞게 숙련도 수정</span>
              </span>
              <span>{cat.skills.length}개 기술</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
