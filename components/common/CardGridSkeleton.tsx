import { cn } from "@/lib/utils";

// Notion 데이터가 스트리밍되는 동안 보여줄 자리표시자 카드 그리드.
// blog/portfolio처럼 "카드 그리드" 모양을 공유하는 화면에서 재사용한다.
export default function CardGridSkeleton({
  count = 6,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
  withImage = false,
}: {
  count?: number;
  columns?: string;
  withImage?: boolean;
}) {
  return (
    <div className={cn("mx-auto grid max-w-5xl gap-5", columns)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-4xl bg-card ring-1 ring-foreground/5 dark:ring-foreground/10"
        >
          {withImage && <div className="aspect-[16/9] w-full bg-muted" />}
          <div className="flex flex-col gap-3 p-6">
            <div className="h-4 w-16 rounded-full bg-muted" />
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
