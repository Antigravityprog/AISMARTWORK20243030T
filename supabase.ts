import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseAnonKey.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
);

let client: SupabaseClient | null = null;

if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (err) {
    console.warn('[Supabase] Initialization failed, using local mock store:', err);
    client = null;
  }
}

export const supabase = client;

/**
 * Authentication Helpers for M2 (Single Administrator)
 */
export async function getAdminSession(): Promise<{ user: User | null; session: Session | null }> {
  if (!client) return { user: null, session: null };
  const { data } = await client.auth.getSession();
  return { user: data.session?.user || null, session: data.session };
}

export async function checkIsSiteAdmin(userId: string): Promise<boolean> {
  if (!client || !userId) return false;
  try {
    const { data, error } = await client
      .from('admin_allowlist')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase RLS] Admin check query returned:', error.message);
      return false;
    }
    return Boolean(data?.user_id);
  } catch {
    return false;
  }
}

export async function signInAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!client) {
    return { success: false, error: '관리자 인증 서버가 연결되지 않았습니다. Supabase 환경변수를 설정한 뒤 다시 시도하세요.' };
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };

  if (data.user) {
    const isAdmin = await checkIsSiteAdmin(data.user.id);
    if (!isAdmin) {
      await client.auth.signOut();
      return { success: false, error: '접근이 거부되었습니다. 허용된 단일 관리자 계정만 로그인할 수 있습니다.' };
    }
  }

  return { success: true };
}

export async function signOutAdmin(): Promise<void> {
  if (client) {
    await client.auth.signOut();
  }
}

/**
 * Safe submission helper for contact form
 */
export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  if (client) {
    try {
      const { error } = await client.from('contact_messages').insert([
        {
          sender_name: payload.name,
          sender_email: payload.email,
          subject: payload.subject,
          message: payload.message,
        }
      ]);
      if (error) throw error;
      return { success: true, message: '문의 메시지가 성공적으로 전송되었습니다.' };
    } catch (err: unknown) {
      console.warn('[Supabase Contact Error]:', err);
      return {
        success: false,
        message: '문의가 저장되지 않았습니다. 데이터베이스 연결 및 권한 설정을 확인한 뒤 다시 시도해주세요.'
      };
    }
  }

  return {
    success: false,
    message: '문의 저장 기능이 아직 연결되지 않았습니다. 사이트 운영자가 Supabase를 설정한 뒤 사용할 수 있습니다.'
  };
}
