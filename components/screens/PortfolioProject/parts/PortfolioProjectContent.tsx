import Image from "next/image";
import { notFound } from "next/navigation";
import { IconExternalLink } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { getPortfolioProject } from "@/api/portfolio/requests";

// PDF(PortfolioDocument)와 같은 필드(challenge/implementation/outcomes/flow)를
// 웹 화면에 전부 보여주는 상세 페이지 — 목록 카드(ProjectCard)는 요약만 보여주고
// 여기서만 다운로드 가능한 PDF와 동일한 전체 내용을 노출한다.
export default async function PortfolioProjectContent({ id }: { id: string }) {
  const project = await getPortfolioProject(id);
  if (!project) notFound();

  return (
    <>
      <header className="mt-6">
        <Badge variant={project.category === "개인" ? "default" : "secondary"}>
          {project.category} · {project.org}
        </Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {project.role} · {project.period}
        </p>
      </header>

      <p className="mt-8 text-base leading-7 text-muted-foreground">{project.summary}</p>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((shot) => (
            <figure key={shot.url} className="overflow-hidden rounded-3xl bg-muted ring-1 ring-foreground/5">
              <div className="relative aspect-[16/10] w-full">
                <Image src={shot.url} alt={shot.caption || project.name} fill className="object-cover" unoptimized />
              </div>
              {shot.caption && (
                <figcaption className="px-4 py-2.5 text-center text-xs text-muted-foreground">
                  {shot.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {project.flow && project.flow.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-3xl bg-muted/60 px-5 py-4 text-sm font-medium text-foreground">
          {project.flow.flatMap((step, i) => [
            i > 0 ? (
              <span key={`arrow-${step}`} className="text-muted-foreground" aria-hidden="true">
                →
              </span>
            ) : null,
            <span key={step}>{step}</span>,
          ])}
        </div>
      )}

      {project.challenge && (
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">해결 과제</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.challenge}</p>
        </section>
      )}

      {project.implementation && project.implementation.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">담당 업무 · 구현</h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {project.implementation.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-7 text-foreground/90">
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.outcomes && project.outcomes.length > 0 && (
        <section className="mt-10 rounded-3xl bg-muted/40 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">결과</h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {project.outcomes.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-7 text-foreground/90">
                <span className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.stack.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline" className="h-auto px-2.5 py-1 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 border-t border-border/60 pt-6">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {link.label}
              <IconExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </>
  );
}
