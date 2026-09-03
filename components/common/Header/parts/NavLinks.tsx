"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/", label: "이력" },
  { href: "/skills", label: "Skills" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [pillRect, setPillRect] = useState<{ left: number; width: number } | null>(null);

  // 헤더가 sticky인 상태에서 페이지 전환이 일어나면, framer-motion의 layoutId 공유
  // 애니메이션이 스크롤/sticky 경계와 맞물려 pill이 엉뚱한 항목으로 튀는 문제가 있었다.
  // 매 프레임 레이아웃을 재측정하는 방식 대신, 경로가 바뀔 때 한 번만 활성 링크의
  // 위치를 읽어와 순수 CSS transition으로만 이동시키면 스크롤/전환 타이밍과 무관해진다.
  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeLink) {
      setPillRect(null);
      return;
    }
    setPillRect({ left: activeLink.offsetLeft, width: activeLink.offsetWidth });
  }, [pathname]);

  return (
    <nav ref={navRef} className={cn("relative flex items-center gap-1", className)}>
      {pillRect && (
        <span
          aria-hidden
          className="absolute top-0 h-full rounded-full bg-secondary transition-[left,width] duration-300 ease-out"
          style={{ left: pillRect.left, width: pillRect.width }}
        />
      )}
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={active}
            onClick={onNavigate}
            className={cn(
              "relative z-10 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              active && "text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
