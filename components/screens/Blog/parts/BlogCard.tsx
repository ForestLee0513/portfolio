"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { BlogPostSummary } from "@/api/blog/types";

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({
  post,
  index,
}: {
  post: BlogPostSummary;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/blog/${post.id}`}
        className="flex h-full flex-col overflow-hidden rounded-4xl bg-card shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg dark:ring-foreground/10"
      >
        {post.cover && (
          <div className="relative aspect-[16/9] w-full bg-muted">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-6">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="h-auto px-2 py-0.5 text-[11px]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {post.title}
          </h3>
          {post.description && (
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {post.description}
            </p>
          )}
          {post.date && (
            <p className="mt-auto pt-2 text-xs text-muted-foreground">
              {formatDate(post.date)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
