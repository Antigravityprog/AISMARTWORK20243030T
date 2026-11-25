import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SearchBar } from '../components/common/SearchBar';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Briefcase, 
  ArrowRight, 
  ExternalLink, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Extract all categories, years, and technologies dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const years = useMemo(() => {
    const set = new Set<number>();
    projectsData.forEach(p => set.add(p.year));
    return ['All', ...Array.from(set).sort((a, b) => b - a).map(String)];
  }, []);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach(p => p.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project: Project) => {
      // Category match
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false;
      }
      // Year match
      if (selectedYear !== 'All' && String(project.year) !== selectedYear) {
        return false;
      }
      // Technology match
      if (selectedTech !== 'All' && !project.tags.includes(selectedTech)) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSubtitle = project.subtitle.toLowerCase().includes(q);
        const matchesSummary = project.summary.toLowerCase().includes(q);
        const matchesTags = project.tags.some(t => t.toLowerCase().includes(q));
        const matchesTech = project.technologies.some(techCat => 
          techCat.items.some(item => item.toLowerCase().includes(q))
        );
        return matchesTitle || matchesSubtitle || matchesSummary || matchesTags || matchesTech;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedYear, selectedTech]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedYear('All');
    setSelectedTech('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedYear !== 'All' || selectedTech !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Projects' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Project Portfolio & Case Studies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          프로젝트 포트폴리오
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          수업 과제, 개인 학습, 데이터 분석, 산업 리서치, 콘텐츠 제작 및 웹사이트 기획 등 대학생활에서 진행한 작업 기록을 살펴보세요. 실제 결과와 진행 상태는 각 프로젝트에 구분해 표시합니다.
        </p>
      </div>

      {/* Controls / Filter Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm mb-10 space-y-5">
        {/* Search Bar & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="프로젝트명, 기술 스택, 키워드로 검색 (예: 회귀분석, 반도체, 관광, SCM, Python)..."
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5 shrink-0"
              title="필터 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>필터 초기화</span>
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              분야:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year & Tech Selectors */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Year Selector */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="year-select" className="font-semibold text-slate-500">연도:</label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-100 border-none rounded-lg px-2.5 py-1.5 font-medium text-slate-700 text-xs focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y === 'All' ? '전체 연도' : `${y}년`}</option>
                ))}
              </select>
            </div>

            {/* Tech Selector */}
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="tech-select" className="font-semibold text-slate-500">기술:</label>
              <select
                id="tech-select"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-slate-100 border-none rounded-lg px-2.5 py-1.5 font-medium text-slate-700 text-xs focus:ring-2 focus:ring-cyan-500/20 focus:outline-none max-w-[140px]"
              >
                {technologies.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? '전체 기술' : t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
        <div>
          총 <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong>개의 프로젝트가 검색되었습니다.
        </div>
        {hasActiveFilters && (
          <div className="text-cyan-600 font-medium">
            조건별 필터가 활성화되어 있습니다.
          </div>
        )}
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">일치하는 프로젝트가 없습니다</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            검색어 또는 필터 조건을 변경하여 다시 시도해보세요.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            모든 필터 해제
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-navy-950/85 text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                {project.isDemo && (
                  <div className="absolute top-3 right-3">
                    <DemoBadge />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-cyan-600">{project.year}년</span>
                  <span className="truncate max-w-[150px]">{project.role}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-1.5 leading-snug">
                  <Link to={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">
                  {project.subtitle}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
                  {project.summary}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTech(tag);
                      }}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 cursor-pointer transition-colors"
                      title={`${tag} 기술로 필터링`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-xs font-bold text-slate-800 group-hover:text-cyan-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>심층 분석 및 산출물</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.externalLinks.find(l => l.type === 'live') && (
                      <a
                        href={project.externalLinks.find(l => l.type === 'live')?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-600 p-1 transition-colors"
                        title="라이브 배포 링크 열기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
