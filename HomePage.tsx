import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  Briefcase, 
  Archive, 
  ChartNoAxesCombined,
  Code2,
  BookOpen,
  Sparkles,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { journalData } from '../data/journalData';
import { DemoBadge } from '../components/common/DemoBadge';

export const HomePage: React.FC = () => {
  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 4);
  const recentArticles = journalData.slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-20 pb-24 md:pt-28 md:pb-32 border-b border-slate-800">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="tracking-widest uppercase">Personal Brand & Knowledge Archive</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Projects.<br />
                <em className="font-serif italic font-normal text-cyan-400">Research.</em><br />
                Growth.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-xl">
                배움과 탐구의 과정을 기록하고, 학부 프로젝트와 리서치를 통해 쌓아온 경험과 역량을 하나의 의미 있는 흐름으로 연결합니다.
              </p>

              {/* Quick Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Briefcase className="w-4 h-4 text-navy-950" />
                  <span>프로젝트 살펴보기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/portfolio"
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 flex items-center gap-2 transition-all"
                >
                  <span>작업 포트폴리오 보기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/archive"
                  className="px-4 py-3 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Archive className="w-4 h-4 text-cyan-400" />
                  <span>아카이브 열람</span>
                </Link>
              </div>
            </div>

            {/* Right Visual (Interactive Graphic) */}
            <div className="lg:col-span-5 hidden lg:flex justify-center relative">
              <div className="relative w-[380px] h-[380px] flex items-center justify-center">
                {/* Orbit Circles */}
                <div className="absolute inset-0 border border-slate-800 rounded-full animate-spin-slow" />
                <div className="absolute inset-8 border border-dashed border-slate-700/60 rounded-full" />
                
                {/* Core Sphere */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 flex flex-col items-center justify-center text-center p-4 z-10">
                  <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase">PORTFOLIO</span>
                  <strong className="text-4xl font-extrabold text-cyan-400 my-0.5">01</strong>
                  <small className="text-[9px] tracking-wider text-slate-300 uppercase">Ideas into Impact</small>
                </div>

                {/* Floating Orbit Badges */}
                <div className="absolute -top-2 right-4 bg-navy-900/90 border border-slate-700 px-3.5 py-2 rounded-xl text-cyan-400 text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2">
                  <ChartNoAxesCombined className="w-4 h-4" />
                  <span className="text-white text-[10px] tracking-wider">DATA & INSIGHT</span>
                </div>

                <div className="absolute -bottom-2 left-2 bg-navy-900/90 border border-slate-700 px-3.5 py-2 rounded-xl text-cyan-400 text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span className="text-white text-[10px] tracking-wider">CREATIVE WORK</span>
                </div>

                <div className="absolute top-1/2 -left-6 -translate-y-1/2 bg-navy-900/90 border border-slate-700 px-3.5 py-2 rounded-xl text-cyan-400 text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-white text-[10px] tracking-wider">CONTINUOUS GROWTH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{projectsData.length}</div>
              <div className="text-xs text-slate-400 mt-0.5">프로젝트 기록 예시</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">07</div>
              <div className="text-xs text-slate-400 mt-0.5">작업물 분류 유형</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">01</div>
              <div className="text-xs text-slate-400 mt-0.5">개인 학습 아카이브</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">∞</div>
              <div className="text-xs text-slate-400 mt-0.5">계속 추가할 작업 기록</div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 / PROFILE Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>01 / PROFILE</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              다양한 분야를 연결하며<br />
              <em className="font-serif italic font-normal text-cyan-600">성장하는 융합형 인재</em>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              데이터 분석, 산업 리서치, 콘텐츠 제작, 프로젝트 기획 등 다양한 학부 경험을 하나의 흐름으로 정리합니다. 
              각 프로젝트의 배경과 과정, 결과와 배운 점을 투명하고 솔직하게 기록합니다.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900">{featuredProjects.length}</div>
                <div className="text-xs text-slate-500 mt-0.5">Featured Work</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-cyan-600">7</div>
                <div className="text-xs text-slate-500 mt-0.5">Categories</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-black text-blue-600">+</div>
                <div className="text-xs text-slate-500 mt-0.5">Room to Grow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / SELECTED WORK Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>02 / SELECTED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selected <em className="font-serif italic font-normal text-cyan-600">Projects</em>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              학부 교과목, 공모전 및 실습을 통해 수행한 대표 프로젝트들입니다.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <span>작업 포트폴리오 보기</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-950/85 text-white backdrop-blur-md">
                    0{i + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-600/90 text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                {project.isDemo && (
                  <div className="absolute top-3 right-3">
                    <DemoBadge />
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                    {project.year} · {project.tags[0]}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1 mb-1.5">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-slate-800 group-hover:text-cyan-600 flex items-center gap-1 transition-colors"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.externalLinks.find(l => l.type === 'live') && (
                      <a
                        href={project.externalLinks.find(l => l.type === 'live')?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-600 p-1"
                        title="외부 링크"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Technical Journal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>RESEARCH & NOTES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              학습 기록 및 <em className="font-serif italic font-normal text-cyan-600">기술 저널</em>
            </h2>
          </div>
          <Link
            to="/journal"
            className="inline-flex items-center text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <span>전체 저널 읽기</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentArticles.map((article) => (
            <div 
              key={article.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-cyan-600">{article.category}</span>
                  <span>{article.publishedAt} • {article.readTimeMinutes} min read</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 hover:text-cyan-600 transition-colors">
                  <Link to="/journal">{article.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 2).map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/journal"
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  <span>전문 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / LET'S CONNECT Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              03 / LET'S CONNECT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              좋은 아이디어는 <em className="font-serif italic font-normal text-cyan-400">연결에서 시작됩니다.</em>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              학업 프로젝트 협업, 데이터 분석 스터디, 공모전 팀 구성 및 연구 제안에 열려 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-cyan-400 hover:bg-cyan-300 text-navy-950 shadow-md transition-all flex items-center gap-1.5"
            >
              <span>프로젝트 및 협업 문의</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
