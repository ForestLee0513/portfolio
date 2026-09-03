import Link from "next/link";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";
import NavLinks from "./parts/NavLinks";
import MobileNav from "./parts/MobileNav";
import ThemeToggle from "./parts/ThemeToggle";

// 모든 라우트에서 공유하는 상단 내비게이션. 서버 컴포넌트로 두고
// 상태가 필요한 조각(NavLinks/MobileNav/ThemeToggle)만 클라이언트로 분리한다.
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-heading text-base font-semibold tracking-tight text-foreground"
        >
          {profile.name}
          <span className="ml-2 hidden text-sm font-normal text-muted-foreground sm:inline">
            {profile.role}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLinks />
          <div className="mx-1 h-5 w-px bg-border" />
          <ThemeToggle />
          <Button size="sm" nativeButton={false} render={<Link href="/contact" />}>
            커피챗 제안하기
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
