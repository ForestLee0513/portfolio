"use client";

import type { ComponentType } from "react";
import { motion } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  index,
  onClick,
}: {
  icon: ComponentType<{ size?: number }>;
  title: string;
  value: string;
  href?: string;
  index: number;
  onClick?: () => void;
}) {
  const content = (
    <>
      <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </p>
        <p className="mt-0.5 truncate font-medium text-foreground">{value}</p>
      </div>
      <IconArrowUpRight
        size={18}
        className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </>
  );

  const className =
    "group flex w-full items-center gap-4 rounded-3xl bg-card p-5 text-left shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-lg dark:ring-foreground/10";

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay: index * 0.06 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={className}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
