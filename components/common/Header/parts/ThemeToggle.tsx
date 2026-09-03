"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// 마운트 여부를 state로 들고 있지 않고, 순수 CSS(dark: variant)로 아이콘을 전환해
// hydration mismatch와 effect 내 setState를 동시에 피한다.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="테마 전환"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <IconMoon className="hidden dark:block" />
      <IconSun className="block dark:hidden" />
    </Button>
  );
}
