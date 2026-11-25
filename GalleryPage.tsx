import React, { useState } from 'react';
import { galleryData } from '../data/galleryData';
import { GalleryItem } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Modal } from '../components/common/Modal';
import { 
  Image as ImageIcon, 
  Calendar, 
  Maximize2
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'UI/UX Design', 'Architecture Diagram', 'Facility Photos', 'Campaign Posters'];

  const filtered = galleryData.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Gallery' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <ImageIcon className="w-4 h-4" />
          <span>Visual Artifacts & Architecture Diagrams</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          미디어 갤러리 및 비주얼 쇼케이스
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          직접 제작한 이미지, 영상 썸네일, 디자인 시안 등을 등록해 보여주는 공간입니다.
        </p>
      </div>

      {/* Categories */}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/40 cursor-pointer transition-all duration-300 group flex flex-col"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/90 text-navy-950 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-navy-950/85 text-white backdrop-blur-md">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
                {item.dimensions && (
                  <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {item.dimensions}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center"><ImageIcon className="w-8 h-8 text-slate-300 mx-auto" /><p className="mt-3 text-sm font-semibold text-slate-600">아직 등록된 이미지가 없습니다.</p><p className="text-xs text-slate-400 mt-1">실제 작업 이미지와 설명을 추가하면 이곳에 표시됩니다.</p></div>}

      {/* Lightbox Modal */}
      <Modal
        isOpen={Boolean(lightboxItem)}
        onClose={() => setLightboxItem(null)}
        title={lightboxItem?.title || '미디어 상세 보기'}
        maxWidth="4xl"
      >
        {lightboxItem && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden bg-navy-950 max-h-[60vh] flex items-center justify-center">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-cyan-600">{lightboxItem.category}</span>
                <span className="text-slate-400">{lightboxItem.date} • {lightboxItem.dimensions}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lightboxItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lightboxItem.tags.map((t, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
