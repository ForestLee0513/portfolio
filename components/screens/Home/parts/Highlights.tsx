"use client";

import { motion } from "motion/react";
import { IconBolt, IconRocket, IconStack2 } from "@tabler/icons-react";
import { profile } from "@/lib/data/profile";

const ICONS = [IconBolt, IconRocket, IconStack2];

export default function Highlights() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          문제의 원인까지 파고드는 개발자
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {profile.highlights.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-4xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10"
              >
                <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
