import { isFullPage, type PageObjectResponse } from "@notionhq/client";

import {
  getCoverUrl,
  getDataSourceId,
  getTitle,
  notionClient,
  pickCheckbox,
  pickDate,
  pickMultiSelect,
  pickText,
  queryAllPages,
} from "@/lib/notion";
import { BLOG_PROPERTY_NAMES, NOTION_BLOG_DATABASE_ID } from "./constants";
import type { BlogPostDetail, BlogPostSummary } from "./types";

// requests.ts는 raw async 함수만 둔다 (queries.ts 없음).
// 글 목록/본문이 TanStack Query 캐시가 아니라 Next.js의 서버 컴포넌트 fetch로
// 렌더링되는 정적 콘텐츠라서 이 도메인은 client-state 레이어가 필요 없다.

// pages.retrieveMarkdown()은 콜아웃/컬럼 같은 블록을 <callout>, <columns> 같은 커스텀 태그로
// 섞어 내려주는데, 여는/닫는 태그 바로 옆에 빈 줄이 없으면 CommonMark의 HTML 블록 규칙상
// 다음 빈 줄이 나올 때까지 그 뒤 마크다운(제목, 굵게, 링크 등)이 전부 raw 텍스트로 삼켜진다.
// 태그 앞뒤에 빈 줄을 강제로 넣어 이후 내용이 다시 마크다운으로 파싱되게 한다.
function normalizeNotionMarkdown(markdown: string): string {
  return markdown
    .replace(/(<(?:callout|columns|column)\b[^>]*>)/g, "\n\n$1\n\n")
    .replace(/(<\/(?:callout|columns|column)>)/g, "\n\n$1\n\n")
    // <empty-block/> 같은 self-closing 표기는 rehype-raw가 쓰는 HTML 파서(parse5)에서
    // void 요소가 아닌 커스텀 태그의 "/"를 무시하고 여는 태그로만 처리한다. 그러면 이 태그는
    // 이후 문서 끝까지의 모든 형제 콘텐츠를 자기 children으로 삼켜버리고, empty-block 컴포넌트가
    // children을 렌더링하지 않아 그 뒤 본문 전체가 사라진다. 항상 완전한 open+close 쌍으로 바꿔
    // 태그가 그 자리에서 확실히 닫히게 한다. 여는/닫는 태그를 한 줄에 붙여 쓰면 CommonMark가
    // 이를 문단(<p>) 안의 인라인 HTML로 취급해 <p> 안에 <div>가 들어가는 잘못된 HTML 중첩(hydration
    // 에러의 원인)이 생기므로, 각 태그를 별도 줄에 두어 HTML 블록으로 파싱되게 한다.
    .replace(/<empty-block\b[^>]*\/?>(?:<\/empty-block>)?/g, "\n\n<empty-block>\n</empty-block>\n\n")
    // Notion이 콜아웃 내부 텍스트를 탭으로 들여쓰는데, 빈 줄 뒤 탭 들여쓰기는
    // CommonMark에서 코드 블록으로 해석되므로 줄 시작의 탭을 모두 제거한다.
    .replace(/^\t+/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

function mapPageToSummary(page: PageObjectResponse): BlogPostSummary | null {
  if (!pickCheckbox(page.properties, BLOG_PROPERTY_NAMES.published, true)) return null;

  return {
    id: page.id.replace(/-/g, ""),
    title: getTitle(page.properties),
    description: pickText(page.properties, BLOG_PROPERTY_NAMES.description),
    date: pickDate(page.properties, BLOG_PROPERTY_NAMES.date),
    tags: pickMultiSelect(page.properties, BLOG_PROPERTY_NAMES.tags),
    cover: getCoverUrl(page),
  };
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const dataSourceId = await getDataSourceId(NOTION_BLOG_DATABASE_ID);
    if (!dataSourceId) return [];

    const pages = await queryAllPages(dataSourceId);
    const posts = pages
      .map(mapPageToSummary)
      .filter((post): post is BlogPostSummary => Boolean(post));

    return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  } catch (error) {
    // NOTION_API_KEY 미설정, 데이터베이스 미공유 등으로 실패해도 화면은 빈 목록으로 정상 렌더링한다.
    console.error("[blog] Notion 게시글 목록을 불러오지 못했습니다.", error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<BlogPostDetail | null> {
  try {
    const pageId = id.replace(/-/g, "");

    const page = await notionClient.pages.retrieve({ page_id: pageId }).catch(() => null);
    if (!page || !isFullPage(page)) return null;

    const summary = mapPageToSummary(page);
    if (!summary) return null;

    const { markdown } = await notionClient.pages.retrieveMarkdown({ page_id: pageId });

    return { ...summary, markdown: normalizeNotionMarkdown(markdown) };
  } catch (error) {
    console.error("[blog] Notion 게시글을 불러오지 못했습니다.", error);
    return null;
  }
}
