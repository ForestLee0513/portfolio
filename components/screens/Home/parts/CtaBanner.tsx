"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="px-5 pb-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-5xl flex-col items-start gap-5 rounded-4xl bg-primary px-8 py-12 text-primary-foreground sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">함께 일해볼까요?</h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            커피챗이나 면접 제안, 협업 문의 모두 환영합니다.
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={<Link href="/contact" />}
          className="shrink-0"
        >
          연락하기
          <IconArrowRight data-icon="inline-end" />
        </Button>
      </motion.div>
    </section>
  );
}
