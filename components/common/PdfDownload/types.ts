import type { PortfolioProject } from "@/api/portfolio/types";

export type PdfDocumentType = "resume" | "career" | "portfolio";

// 포트폴리오는 Notion에서 비동기로 받아온 목록이 필요해 다운로드 시점에 함께 넘겨받는다.
export type PdfPrintJob =
  | { type: "resume" }
  | { type: "career" }
  | { type: "portfolio"; projects: PortfolioProject[] };

export interface PdfDownloadContextValue {
  downloadResume: () => void;
  downloadCareer: () => void;
  downloadPortfolio: (projects: PortfolioProject[]) => void;
}
