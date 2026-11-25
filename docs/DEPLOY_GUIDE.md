# GitHub + Netlify 배포 가이드

## 준비물
- GitHub 계정
- Netlify 계정
- 이 프로젝트 폴더 전체

## 1단계: GitHub 저장소 생성
1. GitHub에 로그인합니다.
2. `New repository`를 누릅니다.
3. 저장소 이름을 `student-portfolio` 등으로 정합니다.
4. Public 또는 Private 중 공개 범위를 선택합니다.
5. `Create repository`를 누릅니다.

## 2단계: 파일 업로드
1. 저장소 화면에서 `Add file` → `Upload files`를 선택합니다.
2. 프로젝트 폴더의 파일을 업로드합니다. `public-site`, `netlify.toml`, `README.md`가 포함되어야 합니다.
3. `Commit changes`로 저장합니다.

## 3단계: Netlify 연결
1. Netlify에 로그인합니다.
2. `Add new site` → `Import an existing project`를 선택합니다.
3. GitHub를 선택하고 권한 승인 후 방금 만든 저장소를 선택합니다.
4. `netlify.toml`의 설정을 사용합니다. Publish directory는 `public-site`입니다.
5. Deploy를 실행합니다.

## 4단계: 공개 사이트 검수
- 첫 화면이 정상적으로 표시되는지 확인합니다.
- 메뉴를 눌렀을 때 각 섹션으로 이동하는지 확인합니다.
- 카테고리 필터와 검색이 작동하는지 확인합니다.
- 작업 카드를 누르면 제작 과정, 도구, 프롬프트, 회고가 열리는지 확인합니다.
- 스마트폰 폭에서도 메뉴와 카드가 정상 표시되는지 확인합니다.
- 실제 공개할 연락처와 파일만 등록했는지 확인합니다.

## 5단계: 수정 후 재배포
`public-site/assets/data.js`, `public-site/index.html`, `public-site/uploads/` 안의 파일을 수정한 뒤 GitHub에 Commit/Push합니다. Netlify가 새 변경 사항을 자동 배포합니다.

주의: 실제 Netlify 사이트 생성 및 GitHub 권한 승인은 사용자 계정에서 진행해야 합니다. 이 프로젝트 파일만으로 계정 생성이나 배포가 완료된 것은 아닙니다.
