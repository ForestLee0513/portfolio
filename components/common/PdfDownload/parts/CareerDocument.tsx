import { career, profile } from "@/lib/data/profile";
import PrintPage, { PrintSection } from "./PrintPage";

// 경력기술서 = 회사·프로젝트 단위로 담당 업무를 상세히 풀어 쓴 문서.
// 이력서와 같은 career 데이터를 쓰되, 요약이 아닌 프로젝트별 상세 카드 형식으로 구성한다.
export default function CareerDocument() {
  return (
    <PrintPage documentTitle="Career Description">
      <p className="text-sm leading-6 text-neutral-700">
        총 경력 {profile.totalCareer}, {profile.role}로 근무하며 아래 프로젝트들을
        수행했습니다.
      </p>

      {career.map((entry) => (
        <PrintSection
          key={entry.company}
          title={`${entry.company} · ${entry.period}`}
        >
          <p className="text-xs text-neutral-500">
            {entry.employment} · {entry.role}
            {entry.current && " · 재직중"}
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {entry.projects.map((project) => (
              <div
                key={project.name}
                className="break-inside-avoid rounded-lg border border-neutral-200 p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="text-sm font-bold text-neutral-900">
                    {project.name}
                  </h4>
                  <span className="text-xs text-neutral-500">
                    {project.period}
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium tracking-wide text-emerald-700 uppercase">
                  담당 업무
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-600">
                  {project.summary}
                </p>
              </div>
            ))}
          </div>
        </PrintSection>
      ))}
    </PrintPage>
  );
}
