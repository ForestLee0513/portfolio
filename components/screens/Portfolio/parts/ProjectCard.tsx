"use client";

import { motion } from "motion/react";
import { IconExternalLink } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-4 rounded-4xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg dark:ring-foreground/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge
            variant={project.category === "개인" ? "default" : "secondary"}
          >
            {project.category} · {project.org}
          </Badge>
          <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {project.role} · {project.period}
          </p>
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {project.summary}
      </p>

      <ul className="flex flex-col gap-1.5">
        {project.highlights.slice(0, 3).map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2 text-sm leading-6 text-foreground/90"
          >
            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.stack.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="h-auto px-2 py-0.5 text-[11px]"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {link.label}
              <IconExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
