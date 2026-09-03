// 블로그 목록으로 사용하는 Notion 데이터베이스 ID (서버 전용 — 클라이언트에 노출하지 않는다).
export const NOTION_BLOG_DATABASE_ID =
  process.env.NOTION_BLOG_DATABASE_ID ?? "";

// Notion 데이터베이스의 속성명이 워크스페이스마다 다를 수 있어 후보 이름을 여러 개 둔다.
// 실제 속성명과 다르면 이 목록만 맞춰주면 나머지 코드는 그대로 동작한다.
export const BLOG_PROPERTY_NAMES = {
  description: ["Description", "Summary", "설명", "요약"],
  tags: ["Tags", "Tag", "태그"],
  date: ["Published", "Date", "날짜", "게시일"],
  published: ["Public", "Published", "공개", "게시"],
} as const;
