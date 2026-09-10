// 이우림의 기본 프로필 정보 — 이력/Skills/포트폴리오/연락처 화면이 공통으로 참조한다.
// 출처: references/source-resume.pdf 및 지정 프로젝트 저장소 (2026.09.10 대조).
import { projectCaseStudies, type ProjectCaseStudy } from "./projects";

export const profile = {
  name: "이우림",
  role: "Front-end Developer",
  tagline: "반복되는 문제를 재사용 가능한 UI와 개발 흐름으로 개선하는 프론트엔드 개발자",
  summary:
    "React·Next.js·React Native로 웹과 앱을 개발합니다. 디자인 시스템과 공통 템플릿으로 반복 작업을 줄이고, 본인인증·결제·운영 도구처럼 서비스에 필요한 흐름을 구현해 왔습니다. 문제의 원인을 공통 구조에 반영하며, 필요할 때는 백엔드와 배포 자동화까지 연결해 해결합니다.",
  totalCareer: "3년 이상",
  email: "woolimlee.dev@gmail.com",
  phone: "+82 10-6855-5696",
  links: {
    github: "https://github.com/ForestLee0513",
    linkedin: "https://www.linkedin.com/in/woolimlee0513/",
    email: "mailto:woolimlee.dev@gmail.com",
  },
  highlights: [
    {
      title: "반복 작업을 줄이는 구조",
      description:
        "250개 이상 고객사의 배너를 Jinja2·DB 기반 관리로 전환했습니다. 웹·모바일 공용 UI 18종을 개발하고 npm 패키지 2종으로 배포한 경험이 있습니다.",
    },
    {
      title: "템플릿과 AI를 활용한 개발",
      description:
        "디자인 시스템·템플릿과 Claude Code·Figma MCP를 활용해 50페이지 규모 앱의 개발 기간을 약 5일에서 2일 이내로 단축했습니다. API 연동을 포함한 사례입니다.",
    },
    {
      title: "운영까지 연결하는 문제 해결",
      description:
        "Sentry·Slack으로 오류 알림을 연결하고 AWS·GitHub Actions로 배포를 자동화했습니다. 개인 프로젝트 IInfoDX에서는 사용자 웹·API·운영 어드민을 함께 개발합니다.",
    },
  ],
  stats: [
    { value: "약 83%", label: "페이지 퍼블리싱 시간 절감", detail: "디자인 시스템·AI 적용 / 3일 → 0.5일" },
    { value: "250+", label: "고객사 배너 디자인 관리", detail: "하드코딩 → Jinja2/DB 전환" },
    { value: "약 184", label: "공통 템플릿 활용 고객사", detail: "MVP 웹·앱 공통 템플릿 활용 규모" },
    { value: "18종", label: "공용 UI 컴포넌트", detail: "npm 패키지 2종 배포" },
  ],
} as const;

export type CareerProject = ProjectCaseStudy;

export interface CareerEntry {
  company: string;
  period: string;
  employment: string;
  role: string;
  current?: boolean;
  projects: CareerProject[];
}

export const career: CareerEntry[] = [
  {
    company: "주식회사씨드투",
    period: "2025.02 - 재직중",
    employment: "정규직",
    role: "Front-end Developer",
    current: true,
    projects: projectCaseStudies.filter((project) => project.org === "주식회사씨드투"),
  },
  {
    company: "(주)에이아이썸",
    period: "2020.12 - 2022.05",
    employment: "정규직",
    role: "R&D Research Engineer (Front-end)",
    projects: projectCaseStudies.filter((project) => project.org === "(주)에이아이썸"),
  },
];

export const education = {
  school: "송파공업고등학교",
  period: "2018.02 - 2021.02",
  status: "졸업",
  major: "모바일전자과",
  description:
    "2020년 11월 PSR Media 현장실습에서 품절 대체 솔루션 개발·운영을 경험했습니다.",
};
