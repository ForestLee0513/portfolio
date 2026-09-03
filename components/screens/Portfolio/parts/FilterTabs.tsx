"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FILTERS = ["전체", "회사", "개인"] as const;
export type Filter = (typeof FILTERS)[number];

export default function FilterTabs({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (value: Filter) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1">
      {FILTERS.map((filter) => {
        const active = value === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="portfolio-filter-pill"
                className="absolute inset-0 rounded-full bg-background shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </button>
        );
      })}
    </div>
  );
}
