"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/lib/data/skills";

export default function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      whileHover={{ y: -4 }}
      className="rounded-4xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg dark:ring-foreground/10"
    >
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-primary" />
        <h3 className="font-heading text-base font-semibold text-foreground">
          {category.title}
        </h3>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {category.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <Badge key={item} variant="secondary" className="h-auto px-2.5 py-1">
            {item}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
