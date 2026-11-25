import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-extrabold text-xs shadow-sm">
                P
              </div>
              <span className="text-white font-extrabold text-xs tracking-widest uppercase">
                PORTFOLIO <span className="font-normal text-slate-400">/ ARCHIVE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              대학 수업과 개인 학습에서 만든 프로젝트, 보고서, 영상, 이미지 및 제작 과정을 기록하는 학생 개인 포트폴리오입니다.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Send Message"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Portfolio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">소개 (About Me)</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">프로젝트 (Projects)</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-cyan-400 transition-colors">작업 포트폴리오 (Works)</Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-cyan-400 transition-colors">아카이브 (Archive & Files)</Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-cyan-400 transition-colors">대외활동 (Activities)</Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-400 transition-colors">보유기술 (Skills Matrix)</Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-cyan-400 transition-colors">수상 및 자격 (Achievements)</Link>
              </li>
            </ul>
          </div>

          {/* Resources & System */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              System & Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/gallery" className="hover:text-cyan-400 transition-colors">미디어 갤러리 (Gallery)</Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-cyan-400 transition-colors">기술 저널 (Journal)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">문의하기 (Contact)</Link>
              </li>
              <li className="pt-2 flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Database setup required</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                <span>Deployment setup required</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 Student Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with React + Vite + TypeScript + Tailwind</span>
            <span>•</span>
            <span className="text-amber-400/90 font-medium">DEMO Content Labelled</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
