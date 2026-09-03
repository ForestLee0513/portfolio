import PageHeader from "@/components/common/PageHeader";
import type { BlogPostSummary } from "@/api/blog/types";
import BlogCard from "./parts/BlogCard";

export default function Blog({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="개발하며 정리한 생각들"
        description="Notion에 정리한 글을 그대로 이어서 보여줍니다."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        {posts.length === 0 ? (
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 rounded-4xl border border-dashed border-border py-24 text-center">
            <p className="font-medium text-foreground">아직 게시된 글이 없어요</p>
            <p className="text-sm text-muted-foreground">
              Notion 페이지에 글을 추가하면 이곳에 자동으로 표시됩니다.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
