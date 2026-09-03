"use client";

import { Suspense, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import CardGridSkeleton from "@/components/common/CardGridSkeleton";
import type { PortfolioProject } from "@/api/portfolio/types";
import FilterTabs, { type Filter } from "./parts/FilterTabs";
import PortfolioGrid from "./parts/PortfolioGrid";

// projectsPromise는 서버 컴포넌트(app/portfolio/page.tsx)가 await 없이 곧바로 넘긴 프로미스다.
// 헤더/필터는 즉시 렌더링되고, 실제 목록(PortfolioGrid)만 Suspense 뒤에서 스트리밍된다.
export default function Portfolio({
  projectsPromise,
}: {
  projectsPromise: Promise<PortfolioProject[]>;
}) {
  const [filter, setFilter] = useState<Filter>("전체");

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
        <Suspense fallback={<CardGridSkeleton count={4} columns="sm:grid-cols-2" />}>
          <PortfolioGrid projectsPromise={projectsPromise} filter={filter} />
        </Suspense>
      </section>
    </>
  );
}
