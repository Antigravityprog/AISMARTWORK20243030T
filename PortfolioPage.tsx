import React, { useMemo, useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight, BookOpen, Clapperboard, FileText, Image as ImageIcon, Music2, Presentation, Search, Sparkles, X, Globe2, Layers3 } from 'lucide-react';

type WorkCategory = '전체' | '영상' | '이미지' | '음악' | '보고서' | '카드뉴스' | 'AI 가이드북' | '웹페이지';
type Work = {
  id: string; title: string; category: Exclude<WorkCategory, '전체'>; description: string; status: string;
  tools: string[]; prompt: string; process: string[]; reflection: string; projectSlug?: string; tone: string;
};

const categories: WorkCategory[] = ['전체', '영상', '이미지', '음악', '보고서', '카드뉴스', 'AI 가이드북', '웹페이지'];
const works: Work[] = [
  { id: 'w1', title: '재고 관리의 과학, 최적 발주량을 찾아서', category: '영상', description: '재고 과잉과 품절 문제를 시작으로 수요 예측과 적정 발주 개념을 설명하는 강의용 모션그래픽 기획', status: '제작 기록 정리 중', tools: ['ChatGPT', 'Flow.google', '영상 편집 도구'], prompt: '실제 사용한 장면별 프롬프트 원문을 여기에 추가하세요. 장면 길이, 카메라 움직임, 자막, 내레이션, 전환 효과를 분리해 기록합니다.', process: ['교육 대상과 핵심 메시지 정의', '문제 제기 → 위기 → 원리 → 최적 발주 → 결론의 흐름 구성', '장면별 영상 프롬프트 및 내레이션 작성', '자막·음성·전환·재생 품질 검수'], reflection: '최종 영상 파일과 실제 사용 프롬프트를 연결하고, 수정 전후 차이를 기록합니다.', projectSlug: 'inventory-motion-video', tone: 'from-indigo-950 via-blue-900 to-cyan-700' },
  { id: 'w2', title: '한국 메모리 반도체 산업 투자 전망', category: '보고서', description: '메모리 반도체 산업 흐름과 삼성전자·SK하이닉스의 경쟁 요인을 조사하는 투자 리서치 과제', status: '보고서 자료 정리', tools: ['ChatGPT', 'Excel', '문서·프레젠테이션 도구'], prompt: '보고서의 실제 조사 프롬프트와 자료 검증 지시문을 입력하세요. 출처·기준 시점·분석 범위를 함께 남깁니다.', process: ['보고서 목적과 독자 정의', '산업·기술·시장 분석 목차 설계', '공식 공시 및 시장 자료 수집', '비교 분석과 참고문헌 정리', '초안 검토 및 발표 자료 구성'], reflection: '분석 수치와 전망은 자료 기준 시점 및 출처를 반드시 함께 표기합니다.', projectSlug: 'memory-semiconductor-outlook', tone: 'from-slate-950 via-slate-800 to-cyan-900' },
  { id: 'w3', title: '강릉 관광 활성화 아이디어 기획', category: '보고서', description: '문화유산, 지역 먹거리, 콘텐츠 촬영지를 연결한 참여형 관광 코스 제안', status: '기획 기록', tools: ['ChatGPT', '지도·자료 조사 도구', '프레젠테이션 도구'], prompt: '강릉 관광 자원과 주민 참여형 운영 구조를 조사·비교하도록 요청한 실제 프롬프트를 추가하세요.', process: ['지역 관광 자원 조사', '스토리 기반 코스 및 미션 설계', '주민 사업자 참여와 지역 보상 구상', '예산·운영 주체·지속 가능성 정리'], reflection: '아이디어의 실행 가능성을 높이기 위해 실제 운영 주체와 예산 근거를 보완합니다.', projectSlug: 'gangneung-tourism-plan', tone: 'from-emerald-950 via-teal-800 to-cyan-700' },
  { id: 'w4', title: '개인 포트폴리오 웹사이트', category: '웹페이지', description: '대학생활의 프로젝트와 결과물, 제작 과정, 프롬프트를 통합 기록하는 개인 아카이브', status: '개발 진행 중', tools: ['ChatGPT', 'Antigravity IDE', 'React', 'TypeScript', 'GitHub', 'Netlify'], prompt: '대학생 개인 포트폴리오를 구축하고, 결과물뿐 아니라 제작 과정·사용 도구·프롬프트를 함께 공개할 수 있는 반응형 웹사이트를 설계해줘.', process: ['사이트 목적과 사용자 흐름 정의', '페이지 및 콘텐츠 구조 설계', '반응형 UI와 프로젝트 상세 화면 구현', 'GitHub 저장소 관리', 'Netlify 연결 및 공개 배포 검증'], reflection: '관리자 인증, 파일 업로드, 데이터베이스 연동, 실제 공개 배포는 별도 검증 후 완료 상태로 표시합니다.', projectSlug: 'personal-portfolio-website', tone: 'from-slate-950 via-blue-950 to-cyan-800' },
  { id: 'w5', title: '경력과 급여의 관계에 대한 통계 분석', category: '보고서', description: '경력과 급여의 관계를 산점도와 통계 방법으로 탐색하는 데이터 분석 과제', status: '분석 기록 보완 필요', tools: ['Python', 'Pandas', '통계 분석 도구'], prompt: '실제 분석 질문, 변수 정의, 전처리 조건 및 해석 지침을 입력하세요. 실행하지 않은 분석 결과는 기재하지 않습니다.', process: ['연구 질문과 변수 정의', '데이터 구조 및 결측치 확인', '탐색적 분석과 시각화', '통계 분석 및 가정 점검', '결과와 한계 해석'], reflection: '실제 실행 코드와 결과표를 연결해 재현 가능한 분석 기록으로 보완합니다.', projectSlug: 'salary-experience-analysis', tone: 'from-violet-950 via-indigo-900 to-sky-700' },
  { id: 'w6', title: '생성형 AI 이미지 작업 모음', category: '이미지', description: '과제 표지, 콘셉트 이미지, 인물·장면 시각화 등 이미지 결과물을 모아두는 공간', status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'], prompt: '이미지 생성에 실제 사용한 프롬프트와 참조 이미지 사용 여부를 기록하세요.', process: ['이미지 목적과 비율 결정', '스타일 및 구도 정의', '프롬프트 작성과 생성', '수정 사항과 최종본 비교'], reflection: '실제 이미지 파일과 생성 프롬프트가 등록되면 공개 카드로 전환합니다.', tone: 'from-fuchsia-950 via-purple-900 to-pink-700' },
  { id: 'w7', title: '배경음악 및 사운드 작업', category: '음악', description: '영상 분위기에 맞춘 배경음악·효과음 관련 작업물을 정리하는 공간', status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'], prompt: '음악 생성 또는 편집에 사용한 프롬프트, 장르, 길이, 라이선스 정보를 기록하세요.', process: ['영상 분위기와 음향 목표 정의', '음악·효과음 구성', '장면과 음향 싱크 조정', '저작권 및 사용 범위 확인'], reflection: '음원 파일과 사용 권한을 확인한 뒤 공개합니다.', tone: 'from-amber-950 via-orange-800 to-rose-700' },
  { id: 'w8', title: '카드뉴스 제작 아카이브', category: '카드뉴스', description: '정보 전달형 카드뉴스의 기획안, 페이지 구성, 최종 이미지 묶음을 기록하는 공간', status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'], prompt: '주제, 대상 독자, 카드 수, 페이지별 메시지를 정한 실제 프롬프트를 입력하세요.', process: ['주제 및 독자 정의', '핵심 메시지와 페이지 구성', '시각 스타일 및 정보 계층 설계', '오탈자·출처·가독성 검수'], reflection: '페이지별 원본 이미지와 최종 묶음 파일을 등록합니다.', tone: 'from-rose-950 via-red-900 to-orange-700' },
  { id: 'w9', title: 'AI 활용 가이드북 및 학습 노트', category: 'AI 가이드북', description: 'NotebookLM 등 생성형 AI 활용 과정과 사용 방법을 정리하는 가이드북 아카이브', status: '구성 예정', tools: ['NotebookLM', 'ChatGPT'], prompt: '가이드북의 대상 독자, 학습 목표, 단계별 실습 및 주의사항을 정의한 프롬프트를 기록하세요.', process: ['학습 목표와 독자 설정', '참고 자료 수집 및 출처 확인', '단계별 설명과 예시 작성', '실습 검토 및 PDF 제작'], reflection: '실제 가이드북 파일과 참고 자료 목록을 등록합니다.', tone: 'from-cyan-950 via-teal-900 to-blue-700' }
];

const categoryIcon: Record<Exclude<WorkCategory, '전체'>, React.ReactNode> = {
  영상: <Clapperboard className="w-4 h-4" />, 이미지: <ImageIcon className="w-4 h-4" />, 음악: <Music2 className="w-4 h-4" />,
  보고서: <FileText className="w-4 h-4" />, 카드뉴스: <Presentation className="w-4 h-4" />, 'AI 가이드북': <BookOpen className="w-4 h-4" />, 웹페이지: <Globe2 className="w-4 h-4" />
};

export const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('전체');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Work | null>(null);
  const filtered = useMemo(() => works.filter((work) => {
    const matchesCategory = activeCategory === '전체' || work.category === activeCategory;
    const haystack = `${work.title} ${work.description} ${work.tools.join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [activeCategory, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <Breadcrumb items={[{ label: 'Portfolio Works' }]} />
      <section className="relative overflow-hidden rounded-[2rem] bg-navy-950 text-white p-8 sm:p-12 mb-10">
        <div className="absolute -right-12 -top-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold tracking-[.18em] uppercase"><Sparkles className="w-4 h-4" /> Student Portfolio Archive</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 leading-tight">만든 결과물과<br /><span className="text-cyan-300">만드는 과정</span>을 함께 기록합니다.</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-5 max-w-2xl">영상·이미지·음악·보고서·카드뉴스·AI 가이드북·웹페이지를 유형별로 모았습니다. 각 작업을 열면 목표, 사용 도구, 프롬프트, 제작 단계와 회고를 확인할 수 있도록 구성했습니다.</p>
          <div className="flex flex-wrap gap-2 mt-7">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200">결과물 중심</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200">과정·프롬프트 기록</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200">학습 아카이브</span>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
        <div><div className="text-xs font-bold text-cyan-600 tracking-widest uppercase">Explore by Format</div><h2 className="text-2xl font-extrabold text-slate-900 mt-1">작업물 모아보기</h2><p className="text-sm text-slate-500 mt-1">카테고리를 선택하거나 제목과 도구를 검색해 보세요.</p></div>
        <label className="relative w-full lg:w-80"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="작업명 또는 사용 도구 검색" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" /></label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-7" role="tablist" aria-label="작업물 카테고리">
        {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${activeCategory === category ? 'bg-navy-950 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-700'}`}>{category}</button>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((work) => (
          <article key={work.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className={`relative h-44 bg-gradient-to-br ${work.tone} p-6 flex flex-col justify-between overflow-hidden`}>
              <div className="absolute right-5 top-4 opacity-20"><Layers3 className="w-24 h-24" /></div>
              <div className="relative flex justify-between items-start"><span className="inline-flex items-center gap-1.5 rounded-full bg-black/20 border border-white/20 px-3 py-1 text-[11px] font-bold text-white">{categoryIcon[work.category]} {work.category}</span><span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">작업 기록</span></div>
              <div className="relative"><p className="text-white/65 text-[10px] tracking-[.18em] uppercase">Personal Work Archive</p><h3 className="text-xl font-extrabold text-white mt-1 leading-snug">{work.title}</h3></div>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600 leading-relaxed min-h-[3rem]">{work.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">{work.tools.slice(0, 3).map((tool) => <span key={tool} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{tool}</span>)}</div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><span className="text-[11px] text-slate-400">{work.status}</span><button onClick={() => setSelected(work)} className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900">과정 보기 <ArrowUpRight className="w-4 h-4" /></button></div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><Search className="w-8 h-8 text-slate-300 mx-auto" /><p className="mt-3 text-sm font-semibold text-slate-600">검색 결과가 없습니다.</p><button onClick={() => { setQuery(''); setActiveCategory('전체'); }} className="mt-3 text-xs font-bold text-cyan-700">필터 초기화</button></div>}

      <section className="mt-12 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-6 sm:p-8">
        <div className="flex items-start gap-3"><div className="rounded-xl bg-white p-2 text-cyan-700"><BookOpen className="w-5 h-5" /></div><div><h2 className="text-base font-extrabold text-slate-900">모든 작업은 같은 기준으로 기록합니다</h2><p className="text-sm text-slate-600 mt-1 leading-relaxed">프로젝트 목적 → 본인 역할 → 사용한 AI·도구 → 실제 프롬프트 → 제작 과정 → 최종 결과물 → 회고 순서로 정리합니다. 아직 등록하지 않은 산출물은 완성된 것처럼 표시하지 않습니다.</p></div></div>
      </section>

      {selected && <div className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="work-dialog-title" className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
          <div className={`bg-gradient-to-br ${selected.tone} text-white p-6 sm:p-8 relative`}><button onClick={() => setSelected(null)} aria-label="닫기" className="absolute top-4 right-4 rounded-full bg-white/15 p-2 hover:bg-white/25"><X className="w-5 h-5" /></button><span className="text-xs font-bold tracking-widest text-white/70">{selected.category} / PROCESS</span><h2 id="work-dialog-title" className="text-2xl sm:text-3xl font-black mt-3 pr-8">{selected.title}</h2><p className="text-sm text-white/80 mt-3">{selected.description}</p></div>
          <div className="p-6 sm:p-8 space-y-7">
            <div><h3 className="text-sm font-extrabold text-slate-900 mb-3">01. 사용 도구</h3><div className="flex flex-wrap gap-2">{selected.tools.map((tool) => <span key={tool} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{tool}</span>)}</div></div>
            <div><h3 className="text-sm font-extrabold text-slate-900 mb-3">02. 제작 과정</h3><ol className="space-y-3">{selected.process.map((step, i) => <li key={step} className="flex gap-3"><span className="w-7 h-7 shrink-0 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center text-xs font-black">{String(i + 1).padStart(2, '0')}</span><p className="text-sm text-slate-600 pt-1">{step}</p></li>)}</ol></div>
            <div><h3 className="text-sm font-extrabold text-slate-900 mb-3">03. 사용 프롬프트</h3><blockquote className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600 leading-relaxed">{selected.prompt}</blockquote><p className="text-[11px] text-slate-400 mt-2">실제 사용한 프롬프트 전문으로 교체하거나 추가할 수 있는 기록란입니다.</p></div>
            <div><h3 className="text-sm font-extrabold text-slate-900 mb-2">04. 회고 및 보완 사항</h3><p className="text-sm text-slate-600 leading-relaxed">{selected.reflection}</p></div>
            {selected.projectSlug && <div className="pt-4 border-t border-slate-100"><a href={`/projects/${selected.projectSlug}`} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-900">프로젝트 상세 페이지로 이동 <ArrowUpRight className="w-4 h-4" /></a></div>}
            <div className="flex justify-end"><button onClick={() => setSelected(null)} className="rounded-xl bg-navy-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-800">닫기</button></div>
          </div>
        </div>
      </div>}
    </div>
  );
};
