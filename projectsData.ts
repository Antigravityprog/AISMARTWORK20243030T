import { Project } from '../types';

// 화면 구조 확인을 위한 프로젝트 기록 예시입니다. 실제 산출물·수치·성과는 소유자가 확인 후 입력합니다.
export const projectsData: Project[] = [
  {
    id: 'proj-1', slug: 'salary-experience-analysis', title: '경력과 급여의 관계에 대한 통계 분석',
    subtitle: '경영 데이터 분석 과제 · 통계적 관계를 탐색하는 학습 프로젝트', category: '데이터 분석', year: 2026,
    role: '데이터 전처리 및 통계 분석', timeline: '수행 기간 입력 필요', team: '개인 과제',
    summary: '경력(Experience)과 급여(Salary)의 관계를 산점도, 상관분석, 회귀분석 등으로 살펴보고 분석 결과를 경영학 관점에서 해석하는 과제입니다. 실제 분석 결과와 수치는 최종 실행 파일을 확인한 뒤 추가합니다.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Python', '통계', '상관분석', '회귀분석'], featured: true, isDemo: true,
    objectives: [{ title: '변수 간 관계 탐색', description: '경력과 급여의 분포 및 관계를 시각적으로 확인합니다.' }, { title: '통계 결과 해석', description: '분석 방법의 가정과 한계를 함께 설명합니다.' }],
    process: [
      { phase: '문제 정의', duration: '기록 필요', description: '분석 질문과 변수의 의미를 정리합니다.', deliverables: ['분석 계획'] },
      { phase: '데이터 확인 및 전처리', duration: '기록 필요', description: '결측치, 변수 유형, 이상치 여부를 확인합니다.', deliverables: ['전처리 코드'] },
      { phase: '분석 및 해석', duration: '기록 필요', description: '산점도와 통계 분석을 실행하고 결과를 해석합니다.', deliverables: ['분석표 및 그래프', '결과 보고서'] }
    ],
    technologies: [{ category: '분석 도구', items: ['Python', 'Pandas', '통계 분석 라이브러리'] }], outcomes: [], reflections: [], media: [], attachments: [], externalLinks: []
  },
  {
    id: 'proj-2', slug: 'memory-semiconductor-outlook', title: '한국 메모리 반도체 산업 투자 전망',
    subtitle: '삼성전자·SK하이닉스 중심의 산업 및 투자 리서치 과제', category: '보고서 및 연구', year: 2026,
    role: '산업 조사 및 보고서 기획', timeline: '수행 기간 입력 필요', team: '과제 구성에 따라 입력',
    summary: '메모리 반도체 산업의 시장 흐름과 기술 변화, 삼성전자 및 SK하이닉스의 경쟁 요인을 조사하고 투자 관점에서 정리하는 보고서 과제입니다. 자료 출처와 기준 시점을 함께 기록하도록 구성합니다.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['반도체', '산업 분석', '투자 리서치', '보고서'], featured: true, isDemo: true,
    objectives: [{ title: '산업 구조 이해', description: 'DRAM, NAND, HBM 등 주요 기술과 시장 구조를 정리합니다.' }, { title: '기업 비교', description: '공식 공시와 신뢰할 수 있는 자료를 기준으로 기업별 강점과 위험 요인을 비교합니다.' }],
    process: [
      { phase: '산업 및 기술 범위 설정', duration: '기록 필요', description: '분석 대상, 기준 시점, 핵심 용어를 정의합니다.', deliverables: ['목차 및 조사 범위'] },
      { phase: '자료 조사 및 출처 관리', duration: '기록 필요', description: '공식 공시와 시장 자료를 수집하고 출처를 기록합니다.', deliverables: ['참고문헌 목록', '자료 정리표'] },
      { phase: '비교 분석 및 보고서 작성', duration: '기록 필요', description: '산업 전망과 기업별 요인을 구분해 서술합니다.', deliverables: ['보고서 초안', '발표 자료'] }
    ],
    technologies: [{ category: '조사 및 문서 도구', items: ['공식 공시 자료', 'Excel', '문서·프레젠테이션 도구'] }], outcomes: [], reflections: [], media: [], attachments: [], externalLinks: []
  },
  {
    id: 'proj-3', slug: 'gangneung-tourism-plan', title: '강릉 관광 활성화 아이디어 기획',
    subtitle: '지역 문화유산·로컬 콘텐츠를 연결하는 관광 경험 제안', category: '공모전 및 대외활동', year: 2026,
    role: '관광 콘텐츠 기획 및 자료 조사', timeline: '수행 기간 입력 필요', team: '과제 구성에 따라 입력',
    summary: '강릉의 역사·문화 자원, 지역 먹거리, 콘텐츠 촬영지를 연결해 관광객이 미션을 수행하며 지역을 경험하는 코스를 구상하는 수업 프로젝트입니다.',
    coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    tags: ['강릉', '관광 기획', '지역 콘텐츠', '문화유산'], featured: true, isDemo: true,
    objectives: [{ title: '지역 자원 연결', description: '문화유산과 지역 상권, 콘텐츠 촬영지를 하나의 여행 흐름으로 구성합니다.' }, { title: '주민 참여 구조', description: '지역 주민 사업자와 관광객이 함께 참여할 수 있는 운영 아이디어를 제안합니다.' }],
    process: [
      { phase: '지역 자원 조사', duration: '기록 필요', description: '관광 자원과 이동 동선, 지역 상권을 조사합니다.', deliverables: ['자원 조사표'] },
      { phase: '여행 경험 설계', duration: '기록 필요', description: '스토리와 미션을 결합한 코스를 기획합니다.', deliverables: ['코스 기획안'] },
      { phase: '운영 방안 정리', duration: '기록 필요', description: '주민 참여, 지역 보상, 지자체 지원 방안을 정리합니다.', deliverables: ['실행 제안서'] }
    ],
    technologies: [{ category: '기획 도구', items: ['자료 조사', '지도 및 동선 기획', '프레젠테이션'] }], outcomes: [], reflections: [], media: [], attachments: [], externalLinks: []
  },
  {
    id: 'proj-4', slug: 'inventory-motion-video', title: '재고 관리의 과학, 최적 발주량을 찾아서',
    subtitle: '수요 예측과 재고 문제를 설명하는 교육용 모션그래픽 기획', category: '영상 및 디자인', year: 2026,
    role: '영상 구성 및 생성형 AI 프롬프트 설계', timeline: '제작 기간 입력 필요', team: '개인 제작 프로젝트',
    summary: '재고 과잉과 품절 문제를 제시한 뒤 수요 예측과 적정 발주 개념을 설명하는 대학 강의용 영상 프로젝트입니다. 영상 결과물과 장면별 내레이션·프롬프트를 함께 보관합니다.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tags: ['모션그래픽', '영상', '생성형 AI', '재고관리'], featured: true, isDemo: true,
    objectives: [{ title: '문제 상황 시각화', description: '과잉 재고와 품절이 발생하는 상황을 장면으로 전달합니다.' }, { title: '핵심 개념 설명', description: '수요 분포와 최적 발주량 개념을 이해하기 쉽게 구성합니다.' }],
    process: [
      { phase: '스토리보드 및 내레이션', duration: '기록 필요', description: '문제 제기부터 결론까지 장면 순서를 구성합니다.', deliverables: ['장면 구성표', '내레이션 원고'] },
      { phase: '장면별 생성 프롬프트', duration: '기록 필요', description: '영상 도구에 입력할 장면·카메라·전환 지시를 작성합니다.', deliverables: ['장면별 프롬프트'] },
      { phase: '편집 및 검수', duration: '기록 필요', description: '자막, 음성, 장면 연결, 재생 품질을 확인합니다.', deliverables: ['최종 영상 파일'] }
    ],
    technologies: [{ category: '제작 도구', items: ['ChatGPT', 'Flow.google', '영상 편집 도구'] }], outcomes: [], reflections: [], media: [], attachments: [], externalLinks: []
  },
  {
    id: 'proj-5', slug: 'personal-portfolio-website', title: '대학생 개인 포트폴리오 웹사이트',
    subtitle: '학습·프로젝트·활동·미디어 결과물을 모으는 개인 아카이브', category: '기술 및 프로그래밍', year: 2026,
    role: '기획 및 웹사이트 제작', timeline: '진행 중', team: '개인 프로젝트',
    summary: '대학생활에서 만든 과제와 프로젝트를 결과물뿐 아니라 제작 과정, 사용 도구, 프롬프트, 회고와 함께 기록하고 공개하기 위한 웹사이트입니다.',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
    tags: ['개인 포트폴리오', 'React', 'TypeScript', 'GitHub', 'Netlify'], featured: true, isDemo: true,
    objectives: [{ title: '작업물 통합 관리', description: '영상, 이미지, 음악, 보고서, 카드뉴스, 가이드북, 웹페이지를 한곳에서 관리합니다.' }, { title: '제작 과정 공개', description: '도구와 프롬프트, 역할, 작업 단계, 배운 점을 함께 기록합니다.' }],
    process: [
      { phase: '정보 구조 및 화면 기획', duration: '진행 중', description: '포트폴리오 유형과 페이지 구조를 설계합니다.', deliverables: ['사이트 구조도'] },
      { phase: '프론트엔드 구현', duration: '진행 중', description: '반응형 페이지와 프로젝트 탐색 기능을 구현합니다.', deliverables: ['웹사이트 소스'] },
      { phase: '배포 및 운영 준비', duration: '예정', description: 'GitHub 저장소와 Netlify를 연결하고 공개 배포를 검증합니다.', deliverables: ['배포 가이드'] }
    ],
    technologies: [{ category: '웹 기술', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] }, { category: '배포 도구', items: ['GitHub', 'Netlify'] }], outcomes: [], reflections: [], media: [], attachments: [], externalLinks: []
  }
];
