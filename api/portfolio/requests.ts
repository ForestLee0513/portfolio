import type { PageObjectResponse } from "@notionhq/client";

import {
  getDataSourceId,
  getTitle,
  pickCheckbox,
  pickLinks,
  pickMultiSelect,
  pickNumber,
  pickText,
  pickTextLines,
  queryAllPages,
} from "@/lib/notion";
import { NOTION_PORTFOLIO_DATABASE_ID, PORTFOLIO_PROPERTY_NAMES } from "./constants";
import type { PortfolioProject } from "./types";

// requests.ts는 raw async 함수만 둔다 (queries.ts 없음) — 블로그 도메인과 같은 이유로
// 정적 콘텐츠를 서버 컴포넌트 fetch로 렌더링하기 때문에 client-state 레이어가 필요 없다.

function mapPageToProject(
  page: PageObjectResponse,
  fallbackOrder: number
): (PortfolioProject & { order: number }) | null {
  if (!pickCheckbox(page.properties, PORTFOLIO_PROPERTY_NAMES.published, true)) return null;

  return {
    id: page.id.replace(/-/g, ""),
    name: getTitle(page.properties),
    category: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.category),
    org: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.org),
    role: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.role),
    period: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.period),
    summary: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.summary),
    highlights: pickTextLines(page.properties, PORTFOLIO_PROPERTY_NAMES.highlights),
    stack: pickMultiSelect(page.properties, PORTFOLIO_PROPERTY_NAMES.stack),
    links: pickLinks(page.properties, PORTFOLIO_PROPERTY_NAMES.links),
    // Order 속성이 없으면 Notion에서 받아온 순서를 그대로 쓴다.
    order: pickNumber(page.properties, PORTFOLIO_PROPERTY_NAMES.order) ?? fallbackOrder,
  };
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const dataSourceId = await getDataSourceId(NOTION_PORTFOLIO_DATABASE_ID);
    if (!dataSourceId) return [];

    const pages = await queryAllPages(dataSourceId);
    const projects = pages
      .map((page, index) => mapPageToProject(page, index))
      .filter((project): project is PortfolioProject & { order: number } => Boolean(project));

    // order는 정렬에만 쓰는 내부 값이라 반환 타입(PortfolioProject)에는 포함하지 않는다.
    projects.sort((a, b) => a.order - b.order);
    return projects;
  } catch (error) {
    console.error("[portfolio] Notion 프로젝트 목록을 불러오지 못했습니다.", error);
    return [];
  }
}
