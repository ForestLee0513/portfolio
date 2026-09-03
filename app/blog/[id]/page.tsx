import type { Metadata } from "next";
import BlogPost from "@/components/screens/BlogPost";
import { getBlogPost } from "@/api/blog/requests";

export const revalidate = 300;

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) return { title: "글을 찾을 수 없어요" };

  return {
    title: post.title,
    description: post.description || undefined,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  // 존재 여부 확인(notFound)과 실제 렌더링은 BlogPost 안의 Suspense 경계 안에서
  // 처리된다 — 여기서는 id만 넘기고 Notion 조회는 기다리지 않는다.
  return <BlogPost id={id} />;
}
