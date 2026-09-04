"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { career, education } from "@/lib/data/profile";

export default function Career() {
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
          경력 사항
        </motion.h2>

        {/*
          점(dot)과 세로선을 같은 grid 컬럼(col-start-1) 안에 두고 justify-self-center로만
          정렬한다. 두 요소가 같은 컬럼의 자동 계산된 너비를 기준으로 가운데 정렬되므로
          화면 크기별로 다른 px 값을 맞춰줄 필요가 없다 — 컬럼 폭이 바뀌어도 항상 일치한다.
        */}
        <div className="mt-10 grid grid-cols-[auto_1fr] gap-x-4 gap-y-10 sm:gap-x-6">
          <div
            className="col-start-1 row-start-1 my-2 w-px justify-self-center self-stretch bg-border"
            style={{ gridRowEnd: career.length + 1 }}
          />

          {career.map((entry, entryIndex) => (
            <Fragment key={entry.company}>
              {/*
                dot은 폭이 14px뿐이라 whileInView의 margin이 가로축에도 동일하게 적용되면
                화면 가장자리 근처에서는 "뷰포트 안"으로 절대 인식되지 않는 문제가 있었다.
                옆의 content가 이미 같은 타이밍에 페이드인되므로 dot은 애니메이션 없이 둔다.
              */}
              <span
                style={{ gridRowStart: entryIndex + 1 }}
                className="col-start-1 mt-1.5 size-3.5 justify-self-center self-start rounded-full border-2 border-background bg-primary"
              />

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: entryIndex * 0.08 }}
                className="col-start-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {entry.company}
                  </h3>
                  {entry.current && <Badge>재직중</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.period} · {entry.employment} · {entry.role}
                </p>

                <div className="mt-5 flex flex-col gap-4">
                  {entry.projects.map((project) => (
                    <div
                      key={project.name}
                      className="rounded-3xl bg-card p-5 ring-1 ring-foreground/5 dark:ring-foreground/10"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="font-medium text-foreground">
                          {project.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {project.period}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mt-12 rounded-3xl border border-dashed border-border p-6"
        >
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            학력
          </p>
          <h3 className="mt-2 font-heading text-base font-semibold text-foreground">
            {education.school} · {education.major}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {education.period} · {education.status}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {education.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
