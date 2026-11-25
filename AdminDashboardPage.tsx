import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOutAdmin, getAdminSession, checkIsSiteAdmin, isSupabaseConfigured } from '../../lib/supabase';
import { projectsData } from '../../data/projectsData';
import { archiveData } from '../../data/archiveData';
import { 
  ShieldCheck, 
  LogOut, 
  FolderKanban, 
  Files, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Layers
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'files'>('overview');
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    const verify = async () => {
      if (!isSupabaseConfigured) { navigate('/admin/login', { replace: true }); return; }
      const { user } = await getAdminSession();
      const allowed = Boolean(user && await checkIsSiteAdmin(user.id));
      if (!active) return;
      if (!allowed) navigate('/admin/login', { replace: true });
      else setAuthorized(true);
      setChecking(false);
    };
    void verify();
    return () => { active = false; };
  }, [navigate]);

  if (checking || !authorized) return <div className="max-w-3xl mx-auto p-12 text-center text-sm text-slate-500">관리자 권한을 확인하고 있습니다.</div>;

  const handleLogout = async () => {
    await signOutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-navy-950 text-white rounded-3xl border border-slate-800 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              관리자 제어 워크스페이스 (Milestone 2)
            </h1>
            <p className="text-xs text-slate-400">
              관리자 기능 개발 중 • 실제 인증 연결 여부 확인 필요
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>공개 사이트 보기</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>게시 프로젝트</span>
            <FolderKanban className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{projectsData.length}개</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">데이터 연결 및 권한 테스트 필요</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>아카이브 자산</span>
            <Files className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{archiveData.length}개</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">Storage 연결 전</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>문의 수신 채널</span>
            <Mail className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">설정 필요</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">문의 DB 연결 전</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>관리자 Allowlist</span>
            <Lock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">설정 전</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">관리자 권한 설정 필요</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          보안 및 RLS 정책 개요
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          프로젝트 관리 미리보기 (M3 예정)
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`pb-3 px-2 border-b-2 transition-colors ${
            activeTab === 'files'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          자료실 스토리지 정책 (M4 예정)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>M2 RLS Policy Enforcement Status</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Row Level Security (RLS) 방어 체계
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800">public.projects</span>
                <p className="text-slate-500 mt-0.5">익명 사용자는 status='published' AND visibility='public'인 레코드만 읽기 가능합니다.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold self-start sm:self-auto">설정 초안</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800">public.archive_files</span>
                <p className="text-slate-500 mt-0.5">visibility='private'인 비공개 파일 메타데이터 및 스토리지 경로는 비인가자에게 은닉됩니다.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold self-start sm:self-auto">설정 초안</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800">public.contact_messages</span>
                <p className="text-slate-500 mt-0.5">외부인은 오직 INSERT만 가능하며, 타인의 문의 내역을 조회하는 것은 데이터베이스 수준에서 차단됩니다.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold self-start sm:self-auto">설정 초안</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-800">public.admin_allowlist</span>
                <p className="text-slate-500 mt-0.5">is_site_admin() 함수를 통해 오직 등록된 1명의 UUID 관리자만 관리자 화면에 접근하도록 제어합니다.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold self-start sm:self-auto">검증 필요</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">프로젝트 레코드 인벤토리</h3>
            <span className="text-xs text-slate-400 font-medium">M3에서 실시간 CRUD 에디터 활성화 예정</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {projectsData.map(p => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">{p.title}</span>
                  <span className="text-slate-400 ml-2">({p.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">published</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold text-[10px]">public</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">자료실 스토리지 버킷 정책</h3>
            <span className="text-xs text-slate-400 font-medium">M4에서 서명된 임시 다운로드 URL(Signed URL) 연동 예정</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            비공개 파일은 공용 버킷이 아닌 Private Bucket에 저장되며, 권한 검증 후 60초 유효기간의 임시 서명 URL로만 접근이 허용됩니다.
          </p>
        </div>
      )}
    </div>
  );
};
