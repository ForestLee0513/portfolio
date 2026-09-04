import type { ReactNode } from "react";
import { profile } from "@/lib/data/profile";

// 인쇄(=PDF 저장) 전용 문서 공통 레이아웃.
// bg-background/text-foreground 같은 테마 토큰 대신 리터럴 색상만 사용해,
// 다크모드로 보고 있어도 인쇄 결과는 항상 라이트모드로 고정되게 한다.
export default function PrintPage({
  documentTitle,
  children,
}: {
  documentTitle: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-white text-neutral-900">
      <header className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-5">
        <div>
          <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            {documentTitle}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">
            {profile.name}
            <span className="ml-2 text-base font-normal text-neutral-500">
              {profile.role}
            </span>
          </h1>
          <p className="mt-1 text-sm text-neutral-500">{profile.tagline}</p>
        </div>
        <ul className="shrink-0 space-y-1 text-right text-xs text-neutral-500">
          <li>{profile.email}</li>
          <li>{profile.phone}</li>
          <li>{profile.links.github.replace("https://", "")}</li>
          <li>{profile.links.linkedin.replace("https://", "")}</li>
        </ul>
      </header>

      <div className="mt-6 space-y-8 pb-4">{children}</div>
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
  // section 전체에 break-inside-avoid를 걸면, 프로젝트 카드가 여러 개라 한 페이지를
  // 넘는 순간 섹션 전체가 다음 페이지로 밀려 첫 페이지가 타이틀만 남고 비어 보인다.
  // 제목만 페이지 맨 아래 홀로 남지 않도록 break-after-avoid만 제목에 걸고,
  // 내용은 자연스럽게 페이지에 걸쳐 흐르게 둔다.
  return (
    <section>
      <h2 className="break-after-avoid text-sm font-bold tracking-wide text-neutral-900 uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
