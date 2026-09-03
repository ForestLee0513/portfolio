import {
  isFullBlock,
  isFullDatabase,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";

import { notionClient } from "@/lib/notion";
import { BLOG_PROPERTY_NAMES, NOTION_BLOG_DATABASE_ID } from "./constants";
import type { BlogPostDetail, BlogPostSummary } from "./types";

// requests.ts는 raw async 함수만 둔다 (queries.ts 없음).
// 글 목록/본문이 TanStack Query 캐시가 아니라 Next.js의 서버 컴포넌트 fetch로
// 렌더링되는 정적 콘텐츠라서 이 도메인은 client-state 레이어가 필요 없다.

type Properties = PageObjectResponse["properties"];

function pickTextProperty(
  properties: Properties,
  names: readonly string[],
): string {
  for (const name of names) {
    const prop = properties[name];
    if (!prop) continue;
    if (prop.type === "rich_text")
      return prop.rich_text.map((t) => t.plain_text).join("");
    if (prop.type === "select" && prop.select) return prop.select.name;
    if (prop.type === "url" && prop.url) return prop.url;
  }
  return "";
}

function pickTags(properties: Properties, names: readonly string[]): string[] {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "multi_select")
      return prop.multi_select.map((t) => t.name);
  }
  return [];
}

function pickDate(
  properties: Properties,
  names: readonly string[],
): string | null {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "date" && prop.date) return prop.date.start;
  }
  return null;
}

function isPublished(
  properties: Properties,
  names: readonly string[],
): boolean {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "checkbox") return prop.checkbox;
  }
  // 공개 여부 속성 자체가 없는 워크스페이스도 있으니, 없으면 기본적으로 공개로 취급한다.
  return true;
}

function getTitle(properties: Properties): string {
  const titleProp = Object.values(properties).find(
    (prop) => prop.type === "title",
  );
  if (titleProp?.type === "title") {
    return titleProp.title.map((t) => t.plain_text).join("") || "제목 없음";
  }
  return "제목 없음";
}

// pages.retrieveMarkdown()은 콜아웃/컬럼 같은 블록을 <callout>, <columns> 같은 커스텀 태그로
// 섞어 내려주는데, 여는/닫는 태그 바로 옆에 빈 줄이 없으면 CommonMark의 HTML 블록 규칙상
// 다음 빈 줄이 나올 때까지 그 뒤 마크다운(제목, 굵게, 링크 등)이 전부 raw 텍스트로 삼켜진다.
// 태그 앞뒤에 빈 줄을 강제로 넣어 이후 내용이 다시 마크다운으로 파싱되게 한다.
function normalizeNotionMarkdown(markdown: string): string {
  return (
    markdown
      .replace(/(<(?:callout|columns|column)\b[^>]*>)/g, "\n\n$1\n\n")
      .replace(/(<\/(?:callout|columns|column)>)/g, "\n\n$1\n\n")
      .replace(/(<empty-block\b[^>]*\/?>(?:<\/empty-block>)?)/g, "\n\n$1\n\n")
      // Notion이 콜아웃 내부 텍스트를 탭으로 들여쓰는데, 빈 줄 뒤 탭 들여쓰기는
      // CommonMark에서 코드 블록으로 해석되므로 줄 시작의 탭을 모두 제거한다.
      .replace(/^\t+/gm, "")
      .replace(/\n{3,}/g, "\n\n")
  );
}

function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  return page.cover.type === "external"
    ? page.cover.external.url
    : page.cover.file.url;
}

function mapPageToSummary(page: PageObjectResponse): BlogPostSummary | null {
  if (!isPublished(page.properties, BLOG_PROPERTY_NAMES.published)) return null;

  return {
    id: page.id.replace(/-/g, ""),
    title: getTitle(page.properties),
    description: pickTextProperty(
      page.properties,
      BLOG_PROPERTY_NAMES.description,
    ),
    date: pickDate(page.properties, BLOG_PROPERTY_NAMES.date),
    tags: pickTags(page.properties, BLOG_PROPERTY_NAMES.tags),
    cover: getCoverUrl(page),
  };
}

// 설정값(NOTION_BLOG_DATABASE_ID)은 데이터베이스 자체의 ID일 수도, 그 데이터베이스를
// 인라인으로 담고 있는 상위 페이지의 ID일 수도 있다 — 둘 다 그대로 동작하게 한다.
async function resolveDatabaseId(): Promise<string | null> {
  if (!NOTION_BLOG_DATABASE_ID) return null;

  try {
    const database = await notionClient.databases.retrieve({
      database_id: NOTION_BLOG_DATABASE_ID,
    });
    if (isFullDatabase(database)) return database.id;
  } catch {
    // database_id가 아니라 page_id였던 경우 — 아래에서 하위 블록을 뒤진다.
  }

  const children = await notionClient.blocks.children.list({
    block_id: NOTION_BLOG_DATABASE_ID,
  });
  const childDatabase = children.results
    .filter(isFullBlock)
    .find((block) => block.type === "child_database");

  return childDatabase?.id ?? null;
}

async function getDataSourceId(): Promise<string | null> {
  const databaseId = await resolveDatabaseId();
  if (!databaseId) return null;

  const database = await notionClient.databases.retrieve({
    database_id: databaseId,
  });
  if (!isFullDatabase(database)) return null;
  return database.data_sources[0]?.id ?? null;
}

async function queryAllPosts(
  dataSourceId: string,
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...response.results.filter(isFullPage));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    const dataSourceId = await getDataSourceId();
    if (!dataSourceId) return [];

    const pages = await queryAllPosts(dataSourceId);
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

    const page = await notionClient.pages
      .retrieve({ page_id: pageId })
      .catch(() => null);
    if (!page || !isFullPage(page)) return null;

    const summary = mapPageToSummary(page);
    if (!summary) return null;

    const { markdown } = await notionClient.pages.retrieveMarkdown({
      page_id: pageId,
    });

    return { ...summary, markdown: normalizeNotionMarkdown(markdown) };
  } catch (error) {
    console.error("[blog] Notion 게시글을 불러오지 못했습니다.", error);
    return null;
  }
}
