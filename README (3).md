# 대학생 개인 포트폴리오 웹사이트

## 프로젝트 방향
대학생활에서 만든 과제·프로젝트·영상·이미지·음악·보고서·카드뉴스·AI 활용 가이드북·웹페이지를 정리하고, 결과물과 함께 제작 과정·사용 도구·실제 프롬프트·회고를 기록하는 개인 포트폴리오입니다.

첨부된 웹사이트 구축 자료의 게시 흐름(GitHub 저장소 생성 → 파일 업로드 → Commit/Push → Netlify 저장소 연결 → 배포 확인)을 기준으로 구성했습니다.

## 가장 쉬운 실행 방법
1. `public-site/index.html` 파일을 브라우저에서 열면 웹사이트를 확인할 수 있습니다.
2. 작업물 목록과 설명은 `public-site/assets/data.js`에서 수정합니다.
3. 결과물 파일은 `public-site/uploads/` 폴더에 넣고 `data.js`의 해당 항목에 `outputUrl: "uploads/파일명.pdf"`처럼 경로를 입력합니다.
4. 실제 사용한 프롬프트와 도구, 본인 역할, 제작 단계, 회고를 직접 기록합니다.

## 작업물 추가 방법
`public-site/assets/data.js`의 `window.PORTFOLIO_WORKS` 배열에서 기존 객체 하나를 복사해 새 항목을 만듭니다.

- `category`: 영상 / 이미지 / 음악 / 보고서 / 카드뉴스 / AI 가이드북 / 웹페이지
- `title`: 작업물 제목
- `description`: 결과물과 목적에 대한 설명
- `status`: 진행 중 / 검토 중 / 공개 등 실제 상태
- `tools`: 실제 사용한 도구 목록
- `prompt`: 실제 사용한 프롬프트 원문
- `process`: 제작 과정 단계별 목록
- `reflection`: 배운 점과 개선할 점
- `outputUrl`: `uploads/` 폴더에 넣은 결과물 경로(선택)

## GitHub + Netlify 배포
1. GitHub에서 새 저장소를 만듭니다.
2. 이 프로젝트 전체 파일을 저장소에 업로드하고 Commit합니다.
3. 변경 사항을 Push합니다.
4. Netlify에서 Add new site → Import an existing project → GitHub를 선택합니다.
5. 이 저장소를 연결합니다. `netlify.toml`에 배포 폴더 `public-site`가 지정되어 있으므로 별도 빌드 명령 없이 정적 사이트를 배포합니다.
6. 배포 완료 후 공개 URL에서 메뉴, 카테고리 필터, 검색, 상세 모달, 모바일 화면을 확인합니다.
7. 이후 `data.js`와 `uploads/`를 수정하고 GitHub에 Commit/Push하면 Netlify가 다시 배포합니다.

## 현재 구현과 미완료 항목 구분
- 정적 공개 사이트: `public-site/`에 구현
- 작업물 카테고리/검색/상세 과정 모달: 구현
- 작업물 파일 연결: `uploads/` 경로를 데이터에 입력하는 방식
- 실제 다중 사용자 관리자 업로드, DB 영구 저장, 로그인 권한: 미구현(다음 단계에서 Supabase 연동 필요)
- 실제 GitHub 저장소 생성 및 Netlify 배포: 사용자 계정에서 연결해야 하며 아직 완료로 간주하지 않음
- 이름·학교·전공·연락처·수상·자격·성과: 사용자 확인 후 입력

## 기술 구성
- 배포용 정적 사이트: HTML, CSS, JavaScript (빌드 과정 없이 공개 가능)
- 개발용 확장 소스: `src/` 아래 React + TypeScript + Vite
- Netlify 배포 설정: `netlify.toml`

정적 사이트를 먼저 공개할 수 있도록 구성했으며, React 앱과 Supabase 관리자 기능은 별도의 빌드·인증·권한 검증 후 운영 버전에 통합하는 것이 안전합니다.
