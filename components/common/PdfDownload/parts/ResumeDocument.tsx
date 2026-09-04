import { career, education, profile } from "@/lib/data/profile";
import PrintPage, { PrintSection } from "./PrintPage";

// 이력서 = 경력 요약 + 자기소개. 홈(이력) 페이지의 내용을 문서 형식으로 재구성한다.
export default function ResumeDocument() {
  return (
    <PrintPage documentTitle="Resume">
      <PrintSection title="자기소개">
        <p className="text-sm leading-6 text-neutral-700">{profile.summary}</p>
      </PrintSection>

      <PrintSection title="핵심 역량">
        <div className="grid grid-cols-3 gap-4">
          {profile.highlights.map((highlight) => (
            <div key={highlight.title}>
              <p className="text-sm font-semibold text-neutral-900">
                {highlight.title}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </PrintSection>

      <PrintSection title={`경력 사항 (총 ${profile.totalCareer})`}>
        <div className="flex flex-col gap-5">
          {career.map((entry) => (
            <div key={entry.company} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-bold text-neutral-900">
                  {entry.company}
                  {entry.current && (
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      재직중
                    </span>
                  )}
                </h3>
                <span className="text-xs text-neutral-500">
                  {entry.period} · {entry.employment} · {entry.role}
                </span>
              </div>

              <ul className="mt-2.5 flex flex-col gap-2">
                {entry.projects.map((project) => (
                  <li key={project.name} className="text-xs leading-5 text-neutral-600">
                    <span className="font-medium text-neutral-800">
                      {project.name}
                    </span>
                    <span className="text-neutral-400"> · {project.period}</span>
                    <br />
                    {project.summary}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PrintSection>

      <PrintSection title="학력">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-sm font-bold text-neutral-900">
            {education.school} · {education.major}
          </h3>
          <span className="text-xs text-neutral-500">
            {education.period} · {education.status}
          </span>
        </div>
        <p className="mt-2 text-xs leading-5 text-neutral-600">
          {education.description}
        </p>
      </PrintSection>

      <PrintSection title="주요 성과 지표">
        <div className="grid grid-cols-4 gap-4">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-bold text-emerald-700">{stat.value}</p>
              <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </PrintSection>
    </PrintPage>
  );
}
