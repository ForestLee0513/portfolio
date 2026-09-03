import { getBlogPosts } from "@/api/blog/requests";
import BlogCard from "./BlogCard";

// Notion 조회를 포함하는 부분만 별도 서버 컴포넌트로 분리해 Suspense 경계 안에 둔다.
// 덕분에 페이지 헤더는 즉시 렌더링되고, 이 컴포넌트만 스트리밍으로 늦게 채워진다.
export default async function BlogPostList() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 rounded-4xl border border-dashed border-border py-24 text-center">
        <p className="font-medium text-foreground">아직 게시된 글이 없어요</p>
        <p className="text-sm text-muted-foreground">
          Notion 페이지에 글을 추가하면 이곳에 자동으로 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
