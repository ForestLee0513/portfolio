import { career as staticCareer } from "@/lib/data/profile";
import type { PortfolioProject } from "@/api/portfolio/types";
import PdfSheet, { PrintSection } from "./PrintPage";
import CareerProjectDetails from "./CareerProjectDetails";

// 구조화된 프로젝트 데이터에는 없는 보충 설명을 프로젝트 id로 매핑해 둔다.
// (에이전시 경력의 결제 경험 중 현재 저장소로는 확인되지 않는 항목)
const EXTRA_NOTES: Record<string, { title: string; body: string }> = {
  "3d0476670563811787cfdba65f557134": {
    title: "추가 결제 경험",
    body: "에이전시 업무에서 Bootpay 결제 템플릿과 react-native-iap 기반 인앱결제·구독 라이프사이클을 개발한 경험이 있습니다.",
  },
};

// 회사별 프로젝트를 한 페이지에 둘씩(dense) 묶고, 홀로 남는 프로젝트는 온전한 크기로 보여준다.
function chunkPairs<T>(items: T[]): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += 2) pages.push(items.slice(i, i + 2));
  return pages;
}

function periodStart(period: string) {
  return period.split("-")[0]?.trim() ?? period;
}

type CareerPage =
  | { kind: "company"; company: string; group: PortfolioProject[] }
  | { kind: "personal"; project: PortfolioProject };

// 경력기술서 = 회사·프로젝트 단위로 담당 업무를 상세히 풀어 쓴 문서.
// documents/generate.mjs 제출용 경력기술서와 동일한 페이지 구성(회사별 2건 묶음 + 개인 프로젝트 단독 페이지)을 따른다.
export default function CareerDocument({ projects }: { projects: PortfolioProject[] }) {
  const detailByName = new Map(projects.map((project) => [project.name, project]));
  const career = staticCareer.map((entry) => ({
    ...entry,
    projects: entry.projects.map((project) => detailByName.get(project.name) ?? project),
  }));
  const personalProjects = projects
    .filter((project) => project.category === "개인")
    .sort((a, b) => periodStart(a.period).localeCompare(periodStart(b.period)));

  const pages: CareerPage[] = [];
  for (const entry of career) {
    for (const group of chunkPairs(entry.projects)) {
      pages.push({ kind: "company", company: entry.company, group });
    }
  }
  for (const project of personalProjects) {
    pages.push({ kind: "personal", project });
  }

  return (
    <>
      {pages.map((page, index) => (
        <PdfSheet
          key={page.kind === "company" ? `${page.company}-${page.group[0]?.id}` : page.project.id}
          documentTitle="경력기술서"
          eyebrow={page.kind === "company" ? `경력기술서 · ${page.company}` : "경력기술서 · 개인 프로젝트"}
          compact
          pageIndex={index + 1}
          pageTotal={pages.length}
        >
          {page.kind === "personal" && (
            <article className="pdf-project">
              <CareerProjectDetails project={page.project} />
            </article>
          )}

          {page.kind === "company" && page.group.length > 1 && (
            <div className="pdf-pair">
              {page.group.map((project) => (
                <article key={project.id} className="pdf-project pdf-dense">
                  <CareerProjectDetails project={project} />
                </article>
              ))}
            </div>
          )}

          {page.kind === "company" && page.group.length === 1 && (
            <>
              <article className="pdf-project">
                <CareerProjectDetails project={page.group[0]} />
              </article>
              {EXTRA_NOTES[page.group[0].id] && (
                <PrintSection title={EXTRA_NOTES[page.group[0].id].title}>
                  <p>{EXTRA_NOTES[page.group[0].id].body}</p>
                </PrintSection>
              )}
            </>
          )}
        </PdfSheet>
      ))}
    </>
  );
}
