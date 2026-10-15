"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export default function CodeBlock({ children }: { children?: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  useEffect(() => {
    if (status !== "copied" && status !== "error") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copyCode() {
    if (!preRef.current) return;
    setStatus("copying");
    try {
      // 하이라이팅 태그를 제외하고 공백과 줄바꿈을 포함한 코드만 복사한다.
      await navigator.clipboard.writeText(preRef.current.textContent ?? "");
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const label = status === "copied" ? "복사 완료" : status === "error" ? "복사 실패" : status === "copying" ? "복사 중" : "복사";

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl bg-[#1e1e1e] text-zinc-100">
      <button
        type="button"
        onClick={copyCode}
        disabled={status === "copying"}
        aria-label="코드 클립보드에 복사"
        className="absolute top-2 right-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300 disabled:opacity-50"
      >
        {status === "copied" ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}
        <span aria-hidden="true">{label}</span>
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? "코드가 클립보드에 복사되었습니다." : status === "error" ? "코드를 복사하지 못했습니다. 다시 시도해 주세요." : ""}
      </span>
      <pre ref={preRef} className="overflow-x-auto p-4 pt-12 font-mono text-sm leading-6">
        {children}
      </pre>
    </div>
  );
}
