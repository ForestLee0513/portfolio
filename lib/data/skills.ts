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
    description: "기본이 되는 언어",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "framework",
    title: "Framework · Library",
    description: "화면을 구성하는 핵심 프레임워크",
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
    description: "서버/클라이언트 상태 관리",
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
    description: "디자인 시스템과 스타일링",
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
    description: "실결제 연동 및 네이티브 기능",
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
    description: "IInfoDX 사용자 웹·API·운영 어드민 개발에 활용",
    items: ["Python", "FastAPI", "Supabase", "Redis", "APScheduler", "React Router (Framework Mode)"],
  },
  {
    id: "infra",
    title: "인프라 · 도구",
    description: "배포 자동화와 품질 관리",
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
