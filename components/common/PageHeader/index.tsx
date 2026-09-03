import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Skills/Portfolio/Contact/Blog 등 서브 페이지가 공유하는 상단 타이틀 영역.
export default function PageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn(" px-5 pt-16 pb-4 sm:px-8 sm:pt-24", className)}>
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
