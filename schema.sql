-- ========================================================
-- Supabase Schema for University Student Portfolio & Archive
-- Milestone 2 (M2): Authentication, Allowlist & Row Level Security (RLS)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Admin Allowlist (Single Administrator Protection)
-- Strictly limits administrative powers to explicit allowlisted user UUIDs.
CREATE TABLE IF NOT EXISTS public.admin_allowlist (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    notes TEXT DEFAULT 'Primary Administrator',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

-- Security Definer Function to verify administrative status without recursion
CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.admin_allowlist a 
    WHERE a.user_id = auth.uid()
  );
$$;

-- Allowlist policy: Only current site admins can view or manage the allowlist
CREATE POLICY "Admins can view allowlist"
    ON public.admin_allowlist FOR SELECT
    TO authenticated
    USING (public.is_site_admin());

CREATE POLICY "Admins can manage allowlist"
    ON public.admin_allowlist FOR ALL
    TO authenticated
    USING (public.is_site_admin())
    WITH CHECK (public.is_site_admin());


-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    category TEXT NOT NULL,
    year INTEGER NOT NULL DEFAULT 2026,
    role TEXT DEFAULT '',
    timeline TEXT DEFAULT '',
    team TEXT DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    cover_image TEXT DEFAULT '',
    tags TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
    objectives JSONB DEFAULT '[]'::jsonb,
    process JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    reflections JSONB DEFAULT '[]'::jsonb,
    media JSONB DEFAULT '[]'::jsonb,
    attachments JSONB DEFAULT '[]'::jsonb,
    external_links JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    is_demo BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY published and public projects
CREATE POLICY "Public read published public projects"
    ON public.projects FOR SELECT
    TO anon, authenticated
    USING (
        status = 'published' 
        AND visibility = 'public' 
        AND (published_at IS NULL OR published_at <= NOW())
    );

-- Allowlisted admins can view all statuses (draft, review, archived, private) and mutate
CREATE POLICY "Admins manage all projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (public.is_site_admin())
    WITH CHECK (public.is_site_admin());


-- 3. Archive Files Table (Private by default storage metadata)
CREATE TABLE IF NOT EXISTS public.archive_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storage_path TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    folder_path TEXT NOT NULL DEFAULT '/',
    category TEXT NOT NULL,
    file_type TEXT NOT NULL,
    mime_type TEXT,
    size_bytes BIGINT NOT NULL DEFAULT 0,
    version TEXT DEFAULT '1.0',
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    is_demo BOOLEAN DEFAULT true,
    download_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.archive_files ENABLE ROW LEVEL SECURITY;

-- Public read only for public archive files
CREATE POLICY "Public read public archive files"
    ON public.archive_files FOR SELECT
    TO anon, authenticated
    USING (visibility = 'public');

-- Admins manage all archive files
CREATE POLICY "Admins manage archive files"
    ON public.archive_files FOR ALL
    TO authenticated
    USING (public.is_site_admin())
    WITH CHECK (public.is_site_admin());


-- 4. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public INSERT only (Cannot view any existing messages)
CREATE POLICY "Allow public insert on contact_messages"
    ON public.contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only allowlisted admins can read or update inquiries
CREATE POLICY "Admins read and manage contact_messages"
    ON public.contact_messages FOR ALL
    TO authenticated
    USING (public.is_site_admin())
    WITH CHECK (public.is_site_admin());


-- 5. Audit Logs Table (Administrative action trail)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    target_table TEXT NOT NULL,
    record_id TEXT,
    performed_by UUID REFERENCES auth.users(id),
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view audit logs"
    ON public.audit_logs FOR SELECT
    TO authenticated
    USING (public.is_site_admin());

CREATE POLICY "Admins insert audit logs"
    ON public.audit_logs FOR INSERT
    TO authenticated
    WITH CHECK (public.is_site_admin());
