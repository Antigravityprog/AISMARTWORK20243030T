# QA 실행 기록

기준일: 2026-11-25

## 이번 배치에서 확인한 정적 사항
- 기존 React + TypeScript + Vite 소스에서 작업을 이어감
- 개인 포트폴리오 라우트 `/portfolio` 추가
- 작업 카테고리 7종(영상, 이미지, 음악, 보고서, 카드뉴스, AI 가이드북, 웹페이지) 구성
- 카테고리 필터 및 검색 UI 구성
- 작업 상세 모달에 사용 도구, 제작 과정, 프롬프트, 회고를 표시
- 검증되지 않은 수상, 인증, 성과 수치 및 샘플 파일을 실제 사실처럼 노출하지 않도록 기본 데이터 정리

## 실행 검증
- [x] `node --check public-site/assets/data.js` — 통과
- [x] `node --check public-site/assets/app.js` — 통과
- [x] HTML ID 중복 검사 — 중복 없음
- [x] 로컬 자산 경로 검사 — 누락 없음
- [x] 필수 섹션 ID 검사 — home/about/projects/portfolio/archive/journal/contact 확인
- [x] Python 정적 서버 HTTP 확인 — `/`, `assets/data.js`, `assets/app.js`, `assets/style.css` 모두 200
- [ ] `npm install` — 120초 시간 초과로 완료되지 않음
- [ ] `npm run typecheck` — Vite 타입 정의가 설치되지 않아 실패
- [ ] `npm run build` — 의존성 설치가 완료되지 않아 미실행
- [ ] 실제 브라우저 상호작용/반응형 시각 QA — Chromium headless 점검이 환경 시간 초과로 미완료
- [ ] Supabase Auth/RLS/Storage 실제 권한 테스트
- [ ] GitHub → Netlify 실제 배포 및 공개 URL 확인

## 알려진 제한
- `public-site/`는 빌드 과정 없이 배포할 수 있는 정적 사이트 버전입니다.
- `src/`의 React 확장 소스는 의존성 설치 및 빌드 검증이 아직 완료되지 않았습니다.
- 포트폴리오 데이터는 현재 소스 코드의 예시 데이터입니다.
- 실제 파일 업로드 및 여러 기기에서 공유되는 영구 저장은 아직 연결되지 않았습니다.
- 관리자 화면과 Supabase 스키마는 실제 계정/프로젝트 연결 및 권한 검증이 필요합니다.
- 외부 이미지 URL은 네트워크 연결 상태와 원본 제공 정책에 따라 표시가 달라질 수 있습니다.

## 추가 개선 배치 검증
- [x] 로컬 콘텐츠 편집기 파일 생성 및 스크립트 구문 검사
- [x] JSON 가져오기/내보내기 및 data.js 내보내기 동작 코드 포함 확인
- [x] 편집기 로컬 저장 한계와 관리자 인증 미지원 경고 표시
- [ ] 실제 브라우저에서 폼 상호작용 및 파일 다운로드 테스트 — 브라우저 자동화 환경 미구성
- [ ] 기존 공개 사이트와 내보낸 데이터의 실제 연동 테스트 — 실제 브라우저 배포 전
