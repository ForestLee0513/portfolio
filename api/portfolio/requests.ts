import type { PageObjectResponse } from "@notionhq/client";

import {
  getDataSourceId,
  getTitle,
  pickCheckbox,
  pickDateRange,
  pickLinks,
  pickMultiSelect,
  pickText,
  pickTextLines,
  queryAllPages,
} from "@/lib/notion";
import { NOTION_PORTFOLIO_DATABASE_ID, PORTFOLIO_PROPERTY_NAMES } from "./constants";
import type { PortfolioProject } from "./types";

// requests.ts는 raw async 함수만 둔다 (queries.ts 없음) — 블로그 도메인과 같은 이유로
// 정적 콘텐츠를 서버 컴포넌트 fetch로 렌더링하기 때문에 client-state 레이어가 필요 없다.

// Notion date 속성의 ISO 날짜("2026-04-01")를 화면 표기("2026.04")로 변환한다.
function formatYearMonth(iso: string): string {
  const [year, month] = iso.split("-");
  return `${year}.${month}`;
}

// 종료일이 없으면(=end null) 진행중인 프로젝트로 표기한다.
function formatPeriod(start: string | null, end: string | null): string {
  if (!start) return "";
  return end ? `${formatYearMonth(start)} - ${formatYearMonth(end)}` : `${formatYearMonth(start)} - 진행중`;
}

function mapPageToProject(page: PageObjectResponse): PortfolioProject | null {
  if (!pickCheckbox(page.properties, PORTFOLIO_PROPERTY_NAMES.published, true)) return null;

  const { start, end } = pickDateRange(page.properties, PORTFOLIO_PROPERTY_NAMES.period);

  const project = {
    id: page.id.replace(/-/g, ""),
    name: getTitle(page.properties),
    category: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.category),
    org: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.org),
    role: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.role),
    period: formatPeriod(start, end),
    summary: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.summary),
    highlights: pickTextLines(page.properties, PORTFOLIO_PROPERTY_NAMES.highlights),
    challenge: pickText(page.properties, PORTFOLIO_PROPERTY_NAMES.challenge),
    implementation: pickTextLines(page.properties, PORTFOLIO_PROPERTY_NAMES.implementation),
    outcomes: pickTextLines(page.properties, PORTFOLIO_PROPERTY_NAMES.outcomes),
    flow: pickTextLines(page.properties, PORTFOLIO_PROPERTY_NAMES.flow),
    stack: pickMultiSelect(page.properties, PORTFOLIO_PROPERTY_NAMES.stack),
    links: pickLinks(page.properties, PORTFOLIO_PROPERTY_NAMES.links),
  };

  return project;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const dataSourceId = await getDataSourceId(NOTION_PORTFOLIO_DATABASE_ID);
    if (!dataSourceId) return [];

    // 별도 순서 속성 없이, Notion 쿼리 자체에 Period(date) 내림차순 정렬을 요청해
    // 최신 프로젝트가 먼저 오는 상태로 받아온다. (Notion 웹 UI의 뷰 정렬은 그 뷰에만
    // 저장되는 값이라 API 조회에는 반영되지 않아, sorts 파라미터로 명시해야 한다.)
    const pages = await queryAllPages(dataSourceId, [
      { property: PORTFOLIO_PROPERTY_NAMES.period[0], direction: "descending" },
    ]);
    return pages.map(mapPageToProject).filter((project): project is PortfolioProject => Boolean(project));
  } catch (error) {
    console.error("[portfolio] Notion 프로젝트 목록을 불러오지 못했습니다.", error);
    return [];
  }
}
