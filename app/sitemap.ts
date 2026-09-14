import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/api/blog/requests";
import { siteUrl } from "@/lib/site-url";

// 정적 라우트 — 새 페이지가 추가되면 여기에도 같이 등록한다.
const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteUrl, changeFrequency: "monthly", priority: 1 },
  { url: `${siteUrl}/skills`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
];

// Notion에서 발행된 글 목록을 읽어 /blog/[id] 라우트를 동적으로 채운다.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: post.date ?? undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
