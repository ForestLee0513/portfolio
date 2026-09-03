import type { Metadata } from "next";
import { Suspense } from "react";
import Blog from "@/components/screens/Blog";
import BlogPostList from "@/components/screens/Blog/parts/BlogPostList";
import CardGridSkeleton from "@/components/common/CardGridSkeleton";

export const metadata: Metadata = { title: "Blog" };

// 재검증 주기 — Notion에 새 글을 올리면 최대 이만큼 후 반영된다.
export const revalidate = 300;

export default function Page() {
  // Blog(헤더)는 즉시 렌더링되고, BlogPostList의 Notion 조회만 Suspense 뒤에서 스트리밍된다.
  return (
    <Blog>
      <Suspense fallback={<CardGridSkeleton withImage />}>
        <BlogPostList />
      </Suspense>
    </Blog>
  );
}
