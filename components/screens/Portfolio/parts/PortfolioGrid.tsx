"use client";

import { use, useMemo } from "react";
import type { PortfolioProject } from "@/api/portfolio/types";
import type { Filter } from "./FilterTabs";
import ProjectCard from "./ProjectCard";

// React의 use()로 프로미스를 읽는다 — 아직 풀리지 않았으면 이 컴포넌트만 suspend되고,
// 형제로 즉시 렌더링된 PageHeader/FilterTabs에는 영향을 주지 않는다.
export default function PortfolioGrid({
  projectsPromise,
  filter,
}: {
  projectsPromise: Promise<PortfolioProject[]>;
  filter: Filter;
}) {
  const projects = use(projectsPromise);

  const filtered = useMemo(
    () => (filter === "전체" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  if (projects.length === 0) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 rounded-4xl border border-dashed border-border py-24 text-center">
        <p className="font-medium text-foreground">아직 등록된 프로젝트가 없어요</p>
        <p className="text-sm text-muted-foreground">
          Notion 데이터베이스에 프로젝트를 추가하면 이곳에 자동으로 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
      {filtered.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
