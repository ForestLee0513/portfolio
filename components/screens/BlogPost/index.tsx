import { Suspense } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import BlogPostContent from "./parts/BlogPostContent";
import BlogPostSkeleton from "./parts/BlogPostSkeleton";

// "블로그 목록" 링크는 Notion 조회 없이 그릴 수 있어 즉시 렌더링되고,
// 본문(BlogPostContent)만 Suspense 뒤에서 스트리밍된다.
export default function BlogPost({ id }: { id: string }) {
  return (
    <article className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <IconArrowLeft size={16} />
          블로그 목록
        </Link>

        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostContent id={id} />
        </Suspense>
      </div>
    </article>
  );
}
