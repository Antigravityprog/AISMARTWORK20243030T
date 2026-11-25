/*
  포트폴리오 작업 데이터 편집 안내
  - 아래 works 배열의 항목을 복사해 새 작업을 추가할 수 있습니다.
  - category는 영상 / 이미지 / 음악 / 보고서 / 카드뉴스 / AI 가이드북 / 웹페이지 중 하나를 사용합니다.
  - 실제 사용 도구와 프롬프트, 본인 역할을 기록하고 확인되지 않은 성과는 입력하지 마세요.
  - 파일은 public-site/uploads/ 폴더에 넣고 결과물 링크를 outputUrl에 입력할 수 있습니다.
*/
window.PORTFOLIO_WORKS = [
  {
    id: 'inventory-motion-video', category: '영상', title: '재고 관리의 과학, 최적 발주량을 찾아서',
    description: '재고 과잉과 품절 문제를 시작으로 수요 예측과 적정 발주 개념을 설명하는 대학 강의용 모션그래픽 기획.',
    status: '제작 기록 정리 중', tools: ['ChatGPT', 'Flow.google', '영상 편집 도구'],
    prompt: '실제 사용한 장면별 프롬프트 원문을 여기에 추가하세요. 장면 길이, 카메라 움직임, 자막, 내레이션, 전환 효과를 구분해 기록합니다.',
    process: ['교육 대상과 핵심 메시지 정의', '문제 제기 → 위기 → 원리 → 최적 발주 → 결론의 흐름 구성', '장면별 영상 프롬프트 및 내레이션 작성', '자막·음성·전환·재생 품질 검수'],
    reflection: '최종 영상 파일과 실제 사용 프롬프트를 연결하고, 수정 전후 차이를 기록합니다.', tone: 'indigo', outputUrl: ''
  },
  {
    id: 'semiconductor-report', category: '보고서', title: '한국 메모리 반도체 산업 투자 전망',
    description: '메모리 반도체 산업 흐름과 삼성전자·SK하이닉스의 경쟁 요인을 조사하는 투자 리서치 과제.',
    status: '보고서 자료 정리', tools: ['ChatGPT', 'Excel', '문서·프레젠테이션 도구'],
    prompt: '실제 조사 프롬프트와 자료 검증 지시문을 추가하세요. 출처·기준 시점·분석 범위를 함께 남깁니다.',
    process: ['보고서 목적과 독자 정의', '산업·기술·시장 분석 목차 설계', '공식 공시 및 시장 자료 수집', '비교 분석과 참고문헌 정리', '초안 검토 및 발표 자료 구성'],
    reflection: '분석 수치와 전망은 자료 기준 시점 및 출처를 반드시 함께 표기합니다.', tone: 'navy', outputUrl: ''
  },
  {
    id: 'gangneung-tourism', category: '보고서', title: '강릉 관광 활성화 아이디어 기획',
    description: '문화유산, 지역 먹거리, 콘텐츠 촬영지를 연결한 참여형 관광 코스 제안.',
    status: '기획 기록', tools: ['ChatGPT', '지도·자료 조사 도구', '프레젠테이션 도구'],
    prompt: '강릉 관광 자원과 주민 참여형 운영 구조를 조사·비교하도록 요청한 실제 프롬프트를 추가하세요.',
    process: ['지역 관광 자원 조사', '스토리 기반 코스 및 미션 설계', '주민 사업자 참여와 지역 보상 구상', '예산·운영 주체·지속 가능성 정리'],
    reflection: '아이디어의 실행 가능성을 높이기 위해 실제 운영 주체와 예산 근거를 보완합니다.', tone: 'green', outputUrl: ''
  },
  {
    id: 'salary-analysis', category: '보고서', title: '경력과 급여의 관계에 대한 통계 분석',
    description: '경력과 급여의 관계를 산점도와 통계 방법으로 탐색하는 데이터 분석 과제.',
    status: '분석 기록 보완 필요', tools: ['Python', 'Pandas', '통계 분석 도구'],
    prompt: '실제 분석 질문, 변수 정의, 전처리 조건 및 해석 지침을 입력하세요. 실행하지 않은 분석 결과는 기재하지 않습니다.',
    process: ['연구 질문과 변수 정의', '데이터 구조 및 결측치 확인', '탐색적 분석과 시각화', '통계 분석 및 가정 점검', '결과와 한계 해석'],
    reflection: '실제 실행 코드와 결과표를 연결해 재현 가능한 분석 기록으로 보완합니다.', tone: 'violet', outputUrl: ''
  },
  {
    id: 'portfolio-website', category: '웹페이지', title: '대학생 개인 포트폴리오 웹사이트',
    description: '대학생활의 프로젝트와 결과물, 제작 과정, 프롬프트를 통합 기록하는 개인 아카이브.',
    status: '개발 진행 중', tools: ['ChatGPT', 'Antigravity IDE', 'HTML', 'CSS', 'JavaScript', 'GitHub', 'Netlify'],
    prompt: '대학생 개인 포트폴리오를 구축하고, 결과물뿐 아니라 제작 과정·사용 도구·프롬프트를 함께 공개할 수 있는 반응형 웹사이트를 설계해줘.',
    process: ['사이트 목적과 사용자 흐름 정의', '페이지 및 콘텐츠 구조 설계', '반응형 UI와 프로젝트 상세 화면 구현', 'GitHub 저장소 관리', 'Netlify 연결 및 공개 배포 검증'],
    reflection: '실제 공개 배포와 관리자 업로드 기능은 계정 연결 및 테스트 후 완료 상태로 표시합니다.', tone: 'cyan', outputUrl: ''
  },
  {
    id: 'image-archive', category: '이미지', title: '이미지 및 시각 콘셉트 아카이브',
    description: '과제 표지, 콘셉트 이미지, 시각 자료 등 이미지 작업을 모아두는 등록 공간.',
    status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'],
    prompt: '이미지 생성에 실제 사용한 프롬프트와 참조 이미지 사용 여부를 기록하세요.',
    process: ['이미지 목적과 비율 결정', '스타일 및 구도 정의', '프롬프트 작성과 생성', '수정 사항과 최종본 비교'],
    reflection: '실제 이미지 파일과 생성 프롬프트가 등록되면 공개 카드로 전환합니다.', tone: 'pink', outputUrl: ''
  },
  {
    id: 'music-archive', category: '음악', title: '배경음악 및 사운드 작업',
    description: '영상 분위기에 맞춘 배경음악과 효과음 작업물을 정리하는 등록 공간.',
    status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'],
    prompt: '음악 생성 또는 편집에 사용한 프롬프트, 장르, 길이, 라이선스 정보를 기록하세요.',
    process: ['영상 분위기와 음향 목표 정의', '음악·효과음 구성', '장면과 음향 싱크 조정', '저작권 및 사용 범위 확인'],
    reflection: '음원 파일과 사용 권한을 확인한 뒤 공개합니다.', tone: 'orange', outputUrl: ''
  },
  {
    id: 'cardnews-archive', category: '카드뉴스', title: '카드뉴스 제작 아카이브',
    description: '정보 전달형 카드뉴스의 기획안, 페이지 구성, 최종 이미지 묶음을 기록하는 공간.',
    status: '결과물 등록 대기', tools: ['사용 도구 입력 필요'],
    prompt: '주제, 대상 독자, 카드 수, 페이지별 메시지를 정한 실제 프롬프트를 입력하세요.',
    process: ['주제 및 독자 정의', '핵심 메시지와 페이지 구성', '시각 스타일 및 정보 계층 설계', '오탈자·출처·가독성 검수'],
    reflection: '페이지별 원본 이미지와 최종 묶음 파일을 등록합니다.', tone: 'red', outputUrl: ''
  },
  {
    id: 'ai-guidebook', category: 'AI 가이드북', title: 'AI 활용 가이드북 및 학습 노트',
    description: 'NotebookLM 등 생성형 AI 활용 과정과 사용 방법을 정리하는 가이드북 아카이브.',
    status: '구성 예정', tools: ['NotebookLM', 'ChatGPT'],
    prompt: '가이드북의 대상 독자, 학습 목표, 단계별 실습 및 주의사항을 정의한 프롬프트를 기록하세요.',
    process: ['학습 목표와 독자 설정', '참고 자료 수집 및 출처 확인', '단계별 설명과 예시 작성', '실습 검토 및 PDF 제작'],
    reflection: '실제 가이드북 파일과 참고 자료 목록을 등록합니다.', tone: 'teal', outputUrl: ''
  }
];
