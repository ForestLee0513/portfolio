import { getPortfolioProjectsForPrint } from "@/api/portfolio/requests";

// 이 라우트는 PDF 다운로드(loadPortfolioForPrint)에서만 쓰인다 — /portfolio 화면은
// app/portfolio/page.tsx에서 getPortfolioProjects()를 직접 호출한다.
export async function GET() {
  const projects = await getPortfolioProjectsForPrint();
  return Response.json(projects);
}
