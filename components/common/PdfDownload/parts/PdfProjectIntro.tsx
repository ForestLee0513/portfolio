import type { PortfolioProject } from "@/api/portfolio/types";

// 경력기술서·포트폴리오 문서가 공통으로 쓰는 프로젝트 표제부(분류/이름/기간·역할/한줄 요약).
export default function PdfProjectIntro({ project }: { project: PortfolioProject }) {
  return (
    <>
      <div className="pdf-project-title">
        <span className="pdf-eyebrow">
          {project.category} · {project.org}
        </span>
        <h2>{project.name}</h2>
        <p className="pdf-meta">
          {project.period} / {project.role}
        </p>
      </div>
      <p className="pdf-lead">{project.summary}</p>
    </>
  );
}
