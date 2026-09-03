// GET (Notion) 블로그 목록 아이템
export interface BlogPostSummary {
  // 대시 없는 Notion 페이지 id. 한글 슬러그는 링크드인 등 일부 사이트에서 공유 시 URL 인코딩이
  // 깨지는 문제가 있어 쓰지 않는다 — id는 순수 hex라 어디서든 안전하다.
  id: string;
  title: string;
  description: string;
  date: string | null;
  tags: string[];
  cover: string | null;
}

// GET (Notion) 블로그 상세 — 공식 API의 페이지→마크다운 변환 결과를 그대로 담는다.
export interface BlogPostDetail extends BlogPostSummary {
  markdown: string;
}
