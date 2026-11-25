import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="w-20 h-20 rounded-3xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto shadow-inner">
          <HelpCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            404
          </div>
          <h1 className="text-xl font-bold text-slate-800">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            요청하신 주소의 경로가 변경되었거나 삭제되었을 수 있습니다. 올바른 URL인지 다시 한번 확인해주세요.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>홈으로 이동</span>
          </Link>
          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span>프로젝트 둘러보기</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-400">
          <Link to="/archive" className="hover:text-cyan-600 transition-colors">아카이브</Link>
          <span>•</span>
          <Link to="/about" className="hover:text-cyan-600 transition-colors">소개</Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-cyan-600 transition-colors">문의하기</Link>
        </div>
      </div>
    </div>
  );
};
