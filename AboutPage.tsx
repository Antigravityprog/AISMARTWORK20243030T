import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GraduationCap, BookOpen, Target, Lightbulb, UserRound, PencilLine } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
    <Breadcrumb items={[{ label: 'About Me' }]} />
    <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7 sm:p-12">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center">
        <div className="rounded-2xl bg-gradient-to-br from-navy-950 via-slate-800 to-cyan-700 p-8 text-center text-white">
          <div className="w-24 h-24 mx-auto rounded-full border border-white/30 bg-white/10 flex items-center justify-center"><UserRound className="w-12 h-12 text-cyan-200" /></div>
          <h2 className="font-extrabold text-lg mt-4">이름을 입력하세요</h2>
          <p className="text-xs text-slate-300 mt-1">대학교 · 전공 · 학년</p>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-700"><GraduationCap className="w-4 h-4" /> Student Profile</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 leading-tight">배우고, 시도하고,<br /><span className="text-cyan-600">성장하는 과정</span>을 기록합니다.</h1>
          <p className="text-sm sm:text-base text-slate-600 mt-5 leading-relaxed">이 공간은 대학 수업과 개인 학습에서 진행한 과제, 프로젝트, 대외활동, 콘텐츠 제작 과정을 정리하는 개인 포트폴리오입니다. 완성된 결과물뿐 아니라 문제를 정의한 이유, 본인의 역할, 사용한 도구와 프롬프트, 시행착오와 배운 점을 함께 기록합니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl bg-slate-50 p-4"><span className="text-xs text-slate-400">학교</span><p className="text-sm font-bold text-slate-800 mt-1">학교명 입력</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><span className="text-xs text-slate-400">전공</span><p className="text-sm font-bold text-slate-800 mt-1">전공 입력</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><span className="text-xs text-slate-400">관심 분야</span><p className="text-sm font-bold text-slate-800 mt-1">관심 분야 입력</p></div>
          </div>
        </div>
      </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
      {[{icon:BookOpen,title:'배움의 기록',desc:'수업에서 배운 개념과 과제 수행 과정, 참고 자료를 정리합니다.'},{icon:Target,title:'문제 해결 과정',desc:'목표와 역할, 선택한 방법, 결과와 한계를 구분해 기록합니다.'},{icon:Lightbulb,title:'AI의 책임 있는 활용',desc:'생성형 AI 사용 여부와 실제 프롬프트, 검토·수정 과정을 투명하게 남깁니다.'}].map((item) => <article key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6"><div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center"><item.icon className="w-5 h-5" /></div><h2 className="text-base font-extrabold text-slate-900 mt-4">{item.title}</h2><p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p></article>)}
    </section>
    <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 flex items-start gap-3"><PencilLine className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" /><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">프로필의 이름, 학교, 전공, 학년, 관심 분야는 실제 정보로 직접 수정하세요. 확인되지 않은 수상·자격·경력이나 프로젝트 성과는 기본 정보에 포함하지 않았습니다.</p></div>
  </div>
);
