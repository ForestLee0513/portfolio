"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/api/portfolio/types";

// 목록에서는 요약만 보여주고, 해결 과제·전체 구현·결과 등 PDF와 동일한 전체 내용은
// /portfolio/[id] 상세 페이지에서 보여준다 (블로그 목록/상세와 같은 구조).
export default function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/portfolio/${project.id}`}
        className="flex h-full flex-col gap-4 rounded-4xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg dark:ring-foreground/10"
      >
        <div>
          <Badge variant={project.category === "개인" ? "default" : "secondary"}>
            {project.category} · {project.org}
          </Badge>
          <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{project.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{project.role} · {project.period}</p>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>

        <ul className="flex flex-col gap-1.5">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm leading-6 text-foreground/90">
              <span className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 6).map((tech) => (
            <Badge key={tech} variant="outline" className="h-auto px-2 py-0.5 text-[11px]">
              {tech}
            </Badge>
          ))}
        </div>

        <span className="inline-flex items-center gap-1 border-t border-border/60 pt-4 text-xs font-medium text-primary">
          자세히 보기
          <IconArrowRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}
