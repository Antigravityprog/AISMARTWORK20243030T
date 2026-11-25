import { SkillCategory } from '../types';

// 역량 수준은 사용자 본인의 자기평가가 필요하므로 점수 대신 학습 분야만 제시합니다.
export const skillsData: SkillCategory[] = [
  {
    category: 'Business & Data Analytics',
    description: '경영학 과제와 데이터 분석 프로젝트를 통해 학습 중인 분야',
    skills: [
      { name: '통계 분석 및 데이터 해석', level: 0, experience: '학습·실습', description: '상관분석, 회귀분석, 기초 통계 및 결과 해석' },
      { name: '산업 리서치', level: 0, experience: '과제 수행', description: '산업 구조 조사, 기업 비교, 자료 출처 관리' }
    ]
  },
  {
    category: 'AI & Digital Content',
    description: '생성형 AI를 활용한 기획과 멀티미디어 제작 학습 분야',
    skills: [
      { name: '프롬프트 설계', level: 0, experience: '프로젝트 활용', description: '요구사항 정리, 장면 구성, 결과물 검토를 위한 프롬프트 작성' },
      { name: '영상·이미지 콘텐츠 기획', level: 0, experience: '프로젝트 활용', description: '스토리보드, 시각 콘셉트, 자막 및 결과물 구성' }
    ]
  },
  {
    category: 'Web & Publishing',
    description: '개인 웹사이트 제작과 공개 배포를 위해 학습 중인 분야',
    skills: [
      { name: 'HTML · CSS · JavaScript', level: 0, experience: '학습·실습', description: '웹 페이지 구조와 인터랙션 구현' },
      { name: 'GitHub · Netlify', level: 0, experience: '학습·실습', description: '소스 코드 버전 관리 및 정적 웹사이트 배포 과정' }
    ]
  }
];
