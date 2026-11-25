# 실제 공개 배포 체크리스트 (GitHub + Netlify)

## 배포 대상
- 공개 웹사이트 폴더: `public-site/`
- Netlify 설정 파일: 프로젝트 루트의 `netlify.toml`
- Build command: 비워 두거나 `echo Static HTML site: no build step required`
- Publish directory: `public-site`
- Functions directory: 사용하지 않음

## A. GitHub 저장소 준비
1. GitHub에서 새 저장소를 만든다. 권장 이름: `student-portfolio`.
2. 이 프로젝트의 최상위 파일과 폴더를 저장소 루트에 업로드한다.
3. 최소한 `public-site/`, `netlify.toml`, `README.md`가 저장소 루트에 있어야 한다.
4. `.env` 및 비밀키 파일은 업로드하지 않는다. `.gitignore`가 이를 제외한다.
5. 업로드 후 저장소 루트에서 `public-site/index.html`과 `netlify.toml` 경로를 확인한다.

## B. Netlify 연결
1. Netlify에 로그인하고 Add new project / Import an existing project를 선택한다.
2. Git provider로 GitHub를 선택하고 저장소 접근 권한을 승인한다.
3. 방금 만든 `student-portfolio` 저장소를 선택한다.
4. 배포 설정은 저장소의 `netlify.toml`을 사용한다. 설정 화면에서 재정의한다면 Publish directory를 `public-site`로 지정한다.
5. Deploy를 실행하고 Deploys 화면에서 Published 상태를 확인한다.
6. Netlify가 발급한 `https://....netlify.app` 주소를 연다.

## C. 공개 URL 인수 테스트
- [ ] 홈 화면이 HTTPS로 열린다.
- [ ] 브라우저 개발자 도구 Console에 치명적인 오류가 없다.
- [ ] CSS, JavaScript, favicon이 정상 로드된다.
- [ ] 내비게이션의 각 섹션 이동이 작동한다.
- [ ] 검색과 카테고리 필터가 작동한다.
- [ ] 작품 상세/제작 과정 표시가 작동한다.
- [ ] `editor.html`이 열리고 로컬 편집 기능이 동작한다.
- [ ] 모바일 화면에서 레이아웃이 깨지지 않는다.
- [ ] 공개하면 안 되는 개인 연락처·파일·비밀정보가 없다.

## 배포 범위와 주의사항
현재 Netlify 배포 대상은 `public-site/`의 정적 사이트다. `editor.html`은 브라우저 localStorage를 사용하는 로컬 콘텐츠 편집기이며, 서버 인증·공용 데이터베이스·실제 파일 스토리지는 연결되어 있지 않다. 편집기에서 내보낸 데이터는 `public-site/assets/data.js`로 반영한 뒤 GitHub에 커밋해야 공개 사이트에 배포된다.

GitHub 저장소 업로드, Netlify 계정 승인 및 실제 사이트 생성은 해당 계정 소유자의 인증이 필요하다. 실제 공개 URL은 Netlify가 배포를 완료한 뒤에만 확정된다.
