import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  Github, 
  Calendar, 
  User, 
  Users, 
  Clock, 
  Target, 
  GitFork, 
  Cpu, 
  TrendingUp, 
  Lightbulb, 
  FileText, 
  Download, 
  CheckCircle2, 
  ImageIcon,
  Sparkles
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">프로젝트를 찾을 수 없습니다</h1>
        <p className="text-sm text-slate-500">
          요청하신 경로(slug: {slug})에 해당하는 프로젝트 데이터가 존재하지 않습니다.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 프로젝트 목록으로 돌아가기</span>
        </Link>
      </div>
    );
  }

  // Related projects
  const relatedProjects = projectsData
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  const handleDownloadAttachment = (attachmentName: string, fileType: string) => {
    try {
      const fileData = `[Portfolio Attachment - DEMO]\nFile: ${attachmentName}\nProject: ${project.title}\nRole: ${project.role}\nFormat: ${fileType}\nVerified automated packaging for M1 implementation.`;
      const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachmentName.endsWith('.pdf') ? attachmentName.replace('.pdf', '_demo.txt') : attachmentName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccess(attachmentName);
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb 
        items={[
          { label: 'Projects', path: '/projects' },
          { label: project.title }
        ]} 
      />

      {/* Top Back Link */}
      <div className="mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>목록으로 돌아가기</span>
        </Link>
      </div>

      {/* Project Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-950 text-white">
            {project.category}
          </span>
          {project.isDemo && <DemoBadge />}
          <span className="text-xs text-slate-400 font-medium">ID: {project.id}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
          {project.subtitle}
        </p>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">연도</div>
              <div className="font-semibold text-slate-800">{project.year}년</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">역할</div>
              <div className="font-semibold text-slate-800 truncate">{project.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">기간</div>
              <div className="font-semibold text-slate-800">{project.timeline}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">팀 구성</div>
              <div className="font-semibold text-slate-800 truncate">{project.team}</div>
            </div>
          </div>
        </div>

        {/* External Action Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                link.type === 'live'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {link.type === 'github' && <Github className="w-3.5 h-3.5" />}
              {link.type === 'live' && <ExternalLink className="w-3.5 h-3.5" />}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Cover Showcase */}
      <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-md mb-14 bg-slate-900 aspect-[16/9] relative">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Structured Content Sections */}
      <div className="space-y-14">
        {/* 1. Summary & Objectives */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Problem Statement & Objectives</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            개요 및 핵심 달성 목표
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed font-light">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {project.objectives.map((obj, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center">
                  0{i + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{obj.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Process & Methodology */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <GitFork className="w-4 h-4" />
            <span>Methodology & Roadmap</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            구현 프로세스 및 단계별 산출물
          </h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {project.process.map((step, i) => (
              <div key={i} className="relative pl-10">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-cyan-600 ring-4 ring-cyan-100" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-cyan-600">Phase 0{i + 1}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{step.phase}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {step.deliverables.map((del, dIdx) => (
                    <span key={dIdx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-100 font-medium">
                      ✓ {del}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Tools & Technologies */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Tech Stack Breakdown</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            활용 도구 및 엔지니어링 스택
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.technologies.map((tech, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {tech.category}
                </h3>
                <ul className="space-y-1.5">
                  {tech.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Outcomes & Metrics */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Measured Impact</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            정량적 성과 및 비즈니스 효과
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.outcomes.map((out, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-b from-cyan-50/50 to-white border border-cyan-100 space-y-1 text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-cyan-600">
                  {out.value}
                </div>
                <div className="text-xs font-bold text-slate-900">{out.metric}</div>
                <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                  {out.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Reflections & Learnings */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Retrospective & Insights</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            회고 및 습득한 인사이트
          </h2>

          <div className="space-y-4">
            {project.reflections.map((ref, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  <span>{ref.topic}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                  {ref.insight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Media Showcase Carousel / Gallery */}
        {project.media.length > 0 && (
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
              <ImageIcon className="w-4 h-4" />
              <span>Visual Gallery</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              미디어 및 스크린샷 쇼케이스
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.media.map((med, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm group">
                  <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={med.url}
                      alt={med.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 text-xs text-slate-600 font-medium">
                    {med.caption}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Attachments & Verified Downloads */}
        {project.attachments.length > 0 && (
          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Project Documents & Downloads</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              기술 명세서 및 첨부 파일
            </h2>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>[{downloadSuccess}] 다운로드 파일이 안전하게 생성되었습니다.</span>
              </div>
            )}

            <div className="space-y-3">
              {project.attachments.map((att, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-500/30 transition-all gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-rose-500 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {att.name}
                        </span>
                        {att.isDemo && <DemoBadge />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {att.fileType} • {att.size}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadAttachment(att.name, att.fileType)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                    title="첨부 파일 다운로드 실행"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">다운로드</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            연관 분야 추천 프로젝트
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.slug}`}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-cyan-500/40 shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {rel.summary}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-1 group-hover:text-cyan-600">
                  <span>프로젝트 바로가기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
