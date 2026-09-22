import type { PortfolioProject, PortfolioScreenshot } from "@/api/portfolio/types";
import PdfSheet, { PrintSection } from "./PrintPage";
import PdfProjectIntro from "./PdfProjectIntro";

// 본문 페이지에는 스크린샷을 최대 3장만 같이 싣는다 — 그 이상은 텍스트만으로도 이미 페이지가
// 꽉 차서(overflow: hidden에 잘리지 않도록) 원본 포트폴리오 PDF와 같은 방식으로 별도
// 스크린샷 전용 페이지로 넘긴다.
const INLINE_SCREENSHOT_LIMIT = 3;
const CONTINUATION_PAGE_SIZE = 4;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function ScreenshotGrid({
  screenshots,
  columns = 3,
}: {
  screenshots: PortfolioScreenshot[];
  columns?: 2 | 3;
}) {
  return (
    <div className={`pdf-screenshots${columns === 2 ? " pdf-screenshots-2col" : ""}`}>
      {screenshots.map((shot) => (
        <figure key={shot.url}>
          {/* eslint-disable-next-line @next/next/no-img-element -- 인쇄 전용 정적 렌더라 next/image 최적화가 필요 없다 */}
          <img src={shot.url} alt={shot.caption} />
          {shot.caption && <figcaption>{shot.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function ProjectResult({ project }: { project: PortfolioProject }) {
  return (
    <>
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
    </>
  );
}

type PortfolioPage =
  | { kind: "project"; project: PortfolioProject; screenshots: PortfolioScreenshot[]; result: boolean }
  | { kind: "continuation"; project: PortfolioProject; screenshots: PortfolioScreenshot[]; result: boolean };

// 포트폴리오 페이지에서 실제로 렌더링된(=필터 적용 전 전체) 프로젝트 목록을 그대로 문서화한다.
// 프로젝트 1건당 A4 한 페이지가 기본이다. 스크린샷이 있는 프로젝트는 표제부·해결 과제·주요
// 구현·스크린샷(최대 3장)까지만 첫 페이지에 담고, 결과·기여·사용 기술·링크와 나머지 스크린샷은
// 원본 포트폴리오 PDF와 같은 방식으로 헤더 없는 다음 페이지로 이어서 보여준다 — 첫 페이지에
// 전부 욱여넣으면(overflow: hidden에 의해) 내용이 페이지 경계에서 잘리기 때문이다.
export default function PortfolioDocument({ projects }: { projects: PortfolioProject[] }) {
  const pages: PortfolioPage[] = projects.flatMap((project) => {
    const shots = project.screenshots ?? [];
    if (shots.length === 0) {
      return [{ kind: "project", project, screenshots: [], result: true }];
    }

    const inline = shots.slice(0, INLINE_SCREENSHOT_LIMIT);
    const overflow = shots.slice(INLINE_SCREENSHOT_LIMIT);
    const overflowPages = chunk(overflow, CONTINUATION_PAGE_SIZE);

    return [
      { kind: "project", project, screenshots: inline, result: false },
      // 결과·기여 등은 스크린샷이 없어도(overflow가 비어도) 항상 마지막 이어지는 페이지에 싣는다.
      ...(overflowPages.length > 0 ? overflowPages : [[]]).map(
        (group, i, arr): PortfolioPage => ({
          kind: "continuation",
          project,
          screenshots: group,
          result: i === arr.length - 1,
        })
      ),
    ];
  });

  return (
    <>
      {pages.map((page, index) => {
        if (page.kind === "continuation") {
          return (
            <PdfSheet key={`${page.project.id}-continuation-${index}`} continuation>
              {page.screenshots.length > 0 && (
                <ScreenshotGrid screenshots={page.screenshots} columns={2} />
              )}
              {page.result && <ProjectResult project={page.project} />}
            </PdfSheet>
          );
        }

        const project = page.project;
        const projectIndex = projects.indexOf(project);
        const eyebrow = `포트폴리오 · ${String(projectIndex + 1).padStart(2, "0")}`;
        return (
          <PdfSheet key={project.id} eyebrow={eyebrow} compact>
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

            {page.screenshots.length > 0 && <ScreenshotGrid screenshots={page.screenshots} />}

            {page.result && <ProjectResult project={project} />}
          </PdfSheet>
        );
      })}
    </>
  );
}
