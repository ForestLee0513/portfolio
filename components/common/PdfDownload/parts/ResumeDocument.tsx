import { career, education, profile } from "@/lib/data/profile";
import type { PortfolioProject } from "@/api/portfolio/types";
import PdfSheet, { PrintSection } from "./PrintPage";

// 1쪽 이력서에 담을 핵심 기술만 추린 목록. Skills 페이지 전체 목록과 달리
// documents/generate.mjs 제출용 이력서와 동일하게 의도적으로 축약한다.
const CORE_SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Redux-Saga",
  "TanStack Query",
  "TailwindCSS",
];
const EXTENDED_SKILLS = ["Python", "FastAPI", "Supabase", "Redis", "AWS S3·CloudFront", "GitHub Actions"];

function resumeProjectSummary(staticSummary: string, detail?: PortfolioProject) {
  if (detail?.outcomes && detail.outcomes.length > 0) return detail.outcomes.join(" ");
  return detail?.summary ?? staticSummary;
}

// 이력서 = 경력 요약 + 자기소개. 홈(이력) 페이지의 내용을 문서 형식으로 재구성한다.
export default function ResumeDocument({ projects = [] }: { projects?: PortfolioProject[] } = {}) {
  const projectByName = new Map(projects.map((project) => [project.name, project]));
  const personalProjects = projects.filter((project) => project.category === "개인");

  return (
    <PdfSheet documentTitle="이력서" eyebrow="이력서" tagline resumeSheet pageIndex={1} pageTotal={1}>
      <p className="pdf-intro">{profile.summary}</p>

      <div className="pdf-metrics">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.detail}</small>
          </div>
        ))}
      </div>

      <PrintSection title={`경력 · ${profile.totalCareer}`}>
        {career.map((entry) => (
          <article key={entry.company} className="pdf-career-summary">
            <h3>
              {entry.company}{" "}
              <small>
                {entry.period} · {entry.employment} · {entry.role}
              </small>
            </h3>
            {entry.projects.map((project) => (
              <div key={project.name} className="pdf-resume-project">
                <b>{project.name}</b>
                <span>{project.period}</span>
                <p>{resumeProjectSummary(project.summary, projectByName.get(project.name))}</p>
              </div>
            ))}
          </article>
        ))}
      </PrintSection>

      <PrintSection title="개인 프로젝트">
        {personalProjects.map((project) => (
          <div key={project.id} className="pdf-resume-project">
            <b>{project.name}</b>
            <span>{project.period}</span>
            <p>{project.summary}</p>
          </div>
        ))}
      </PrintSection>

      <PrintSection title="기술 · 학력">
        <p>
          <b>핵심 기술</b> · {CORE_SKILLS.join(", ")}
        </p>
        <p>
          <b>확장 경험</b> · {EXTENDED_SKILLS.join(", ")}
        </p>
        <p className="pdf-education">
          <b>
            {education.school} · {education.major}
          </b>{" "}
          / {education.period} · {education.status}
        </p>
      </PrintSection>
    </PdfSheet>
  );
}
