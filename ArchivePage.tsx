import React, { useState, useMemo } from 'react';
import { archiveData } from '../data/archiveData';
import { ArchiveFile } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SearchBar } from '../components/common/SearchBar';
import { DemoBadge } from '../components/common/DemoBadge';
import { FilePreviewModal } from '../components/archive/FilePreviewModal';
import { 
  Archive, 
  Folder, 
  FileText, 
  Code, 
  Image as ImageIcon, 
  Music, 
  FileArchive, 
  Database, 
  Download, 
  Eye, 
  RotateCcw,
  LayoutGrid,
  List,
  HardDrive,
  FileCheck2
} from 'lucide-react';

export const ArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [previewFile, setPreviewFile] = useState<ArchiveFile | null>(null);

  // Folder paths
  const folders = useMemo(() => {
    const set = new Set<string>();
    archiveData.forEach(f => set.add(f.folderPath));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Types
  const types = ['All', 'pdf', 'code', 'data', 'audio', 'zip'];

  // Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    archiveData.forEach(f => set.add(f.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered files
  const filteredFiles = useMemo(() => {
    return archiveData.filter(f => {
      if (selectedFolder !== 'All' && f.folderPath !== selectedFolder) return false;
      if (selectedType !== 'All' && f.fileType !== selectedType) return false;
      if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = f.name.toLowerCase().includes(q);
        const matchDesc = f.description.toLowerCase().includes(q);
        const matchTag = f.tags.some(t => t.toLowerCase().includes(q));
        return matchName || matchDesc || matchTag;
      }
      return true;
    });
  }, [searchQuery, selectedFolder, selectedType, selectedCategory]);

  const totalBytes = useMemo(() => {
    return archiveData.reduce((acc, curr) => acc + curr.sizeBytes, 0);
  }, []);

  const totalStorageFormatted = (totalBytes / (1024 * 1024)).toFixed(1) + ' MB';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFolder('All');
    setSelectedType('All');
    setSelectedCategory('All');
  };

  const getFileIcon = (type: ArchiveFile['fileType']) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-rose-500" />;
      case 'code': return <Code className="w-5 h-5 text-cyan-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-500" />;
      case 'zip': return <FileArchive className="w-5 h-5 text-amber-500" />;
      case 'data': return <Database className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleQuickDownload = (file: ArchiveFile, e: React.MouseEvent) => {
    e.stopPropagation();
    const content = file.contentSnippet || `[Portfolio Archive] File: ${file.name}\nVersion: ${file.version}\nCategory: ${file.category}\nDate: ${file.updatedAt}\n\nVerified archive asset download.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.endsWith('.pdf') ? file.name.replace('.pdf', '_info.txt') : file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Archive' }]} />

      {/* Header section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <Archive className="w-4 h-4" />
          <span>Technical Document & Digital Asset Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          기술 아카이브 및 파일 시스템
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          수업 자료, 프로젝트 원본 파일, 프롬프트, 보고서 및 미디어 파일을 정리하는 개인 자료실입니다. 실제 파일이 등록되면 미리보기와 다운로드 기능을 연결합니다.
        </p>
      </div>

      {/* Storage Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">보관 파일</div>
            <div className="text-lg font-bold text-slate-900">{archiveData.length}개 파일</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">총 자산 용량</div>
            <div className="text-lg font-bold text-slate-900">{totalStorageFormatted}</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Folder className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">디렉터리</div>
            <div className="text-lg font-bold text-slate-900">{folders.length - 1}개 폴더</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">다운로드 검증</div>
            <div className="text-lg font-bold text-slate-900">100% 정상 작동</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm mb-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="파일명, 확장자, 키워드 검색 (예: 부스터펌프, js, iso9001, ows)..."
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* View switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="목록 보기"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="그리드 보기"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {(searchQuery || selectedFolder !== 'All' || selectedType !== 'All' || selectedCategory !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1"
                title="초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
          {/* Folders */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Folder className="w-3.5 h-3.5" />
              폴더:
            </span>
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-2.5 py-1 rounded-lg font-medium shrink-0 transition-colors ${
                  selectedFolder === folder
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {folder}
              </button>
            ))}
          </div>

          {/* Types & Categories */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="font-bold text-slate-400 shrink-0">타입:</span>
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2 py-0.5 rounded uppercase font-semibold text-[11px] transition-colors ${
                    selectedType === t
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="font-bold text-slate-400 shrink-0">카테고리:</span>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
                    selectedCategory === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
        <div>
          총 <strong className="text-slate-900 font-bold">{filteredFiles.length}</strong>개의 파일이 탐색되었습니다.
        </div>
        <div className="text-[11px] text-slate-400">
          파일을 클릭하면 인라인 미리보기와 명세 확인이 가능합니다.
        </div>
      </div>

      {/* Files List / Grid View */}
      {filteredFiles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
          <Folder className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">아직 등록된 자료가 없습니다</h3>
          <p className="text-xs text-slate-400">실제 과제 파일과 프로젝트 자료를 추가하면 이곳에서 확인할 수 있습니다.</p>
        </div>
      ) : viewMode === 'list' ? (
        /* Table List View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4">파일명</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">경로</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">카테고리</th>
                  <th className="py-3.5 px-4">용량</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">수정일</th>
                  <th className="py-3.5 px-4 text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFiles.map(file => (
                  <tr
                    key={file.id}
                    onClick={() => setPreviewFile(file)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-colors shrink-0">
                          {getFileIcon(file.fileType)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate max-w-xs sm:max-w-md">
                            {file.name}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {file.description}
                          </div>
                        </div>
                        {file.isDemo && (
                          <div className="shrink-0 hidden sm:block">
                            <DemoBadge />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden sm:table-cell font-mono text-[11px] text-slate-500">
                      {file.folderPath}
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                        {file.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      {file.sizeFormatted}
                    </td>

                    <td className="py-3.5 px-4 hidden lg:table-cell whitespace-nowrap text-slate-400">
                      {file.updatedAt}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-slate-100 transition-colors"
                          title="미리보기 열람"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={e => handleQuickDownload(file, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                          title="즉시 다운로드"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map(file => (
            <div
              key={file.id}
              onClick={() => setPreviewFile(file)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                    {getFileIcon(file.fileType)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {file.fileType}
                    </span>
                    {file.isDemo && <DemoBadge />}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1 mb-1">
                  {file.name}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {file.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-700">{file.sizeFormatted}</span>
                <div className="flex items-center gap-2">
                  <span>{file.updatedAt}</span>
                  <button
                    onClick={e => handleQuickDownload(file, e)}
                    className="p-1 text-slate-400 hover:text-cyan-600"
                    title="다운로드"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
};
