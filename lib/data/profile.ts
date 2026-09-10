// 이우림의 기본 프로필 정보 — 이력/Skills/포트폴리오/연락처 화면이 공통으로 참조한다.
// 출처: references/source-resume.pdf 및 지정 프로젝트 저장소 (2026.09.10 대조).
import { projectCaseStudies, type ProjectCaseStudy } from "./projects";

export const profile = {
  name: "이우림",
  role: "Front-end Developer",
  tagline:
    "웹·앱의 공통 UI와 인증·결제 기능을 개발하는 프론트엔드 개발자 이우림",
  summary:
    "반복되는 개발 작업을 줄이고, 수정하기 쉬운 웹과 앱을 만드는 프론트엔드 개발자입니다. 코드에 고정돼 있던 250개 이상 고객사의 배너 디자인을 Jinja2 템플릿과 DB로 관리하도록 바꿨습니다. 웹·앱 에이전시에서는 디자인 시스템과 공통 템플릿을 만들고 Claude Code를 개발 과정에 적용해, 50페이지 규모 앱의 API 연동 포함 개발 기간을 약 5일에서 2일로 줄였습니다. 이커머스·구독 서비스의 결제를 구현했으며, 수동으로 배포하던 대시보드에는 AWS와 GitHub Actions로 배포 자동화를 적용했습니다. 문제를 해결하는 데 필요하면 백엔드와 인프라도 직접 다룹니다.",
  totalCareer: "3년차",
  email: "woolimlee.dev@gmail.com",
  phone: "+82 10-6855-5696",
  links: {
    github: "https://github.com/ForestLee0513",
    linkedin: "https://www.linkedin.com/in/woolimlee0513/",
    email: "mailto:woolimlee.dev@gmail.com",
  },
  highlights: [
    {
      title: "고객사가 직접 수정하는 배너",
      description:
        "PICLICK의 고객사별 배너 디자인은 코드에 고정돼 있었습니다. 250개 이상 고객사의 배너를 Jinja2 템플릿과 DB로 관리하고, 고객사가 어드민에서 직접 수정하도록 바꿨습니다.",
    },
    {
      title: "웹·앱에서 재사용하는 UI",
      description:
        "Ubittz 디자인 시스템에서 버튼·입력창 등 공용 UI 18종을 개발해 웹·모바일 npm 패키지 2종으로 배포했습니다. 브랜드 색상에 따라 테마를 바꾸고, Storybook에서 컴포넌트 사양을 확인하도록 구성했습니다.",
    },
    {
      title: "Slack으로 확인하는 운영 오류",
      description:
        "PICLICK 어드민에서 오류를 발견하기까지 약 3일이 걸리던 과정을 Sentry·Slack 실시간 알림으로 바꿨습니다. AWS S3·CloudFront와 GitHub Actions로 수동 배포도 자동화했습니다.",
    },
  ],
  stats: [
    {
      value: "약 83%",
      label: "단순 퍼블리싱 시간 절감",
      detail: "디자인 시스템·AI 적용 / 3일 → 0.5일",
    },
    {
      value: "250+",
      label: "고객사 배너 디자인 관리",
      detail: "하드코딩 → Jinja2/DB 전환",
    },
    {
      value: "약 184",
      label: "공통 템플릿 활용 고객사",
      detail: "MVP 웹·앱 공통 템플릿 활용 규모",
    },
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
    projects: projectCaseStudies.filter(
      (project) => project.org === "주식회사씨드투",
    ),
  },
  {
    company: "(주)에이아이썸",
    period: "2020.12 - 2022.05",
    employment: "정규직",
    role: "R&D Research Engineer (Front-end)",
    projects: projectCaseStudies.filter(
      (project) => project.org === "(주)에이아이썸",
    ),
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
