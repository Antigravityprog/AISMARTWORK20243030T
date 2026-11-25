import React, { useState, useMemo } from 'react';
import { journalData } from '../data/journalData';
import { JournalPost } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Share2, 
  Check 
} from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<JournalPost | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'AI Workflow', 'Web Engineering', 'Data Analytics'];

  const filtered = useMemo(() => {
    return journalData.filter(post => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
        return matchTitle || matchExcerpt || matchTag;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Journal' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Technical Research & Engineering Notes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          기술 저널 및 학습 노트
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          프로젝트를 진행하며 배운 내용, 사용 도구, 시행착오와 해결 과정을 기록하는 학습 노트입니다.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm mb-10 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="제목, 키워드, 태그로 저널 검색 (예: Netlify, Vibe, RLS, 프롬프트)..."
        />

        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Cards List */}
      <div className="space-y-6">
        {filtered.map((post) => (
          <article
            key={post.id}
            onClick={() => setReadingPost(post)}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/30 cursor-pointer transition-all space-y-4 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
                  {post.category}
                </span>
                {post.isDemo && <DemoBadge />}
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTimeMinutes} min read</span>
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t, i) => (
                  <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="text-xs font-bold text-cyan-600 group-hover:underline flex items-center gap-1">
                <span>전문 읽기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      <Modal
        isOpen={Boolean(readingPost)}
        onClose={() => setReadingPost(null)}
        title={readingPost?.title || '저널 읽기'}
        maxWidth="4xl"
      >
        {readingPost && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-600">{readingPost.category}</span>
                <span className="text-slate-400">• {readingPost.publishedAt}</span>
                <span className="text-slate-400">• {readingPost.readTimeMinutes}분 분량</span>
              </div>

              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold flex items-center gap-1.5 transition-colors"
                title="페이지 링크 복사"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '링크 복사'}</span>
              </button>
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-sans">
              {readingPost.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
              {readingPost.tags.map((t, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
