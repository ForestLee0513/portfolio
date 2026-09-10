import type { PortfolioProject } from "@/api/portfolio/types";
import PdfProjectIntro from "./PdfProjectIntro";

// 경력기술서 한 프로젝트의 본문: 표제부 → 해결 과제 → 담당 업무·구현 → 결과 → 기술 스택 → 링크.
export default function CareerProjectDetails({ project }: { project: PortfolioProject }) {
  return (
    <>
      <PdfProjectIntro project={project} />

      {project.challenge && (
        <section>
          <h2>해결 과제</h2>
          <p>{project.challenge}</p>
        </section>
      )}

      {project.implementation && project.implementation.length > 0 && (
        <section>
          <h2>담당 업무 · 구현</h2>
          <ul>
            {project.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {project.outcomes && project.outcomes.length > 0 && (
        <section>
          <h2>결과</h2>
          <div className="pdf-result">
            <ul>
              {project.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.stack.length > 0 && (
        <div className="pdf-tags">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <p className="pdf-links">
          {project.links.map((link, index) => (
            <span key={link.href}>
              {index > 0 && <br />}
              <a href={link.href}>
                {link.label} · {link.href}
              </a>
            </span>
          ))}
        </p>
      )}
    </>
  );
}
