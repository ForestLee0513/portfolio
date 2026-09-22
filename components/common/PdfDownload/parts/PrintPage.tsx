import type { ReactNode } from "react";
import { profile } from "@/lib/data/profile";

function handleFromUrl(url: string) {
  return url.replace(/\/+$/, "").split("/").pop() ?? url;
}

function formatEdition(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
}

// 인쇄(=PDF 저장) 전용 문서 공통 레이아웃.
// documents/generate.mjs가 만드는 제출용 A4 문서(이력서·경력기술서·포트폴리오)와
// 동일한 마크업·클래스 구조를 그대로 옮겨, styles/globals.css의 인쇄 스타일과 짝을 이룬다.
// bg-background/text-foreground 같은 테마 토큰 대신 리터럴 색상만 쓰는 원본 CSS를 그대로
// 이식했기 때문에, 다크모드로 보고 있어도 인쇄 결과는 항상 라이트모드로 고정된다.
export default function PdfSheet({
  eyebrow,
  compact = false,
  tagline = false,
  resumeSheet = false,
  continuation = false,
  children,
}: {
  eyebrow?: string;
  compact?: boolean;
  tagline?: boolean;
  resumeSheet?: boolean;
  /** 같은 프로젝트·같은 맥락이 다음 페이지로 이어질 때(예: 스크린샷 전용 페이지) 헤더를
   *  다시 찍지 않고 바로 본문부터 자연스럽게 이어지도록 한다. */
  continuation?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`pdf-sheet${resumeSheet ? " pdf-resume-sheet" : ""}`}>
      {!continuation && (
        <header className={compact ? "pdf-compact" : ""}>
          <div className="pdf-eyebrow">WOOLIM LEE / {eyebrow}</div>
          <div className="pdf-heading">
            <h1>
              {profile.name} <span>{profile.role}</span>
            </h1>
            <span className="pdf-edition">{formatEdition(new Date())}</span>
          </div>
          {tagline && <p className="pdf-tagline">{profile.tagline}</p>}
          <div className="pdf-contact">
            <a href={profile.links.email}>{profile.email}</a>
            <span>{profile.phone.replace("+82 ", "0")}</span>
            <a href={profile.links.github}>
              GitHub / {handleFromUrl(profile.links.github)}
            </a>
            <a href={profile.links.linkedin}>
              LinkedIn / {handleFromUrl(profile.links.linkedin)}
            </a>
          </div>
        </header>
      )}

      {children}
    </article>
  );
}

export function PrintSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
