"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/providers/ThemeProvider";

// UI 전역 프로바이더를 한곳에서 조합한다.
// ThemeProvider(next-themes)가 바깥, shadcn Tooltip용 TooltipProvider가 안쪽.
// 서버 상태(QueryProvider)·인증(AuthProvider) 등 다른 프로바이더는
// AGENTS.md 규칙대로 각각 별도 파일로 만들고 여기서 순서에 맞춰 감싼다.
export default function UIProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
