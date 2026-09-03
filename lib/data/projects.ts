// 포트폴리오 갤러리에서 사용하는 프로젝트 데이터.
// 새 프로젝트가 생기면 이 배열에 항목만 추가하면 화면(components/screens/Portfolio)이 자동으로 반영한다.
// 출처: references/이우림_Front-end_포트폴리오.pdf

export interface Project {
  id: string;
  category: "회사" | "개인";
  name: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "ubittz-design-system",
    category: "회사",
    name: "Ubittz 디자인 시스템",
    org: "주식회사씨드투",
    role: "Front-end Developer",
    period: "2026.04 - 2026.06",
    summary:
      "React·React Native 기반 사내 공용 디자인 시스템 라이브러리를 설계·개발하고, PC/모바일 npm 패키지 2종으로 배포했습니다.",
    highlights: [
      "디자인 시스템 + AI 도입으로 페이지 퍼블리싱 소요 시간 83% 절감 (3일 → 0.5일)",
      "Tailwind 커스텀 플러그인으로 3단계 색상 파생 체인(Base → Semantic → Component) 구축",
      "Context + Provider 패턴으로 Popup/BottomSheet를 Hooks로 제어하는 선언적 API 구현",
      "tsup 기반 CJS/ESM/DTS 멀티 포맷 빌드 및 SVGR 아이콘 자동 생성 파이프라인 구축",
    ],
    stack: ["React", "React Native", "Storybook", "Expo", "TailwindCSS", "tsup", "SVGR"],
    links: [
      { label: "npm (PC)", href: "https://www.npmjs.com/package/@ubittz/design-system" },
      { label: "npm (모바일)", href: "https://www.npmjs.com/package/@ubittz/native-design-system" },
    ],
  },
  {
    id: "bizguide",
    category: "회사",
    name: "비즈가이드",
    org: "주식회사씨드투",
    role: "Front-end Developer",
    period: "2026.02 - 2026.04",
    summary:
      "React·Next.js와 나이스비즈 API 기반 AI 사업계획서 작성 및 기업분석 관리 SaaS 서비스입니다.",
    highlights: [
      "PASS API 기반 실제 본인인증 처리를 forwardRef 헤드리스 컴포넌트로 분리",
      "Toss페이먼츠 실결제 연동 — 주문 생성 → 결제 승인 2단계 트랜잭션을 Redux-Saga로 설계",
      "로그인 복귀 URL 화이트리스트 검증으로 오픈 리다이렉트 취약점 방어",
      "미들웨어 헤더 전파 + 서버 컴포넌트 레이아웃 가드로 2단 라우트 가드 구현",
    ],
    stack: [
      "TypeScript",
      "Next.js (App Router)",
      "Redux Toolkit",
      "Redux-Saga",
      "SWR",
      "Formik / Yup",
      "Toss Payments",
      "PASS 본인인증",
    ],
  },
  {
    id: "ubittz-agency-mvp",
    category: "회사",
    name: "Ubittz 개발 에이전시 MVP",
    org: "주식회사씨드투",
    role: "Front-end Developer",
    period: "2025.02 - 2026.06",
    summary:
      "컨설팅 고객사를 위한 MVP 웹/앱 개발 템플릿으로, 지금까지 약 184개 고객사의 앱이 이 템플릿으로 개발·관리됩니다.",
    highlights: [
      "Claude Code 에이전트 + Figma MCP + 하네스 엔지니어링으로 결과물 개발 기간 83% 절감",
      "Toss Payments WebView 결제 — 54개 은행/간편결제 앱 딥링크 전환 및 미설치 앱 fallback 처리",
      "react-native-iap 기반 인앱결제(구독 포함) 전체 라이프사이클을 Redux-Saga로 설계",
      "authenticatedRequest로 Bearer 토큰 자동 주입, 인증 하이드레이션 게이팅 구현",
    ],
    stack: [
      "TypeScript",
      "React 18",
      "Vite",
      "styled-components",
      "React Native (Expo)",
      "TanStack Query",
      "NativeWind",
      "Redux-Saga",
    ],
  },
  {
    id: "iinfo-dx",
    category: "개인",
    name: "IInfo DX",
    org: "개인 프로젝트",
    role: "Full-Stack Developer",
    period: "2026.06 - 진행중",
    summary:
      "beatmania IIDX, Sound Voltex 등 아케이드 리듬게임 비공식 난이도표의 성과를 관리하고 SNS처럼 공유하는 개인 개발 플랫폼입니다.",
    highlights: [
      "핸들·팔로우 기반 SNS형 프로필 공유 (이미지 공유 방식의 유사 서비스와 차별화)",
      "e-Amusement 데이터를 북마크릿 스크립트로 등록, 성적 스냅샷으로 특정 시점 즉시 복구",
      "이메일/Google OAuth 로그인 + 401 자동 갱신·재시도 axios 인터셉터 구현",
      "TanStack Query로 서버 상태 캐싱, 난이도표별 클리어 램프 승/패/무 집계",
    ],
    stack: [
      "TypeScript",
      "React 19",
      "Next.js",
      "TanStack Query",
      "shadcn",
      "Tailwind",
      "Supabase",
      "Python",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/ForestLee0513/iinfo-dx-frontend" },
    ],
  },
  {
    id: "piclick-admin",
    category: "회사",
    name: "PICLICK 솔루션 어드민 대시보드",
    org: "(주)에이아이썸",
    role: "R&D Research Engineer (Front-end)",
    period: "2021.01 - 2021.03",
    summary:
      "PICLICK 쇼핑몰 추천 솔루션의 매출·노출 통계 데이터를 정리·조정하기 위한 관리자 대시보드입니다.",
    highlights: [
      "Sentry + Slack 알림 연동으로 에러 발견 과정을 3일에서 실시간으로 단축",
      "Apex Charts, react-data-table-component로 통계 데이터 시각화",
      "AWS S3·CloudFront·GitHub Actions CI/CD로 수동 배포 프로세스를 자동화",
    ],
    stack: [
      "JavaScript",
      "React",
      "React Hook Form",
      "Apex Charts",
      "react-data-table-component",
      "Sentry",
      "AWS S3",
      "AWS CloudFront",
    ],
  },
  {
    id: "piclick-recommend",
    category: "회사",
    name: "PICLICK 쇼핑몰 추천 솔루션",
    org: "(주)에이아이썸",
    role: "R&D Research Engineer (Front-end)",
    period: "2020.12 - 2021.01",
    summary:
      "Cafe24·고도몰·메이크샵 등에서 상품 정보를 받아와 AI 기반으로 유사 상품을 추천하는 서비스입니다.",
    highlights: [
      "3개 레파지토리를 yarn workspace 모노레포로 구성해 프로젝트 용량 효율 개선",
      "하드코딩 쇼핑몰 템플릿을 Jinja2 + 어드민 대시보드 기반으로 전환",
      "개선된 프로세스로 고객사별 개발 프로세스를 최대 3일 절감",
    ],
    stack: ["TypeScript", "yarn workspace", "Gulp", "SCSS", "Python3", "Flask", "Jinja2"],
  },
];
