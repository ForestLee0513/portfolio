import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const post = await getBlogPost(id);
  if (!post) notFound();

  return <BlogPost post={post} />;
}
