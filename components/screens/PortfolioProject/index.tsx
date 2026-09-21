import { Suspense } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import PortfolioProjectContent from "./parts/PortfolioProjectContent";
import PortfolioProjectSkeleton from "./parts/PortfolioProjectSkeleton";

// BlogPost와 동일한 구조 — "포트폴리오 목록" 링크는 즉시 렌더링되고,
// 본문(PortfolioProjectContent)만 Suspense 뒤에서 스트리밍된다.
export default function PortfolioProject({ id }: { id: string }) {
  return (
    <article className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <IconArrowLeft size={16} />
          포트폴리오 목록
        </Link>

        <Suspense fallback={<PortfolioProjectSkeleton />}>
          <PortfolioProjectContent id={id} />
        </Suspense>
      </div>
    </article>
  );
}
