import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { submitContactMessage } from '../lib/supabase';
import { 
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setResultMessage({ success: false, text: '이름, 이메일, 메시지를 모두 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const response = await submitContactMessage(formData);
      setResultMessage({
        success: response.success,
        text: response.message
      });
      if (response.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setResultMessage({
        success: false,
        text: '전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      {/* Header section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>Get in Touch & Connect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          프로젝트 협업 및 학술 문의
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-3xl leading-relaxed">
          프로젝트 협업, 학습 자료, 포트폴리오 관련 의견과 질문을 남길 수 있습니다. 연락처와 문의 저장 기능은 실제 배포 전에 소유자가 설정해야 합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-navy-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              연락 및 안내
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              문의 내용을 남겨주세요. 실제 전송 기능은 데이터베이스 설정 후 활성화됩니다.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300 leading-relaxed">
              <p className="rounded-xl bg-slate-900 border border-slate-800 p-4">이메일 주소, 공개 가능한 연락처, GitHub 주소를 본인이 확인한 뒤 입력하세요.</p>
              <p className="rounded-xl bg-slate-900 border border-slate-800 p-4">현재 문의 양식은 Supabase 프로젝트와 테이블 정책이 연결되어야 실제 저장됩니다.</p>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>문의 데이터베이스 연결 및 보안 설정 필요</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-600" />
              <span>온라인 문의 양식</span>
            </h3>

            {resultMessage && (
              <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                resultMessage.success 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {resultMessage.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span>{resultMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    성명 / 담당자명 *
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    회신받을 이메일 *
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  문의 제목 / 프로젝트 주제
                </label>
                <input
                  id="subject-input"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="예: 프로젝트 협업 또는 학습 자료 문의"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  상세 메시지 *
                </label>
                <textarea
                  id="message-input"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="문의하실 내용 또는 협업 제안의 구체적인 범위와 일정을 적어주세요."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? '전송 처리 중...' : '문의 메시지 전송'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
