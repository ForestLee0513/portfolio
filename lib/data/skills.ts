// Skills 화면에서 사용하는 기술 스택 데이터.
// 출처: 원본 이력서 및 지정 프로젝트 저장소 (2026.09.10 대조).

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "language",
    title: "Language",
    description: "프로그래밍 언어 및 웹 표준",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "framework",
    title: "Framework · Library",
    description: "웹·앱 개발 프레임워크 및 라이브러리",
    items: [
      "React",
      "Next.js (App Router)",
      "React Native (Expo)",
      "Vite",
      "React Router DOM",
    ],
  },
  {
    id: "state",
    title: "상태 · 데이터",
    description: "상태 관리, 데이터 요청 및 입력값 검증",
    items: [
      "Redux Toolkit",
      "Redux-Saga",
      "SWR",
      "TanStack Query",
      "Formik / Yup",
    ],
  },
  {
    id: "styling",
    title: "스타일링 · UI",
    description: "스타일링, 디자인 시스템 및 UI 문서화",
    items: [
      "TailwindCSS",
      "NativeWind",
      "styled-components",
      "SCSS Modules",
      "Storybook",
    ],
  },
  {
    id: "payment",
    title: "결제 · 네이티브",
    description: "결제, 본인인증 및 네이티브 서비스 연동",
    items: [
      "Toss Payments",
      "Bootpay",
      "react-native-iap",
      "PASS 본인인증",
      "Firebase Analytics",
    ],
  },
  {
    id: "backend",
    title: "백엔드 · 데이터 운영",
    description: "서버 개발, 데이터 관리 및 작업 스케줄링",
    items: ["Python", "FastAPI", "Supabase", "Redis", "APScheduler", "React Router (Framework Mode)"],
  },
  {
    id: "infra",
    title: "인프라 · 도구",
    description: "배포 자동화, 모니터링 및 빌드 도구",
    items: [
      "AWS S3",
      "AWS CloudFront",
      "GitHub Actions",
      "Sentry",
      "tsup",
      "Gulp / Webpack",
      "Git",
    ],
  },
];
