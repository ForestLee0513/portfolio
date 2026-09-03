import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPostDetail } from "@/api/blog/types";
import MarkdownContent from "./parts/MarkdownContent";

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost({ post }: { post: BlogPostDetail }) {
  const formattedDate = formatDate(post.date);

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
      </div>
    </article>
  );
}
