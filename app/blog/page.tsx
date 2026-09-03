import type { Metadata } from "next";
import Blog from "@/components/screens/Blog";
import { getBlogPosts } from "@/api/blog/requests";

export const metadata: Metadata = { title: "Blog" };

// 재검증 주기 — Notion에 새 글을 올리면 최대 이만큼 후 반영된다.
export const revalidate = 300;

export default async function Page() {
  const posts = await getBlogPosts();
  return <Blog posts={posts} />;
}
