import type { PortfolioProject } from "@/api/portfolio/types";
import PdfSheet, { PrintSection } from "./PrintPage";
import PdfProjectIntro from "./PdfProjectIntro";

// 포트폴리오 페이지에서 실제로 렌더링된(=필터 적용 전 전체) 프로젝트 목록을 그대로 문서화한다.
// 프로젝트 1건당 A4 한 페이지로, documents/generate.mjs 제출용 포트폴리오와 동일한 구성이다.
export default function PortfolioDocument({ projects }: { projects: PortfolioProject[] }) {
  return (
    <>
      {projects.map((project, index) => (
        <PdfSheet
          key={project.id}
          documentTitle="포트폴리오"
          eyebrow={`포트폴리오 · ${String(index + 1).padStart(2, "0")}`}
          compact
          pageIndex={index + 1}
          pageTotal={projects.length}
        >
          <PdfProjectIntro project={project} />

          <div className="pdf-flow">
            {(project.flow ?? []).flatMap((step, i) => [
              i > 0 ? (
                <span key={`arrow-${step}`} aria-hidden="true">
                  →
                </span>
              ) : null,
              <div key={step}>{step}</div>,
            ])}
          </div>

          {project.challenge && (
            <PrintSection title="해결 과제">
              <p>{project.challenge}</p>
            </PrintSection>
          )}

          {project.implementation && project.implementation.length > 0 && (
            <PrintSection title="주요 구현">
              <ul>
                {project.implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PrintSection>
          )}

          {project.outcomes && project.outcomes.length > 0 && (
            <PrintSection title="결과 · 기여">
              <div className="pdf-result">
                <ul>
                  {project.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </PrintSection>
          )}

          {project.stack.length > 0 && (
            <PrintSection title="사용 기술">
              <div className="pdf-tags">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </PrintSection>
          )}

          {project.links.length > 0 && (
            <PrintSection title="링크">
              <p className="pdf-links">
                {project.links.map((link, i) => (
                  <span key={link.href}>
                    {i > 0 && <br />}
                    <a href={link.href}>
                      {link.label} · {link.href}
                    </a>
                  </span>
                ))}
              </p>
            </PrintSection>
          )}
        </PdfSheet>
      ))}
    </>
  );
}
