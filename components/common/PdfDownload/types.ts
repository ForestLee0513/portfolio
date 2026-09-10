import type { PortfolioProject } from "@/api/portfolio/types";

export type PdfDocumentType = "resume" | "career" | "portfolio";

// 포트폴리오는 Notion에서 비동기로 받아온 목록이 필요해 다운로드 시점에 함께 넘겨받는다.
export type PdfPrintJob =
  | { type: "resume"; projects: PortfolioProject[] }
  | { type: "career"; projects: PortfolioProject[] }
  | { type: "portfolio"; projects: PortfolioProject[] };

export interface PdfDownloadContextValue {
  downloadResume: () => void;
  downloadCareer: () => void;
  downloadPortfolio: (projects: PortfolioProject[]) => void;
  /** 현재 준비·인쇄 중인 문서 종류. 데이터 로딩 시작부터 인쇄 완료(afterprint)까지 유지된다. */
  loadingType: PdfDocumentType | null;
}
