import type { PortfolioProject } from "@/api/portfolio/types";
import PrintPage, { PrintSection } from "./PrintPage";

// 포트폴리오 페이지에서 실제로 렌더링된(=필터 적용 전 전체) 프로젝트 목록을 그대로 문서화한다.
export default function PortfolioDocument({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  return (
    <PrintPage documentTitle="Portfolio">
      <PrintSection title={`프로젝트 (${projects.length}건)`}>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="break-inside-avoid rounded-lg border border-neutral-200 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h4 className="text-sm font-bold text-neutral-900">
                  {project.name}
                  <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 align-middle">
                    {project.category}
                  </span>
                </h4>
                <span className="text-xs text-neutral-500">{project.period}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {project.org} · {project.role}
              </p>

              <p className="mt-2 text-xs leading-5 text-neutral-600">
                {project.summary}
              </p>

              {project.highlights.length > 0 && (
                <ul className="mt-2 flex flex-col gap-1">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-xs leading-5 text-neutral-600 before:mr-1.5 before:content-['–']"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.stack.length > 0 && (
                <p className="mt-2 text-[11px] text-neutral-500">
                  <span className="font-medium text-neutral-700">기술 스택</span>{" "}
                  {project.stack.join(", ")}
                </p>
              )}

              {project.links.length > 0 && (
                <p className="mt-1 text-[11px] text-neutral-500">
                  {project.links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && " · "}
                      {link.label}: {link.href}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </PrintSection>
    </PrintPage>
  );
}
