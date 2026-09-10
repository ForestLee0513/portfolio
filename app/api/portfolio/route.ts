import { getPortfolioProjects } from "@/api/portfolio/requests";

export async function GET() {
  const projects = await getPortfolioProjects();
  return Response.json(projects);
}
