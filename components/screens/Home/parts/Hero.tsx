"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowRight, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
      {/* 배경 그라디언트 블롭 — 시각적 재미를 위한 은은한 움직임 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] size-[28rem] rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-chart-2/15 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* 하단 블롭이 overflow-hidden 경계에서 뚝 잘려 보이지 않도록 배경색으로 자연스럽게 페이드아웃
          — 절반 지점까지는 블롭 색을 그대로 유지하고, 나머지 구간에서만 배경색으로 수렴시켜 흐려 보이지 않게 한다 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent_0%,transparent_45%,var(--background)_100%)] sm:h-56"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-start">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
        >
          경력 {profile.totalCareer} · {profile.role}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
        >
          안녕하세요, <br className="sm:hidden" />
          <span className="text-primary">{profile.name}</span>입니다.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" nativeButton={false} render={<Link href="/portfolio" />}>
            포트폴리오 보기
            <IconArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            커피챗 제안하기
            <IconMail data-icon="inline-end" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
