export interface PortfolioLink {
  label: string;
  href: string;
}

// GET (Notion) 포트폴리오 프로젝트
export interface PortfolioProject {
  id: string;
  category: string;
  name: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: PortfolioLink[];
}
