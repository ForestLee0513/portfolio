"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import type { PortfolioProject } from "@/api/portfolio/types";
import FilterTabs, { type Filter } from "./parts/FilterTabs";
import ProjectCard from "./parts/ProjectCard";

// 필터 상태만 있는 화면이라 index.tsx가 상태를 들고 parts/에 렌더링을 위임한다.
// 프로젝트 데이터는 서버 컴포넌트(app/portfolio/page.tsx)가 Notion에서 읽어와 prop으로 내려준다.
export default function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<Filter>("전체");

  const filtered = useMemo(
    () => (filter === "전체" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="지금까지 만들어 온 결과물들"
        description="회사 프로젝트와 개인 프로젝트를 갤러리 형식으로 모았습니다. 새 프로젝트는 계속 추가될 예정입니다."
      >
        <div className="mt-6">
          <FilterTabs value={filter} onChange={setFilter} />
        </div>
      </PageHeader>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        {projects.length === 0 ? (
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 rounded-4xl border border-dashed border-border py-24 text-center">
            <p className="font-medium text-foreground">아직 등록된 프로젝트가 없어요</p>
            <p className="text-sm text-muted-foreground">
              Notion 데이터베이스에 프로젝트를 추가하면 이곳에 자동으로 표시됩니다.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
