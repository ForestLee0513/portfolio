import type { Metadata } from "next";
import Portfolio from "@/components/screens/Portfolio";
import { getPortfolioProjects } from "@/api/portfolio/requests";

export const metadata: Metadata = { title: "Portfolio" };

// 재검증 주기 — Notion에 새 프로젝트를 올리면 최대 이만큼 후 반영된다.
export const revalidate = 300;

export default function Page() {
  // await 하지 않는다 — 조회는 바로 시작되지만, 실제로 값을 읽는 건
  // Portfolio 안의 Suspense 경계(PortfolioGrid)로 미룬다.
  const projectsPromise = getPortfolioProjects();
  return <Portfolio projectsPromise={projectsPromise} />;
}
