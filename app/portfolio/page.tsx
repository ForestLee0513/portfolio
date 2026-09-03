import type { Metadata } from "next";
import Portfolio from "@/components/screens/Portfolio";
import { getPortfolioProjects } from "@/api/portfolio/requests";

export const metadata: Metadata = { title: "Portfolio" };

// 재검증 주기 — Notion에 새 프로젝트를 올리면 최대 이만큼 후 반영된다.
export const revalidate = 300;

export default async function Page() {
  const projects = await getPortfolioProjects();
  return <Portfolio projects={projects} />;
}
