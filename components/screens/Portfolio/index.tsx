"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageHeader from "@/components/common/PageHeader";
import { projects } from "@/lib/data/projects";
import FilterTabs, { type Filter } from "./parts/FilterTabs";
import ProjectCard from "./parts/ProjectCard";

// 필터 상태만 있는 화면이라 index.tsx가 상태를 들고 parts/에 렌더링을 위임한다.
export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("전체");

  const filtered = useMemo(
    () => (filter === "전체" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
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
        <motion.div layout className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
