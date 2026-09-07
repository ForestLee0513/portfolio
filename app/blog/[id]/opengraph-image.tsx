import { getBlogPost } from "@/api/blog/requests";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Blog Post";
export const size = ogImageSize;
export const contentType = ogImageContentType;

type ImageProps = { params: Promise<{ id: string }> };

// 블로그 상세 페이지(BlogPostContent)와 동일한 날짜 표기 형식으로 맞춘다.
function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Image({ params }: ImageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  const description = post
    ? [formatDate(post.date), post.description || undefined].filter(Boolean).join(" · ")
    : undefined;

  return renderOgImage({
    title: post?.title ?? "글을 찾을 수 없어요",
    description: description || undefined,
  });
}
