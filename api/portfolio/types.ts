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
  /** 문서와 웹 카드에서 공통으로 쓰는 편집본 상세 내용. */
  challenge?: string;
  implementation?: string[];
  outcomes?: string[];
  /** 포트폴리오 PDF의 서비스 흐름 다이어그램에 쓰는 단계별 라벨. */
  flow?: string[];
}
