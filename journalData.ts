import { JournalPost } from '../types';

export const journalData: JournalPost[] = [
  {
    id: 'post-1', slug: 'portfolio-process-record', title: '포트폴리오에 결과물과 제작 과정을 함께 기록하는 이유',
    category: 'AI Workflow',
    excerpt: '완성된 파일만 나열하는 대신 목표, 역할, 도구, 프롬프트, 제작 단계와 회고를 함께 남기는 기록 방식입니다.',
    content: `### 결과물만으로는 설명하기 어려운 것들\n작업을 시작한 이유, 해결하려던 문제, 맡은 역할, 선택한 도구와 판단 과정을 함께 기록하면 결과물의 맥락을 전달할 수 있습니다.\n\n### 권장 기록 항목\n- 프로젝트 목표와 대상\n- 본인의 역할과 기여 범위\n- 사용한 생성형 AI 및 제작 도구\n- 실제 사용한 프롬프트와 수정 과정\n- 제작 단계와 결과물 링크\n- 검토 내용, 한계와 다음 개선점\n\n### 기록 원칙\n확인하지 않은 수치나 수상 이력을 작성하지 않고, 팀 작업은 본인의 기여 범위를 구분해 적습니다.`,
    publishedAt: '2026-11-25', readTimeMinutes: 3, tags: ['포트폴리오', '작업 기록', '회고'], isDemo: true
  },
  {
    id: 'post-2', slug: 'github-netlify-publishing', title: 'GitHub와 Netlify로 개인 웹사이트 공개하기',
    category: 'Web Engineering',
    excerpt: '저장소 생성, 프로젝트 파일 업로드, Commit·Push, Netlify 연결과 배포 확인으로 이어지는 기본 흐름을 정리합니다.',
    content: `### 1. GitHub 저장소 준비\n웹사이트 소스 코드를 보관할 저장소를 만들고 프로젝트 파일을 업로드합니다.\n\n### 2. 변경 이력 관리\n파일 변경 사항을 Commit으로 기록하고 Push하여 원격 저장소에 반영합니다.\n\n### 3. Netlify 연결 및 배포\nNetlify에서 GitHub 저장소를 연결하고 프로젝트의 빌드 명령과 배포 폴더를 지정합니다.\n\n### 4. 공개 사이트 확인\n배포 URL에 접속해 첫 화면뿐 아니라 하위 페이지 직접 접속과 새로고침도 확인합니다. 실제 배포 여부는 사용자 계정에서 확인해야 합니다.`,
    publishedAt: '2026-11-25', readTimeMinutes: 4, tags: ['GitHub', 'Netlify', '배포'], isDemo: true
  }
];
