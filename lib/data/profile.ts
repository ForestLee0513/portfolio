// 이우림의 기본 프로필 정보 — 이력/Skills/포트폴리오/연락처 화면이 공통으로 참조한다.
// 출처: references/이우림_Front-end_포트폴리오.pdf, references/Front-end 개발자 이우림 입니다..pdf

export const profile = {
  name: "이우림",
  role: "Front-end Developer",
  tagline: "발견된 문제를 효율적으로 해결하고, 유지보수 할 수 있게 노력하는 개발자",
  summary:
    "문제를 해결하고 나서 끝이 아닌, 원인을 분석해 동일한 상황이 재발하지 않도록 방지하고, 발생하더라도 빠르게 해결하는 것을 지향합니다. Front-end에 한정되지 않고 Back-end·인프라 지식이 필요하다면 적극적으로 활용합니다.",
  totalCareer: "3년 2개월",
  email: "woolimlee.dev@gmail.com",
  phone: "+82 10-6855-5696",
  links: {
    github: "https://github.com/ForestLee0513",
    linkedin: "https://www.linkedin.com/in/woolimlee0513/",
    email: "mailto:woolimlee.dev@gmail.com",
  },
  highlights: [
    {
      title: "문제 해결 & 자동화",
      description:
        "하드코딩으로 관리되던 배너 디자인 정보를 Jinja2 템플릿과 DB화로 전환해, 250개가 넘는 고객사의 배너 디자인을 간편하게 관리할 수 있도록 개선했습니다.",
    },
    {
      title: "빠른 결과물, 일관된 품질",
      description:
        "디자인 시스템·템플릿 개발 후 Claude Code와 하네스 엔지니어링을 적극 활용해, 50페이지 규모 앱의 API 연동 포함 개발 기간을 5일에서 약 2일 이내로 단축했습니다.",
    },
    {
      title: "Front-end 그 이상",
      description:
        "AWS S3·CloudFront·GitHub Actions CI/CD를 적용해 일일이 수동으로 배포하던 대시보드 프로세스를 자동화로 개선한 경험이 있습니다.",
    },
  ],
  stats: [
    { value: "83%", label: "페이지 퍼블리싱 시간 절감", detail: "3일 → 0.5일" },
    { value: "250+", label: "고객사 배너 디자인 관리", detail: "하드코딩 → Jinja2/DB 전환" },
    { value: "184", label: "고객사 앱 개발·관리", detail: "MVP 웹/앱 템플릿 기준" },
    { value: "18종", label: "공용 UI 컴포넌트", detail: "npm 패키지 2종 배포" },
  ],
} as const;

export interface CareerProject {
  name: string;
  period: string;
  summary: string;
}

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
    period: "2025.02 - 재직중 (1년 8개월)",
    employment: "정규직",
    role: "Front-end Developer",
    current: true,
    projects: [
      {
        name: "Ubittz 디자인 시스템 개발",
        period: "2026.04 - 2026.06",
        summary:
          "React/React Native 기반 사내 공용 디자인 시스템을 설계·개발해 npm 패키지 2종으로 배포. 페이지 퍼블리싱 시간을 83% 절감했습니다.",
      },
      {
        name: "비즈가이드",
        period: "2026.02 - 2026.04",
        summary:
          "나이스비즈 API 기반 AI 사업계획서·기업분석 관리 SaaS. PASS 본인인증, Toss페이먼츠 실결제 연동을 담당했습니다.",
      },
      {
        name: "Ubittz 개발 에이전시 MVP 개발",
        period: "2025.02 - 2026.06",
        summary:
          "컨설팅 고객사를 위한 MVP 웹/앱 개발 템플릿. 지금까지 약 184개 고객사의 앱이 이 템플릿으로 개발·관리됩니다.",
      },
    ],
  },
  {
    company: "(주)에이아이썸",
    period: "2020.12 - 2022.05 (1년 6개월)",
    employment: "정규직",
    role: "R&D Research Engineer (Front-end)",
    projects: [
      {
        name: "PICLICK 솔루션 어드민 대시보드",
        period: "2021.01 - 2021.03",
        summary:
          "쇼핑몰 추천 솔루션의 매출·노출 통계를 시각화하는 관리자 대시보드. Sentry+Slack 알림으로 에러 발견을 실시간화했습니다.",
      },
      {
        name: "PICLICK 쇼핑몰 추천 솔루션",
        period: "2020.12 - 2021.01",
        summary:
          "Cafe24·고도몰·메이크샵 상품 정보 기반 AI 추천 서비스. 하드코딩 템플릿을 Jinja2로 전환해 고객사별 개발 프로세스를 최대 3일 절감했습니다.",
      },
    ],
  },
];

export const education = {
  school: "송파공업고등학교",
  period: "2018.02 - 2021.02",
  status: "졸업",
  major: "모바일전자과",
  description:
    "2020년 11월부터 PSR Media에서 고등학교 실습을 통해 1개월간 실습을 진행했으며, 품절대체 솔루션을 개발·운영한 경험이 성과로 인정되어 2021년에 정규직으로 전환되었습니다.",
};
