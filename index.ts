export interface ProjectObjective {
  title: string;
  description: string;
}

export interface ProjectProcessStep {
  phase: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface TechnologyItem {
  category: string; // e.g. Frontend, Backend, AI / LLM, DevOps
  items: string[];
}

export interface ProjectOutcome {
  metric: string;
  value: string;
  description: string;
}

export interface ProjectReflection {
  topic: string;
  insight: string;
}

export interface ProjectMedia {
  type: 'image' | 'video' | 'diagram';
  url: string;
  caption: string;
  thumbnail?: string;
}

export interface ProjectAttachment {
  name: string;
  size: string;
  fileType: string;
  downloadUrl: string;
  isDemo: boolean;
}

export interface ExternalLink {
  label: string;
  url: string;
  type: 'github' | 'live' | 'docs' | 'video';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: '데이터 분석' | '보고서 및 연구' | '공모전 및 대외활동' | '영상 및 디자인' | '기술 및 프로그래밍';
  year: number;
  role: string;
  timeline: string;
  team: string;
  summary: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  isDemo: boolean;
  objectives: ProjectObjective[];
  process: ProjectProcessStep[];
  technologies: TechnologyItem[];
  outcomes: ProjectOutcome[];
  reflections: ProjectReflection[];
  media: ProjectMedia[];
  attachments: ProjectAttachment[];
  externalLinks: ExternalLink[];
}

export interface ArchiveFile {
  id: string;
  name: string;
  folderPath: string; // e.g. "/projects", "/research", "/media"
  fileType: 'pdf' | 'code' | 'image' | 'doc' | 'audio' | 'data' | 'zip';
  category: 'Academic Reports' | 'AI Prompts & Notebooks' | 'Technical Guides' | 'Design Assets' | 'Audio & Media';
  sizeBytes: number;
  sizeFormatted: string;
  updatedAt: string;
  version: string;
  description: string;
  tags: string[];
  isDemo: boolean;
  previewUrl?: string;
  downloadUrl: string;
  contentSnippet?: string;
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  period: string;
  category: 'Academics' | 'AI & Tech' | 'Leadership' | 'Competition & Project';
  role: string;
  description: string;
  achievements: string[];
  isDemo: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 1 - 100
  experience: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  category: 'Certification' | 'Award' | 'Course Completion' | 'Academic Honor';
  description: string;
  badgeUrl?: string;
  isDemo: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'UI/UX Design' | 'Architecture Diagram' | 'Campaign Posters' | 'Facility Photos' | 'Marketing Media';
  imageUrl: string;
  thumbnailUrl: string;
  date: string;
  description: string;
  tags: string[];
  dimensions?: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  category: 'AI Workflow' | 'Web Engineering' | 'Data Analytics' | 'Case Study';
  excerpt: string;
  content: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  isDemo: boolean;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
