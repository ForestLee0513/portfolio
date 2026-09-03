"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data/profile";

export default function Stats() {
  return (
    <section className="px-5 sm:px-8 pt-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {profile.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="rounded-3xl bg-card p-5 ring-1 ring-foreground/5 dark:ring-foreground/10"
          >
            <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {stat.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
