import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getBlogPost } from "@/api/blog/requests";
import MarkdownContent from "./MarkdownContent";

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Notion 조회를 포함하는 부분만 별도 서버 컴포넌트로 분리해 Suspense 경계 안에 둔다.
// "블로그 목록" 링크 등 정적인 부분은 상위(index.tsx)가 즉시 렌더링한다.
export default async function BlogPostContent({ id }: { id: string }) {
  const post = await getBlogPost(id);
  if (!post) notFound();

  const formattedDate = formatDate(post.date);

  return (
    <>
      <header className="mt-6">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        {formattedDate && (
          <p className="mt-3 text-sm text-muted-foreground">{formattedDate}</p>
        )}
      </header>

      {post.cover && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl bg-muted">
          <Image src={post.cover} alt={post.title} fill className="object-cover" unoptimized />
        </div>
      )}

      <div className="mt-10">
        <MarkdownContent markdown={post.markdown} />
      </div>
    </>
  );
}
