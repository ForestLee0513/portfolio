// 포트폴리오 목록으로 쓰는 Notion 데이터베이스 ID (서버 전용 — 클라이언트에 노출하지 않는다).
export const NOTION_PORTFOLIO_DATABASE_ID = process.env.NOTION_PORTFOLIO_DATABASE_ID ?? "";

// Notion 데이터베이스의 속성명이 워크스페이스마다 다를 수 있어 후보 이름을 여러 개 둔다.
export const PORTFOLIO_PROPERTY_NAMES = {
  category: ["Category", "카테고리", "구분"],
  org: ["Org", "Organization", "소속"],
  role: ["Role", "역할"],
  period: ["Period", "기간"],
  summary: ["Summary", "요약", "개요"],
  highlights: ["Highlights", "핵심 성과", "성과"],
  stack: ["Stack", "기술 스택", "Tech"],
  links: ["Links", "링크"],
  published: ["Public", "공개", "게시"],
  order: ["Order", "순서"],
} as const;
