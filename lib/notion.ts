import {
  Client,
  isFullBlock,
  isFullDatabase,
  isFullPage,
  type PageObjectResponse,
} from "@notionhq/client";

// Notion 공식 API 클라이언트 — NOTION_API_KEY(서버 전용 시크릿)로 인증한다.
// 대상 데이터베이스가 이 시크릿을 발급한 Notion 인테그레이션에 "연결"되어 있어야 한다.
export const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

type Properties = PageObjectResponse["properties"];

// blog·portfolio 등 여러 도메인이 공통으로 쓰는 Notion 속성 판독 헬퍼.
// 도메인별 requests.ts는 후보 속성명 목록만 들고 이 함수들을 조합해서 쓴다.

export function getTitle(properties: Properties): string {
  const titleProp = Object.values(properties).find((prop) => prop.type === "title");
  if (titleProp?.type === "title") {
    return titleProp.title.map((t) => t.plain_text).join("") || "제목 없음";
  }
  return "제목 없음";
}

export function pickText(properties: Properties, names: readonly string[]): string {
  for (const name of names) {
    const prop = properties[name];
    if (!prop) continue;
    if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
    if (prop.type === "select" && prop.select) return prop.select.name;
    if (prop.type === "url" && prop.url) return prop.url;
  }
  return "";
}

// rich_text 안에서 줄바꿈(shift+enter)으로 구분된 항목들을 배열로 뽑는다. (예: Highlights)
export function pickTextLines(properties: Properties, names: readonly string[]): string[] {
  return pickText(properties, names)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// rich_text 안에서 실제로 하이퍼링크가 걸린 구간만 {label, href}로 뽑는다. (예: Links)
export function pickLinks(
  properties: Properties,
  names: readonly string[]
): { label: string; href: string }[] {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "rich_text") {
      const links = prop.rich_text
        .filter((t) => t.href)
        .map((t) => ({ label: t.plain_text.trim(), href: t.href as string }));
      if (links.length > 0) return links;
    }
  }
  return [];
}

export function pickMultiSelect(properties: Properties, names: readonly string[]): string[] {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "multi_select") return prop.multi_select.map((t) => t.name);
  }
  return [];
}

export function pickDate(properties: Properties, names: readonly string[]): string | null {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "date" && prop.date) return prop.date.start;
  }
  return null;
}

export function pickCheckbox(
  properties: Properties,
  names: readonly string[],
  defaultValue: boolean
): boolean {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "checkbox") return prop.checkbox;
  }
  return defaultValue;
}

export function pickNumber(properties: Properties, names: readonly string[]): number | null {
  for (const name of names) {
    const prop = properties[name];
    if (prop?.type === "number" && prop.number !== null) return prop.number;
  }
  return null;
}

export function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  return page.cover.type === "external" ? page.cover.external.url : page.cover.file.url;
}

// 설정값(루트 ID)은 데이터베이스 자체의 ID일 수도, 그 데이터베이스를 인라인으로
// 담고 있는 상위 페이지의 ID일 수도 있다 — 둘 다 그대로 동작하게 한다.
export async function resolveDatabaseId(rootId: string): Promise<string | null> {
  if (!rootId) return null;

  try {
    const database = await notionClient.databases.retrieve({ database_id: rootId });
    if (isFullDatabase(database)) return database.id;
  } catch {
    // rootId가 database_id가 아니라 page_id였던 경우 — 아래에서 하위 블록을 뒤진다.
  }

  const children = await notionClient.blocks.children.list({ block_id: rootId });
  const childDatabase = children.results
    .filter(isFullBlock)
    .find((block) => block.type === "child_database");

  return childDatabase?.id ?? null;
}

export async function getDataSourceId(rootId: string): Promise<string | null> {
  const databaseId = await resolveDatabaseId(rootId);
  if (!databaseId) return null;

  const database = await notionClient.databases.retrieve({ database_id: databaseId });
  if (!isFullDatabase(database)) return null;
  return database.data_sources[0]?.id ?? null;
}

export async function queryAllPages(
  dataSourceId: string,
  sorts?: Array<{ property: string; direction: "ascending" | "descending" }>
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
      sorts,
    });
    pages.push(...response.results.filter(isFullPage));
    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}
