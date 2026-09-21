export default function PortfolioProjectSkeleton() {
  return (
    <div className="mt-6 animate-pulse" aria-hidden>
      <div className="h-5 w-32 rounded-full bg-muted" />
      <div className="mt-4 h-9 w-3/4 rounded bg-muted" />
      <div className="mt-3 h-4 w-40 rounded bg-muted" />
      <div className="mt-6 flex flex-col gap-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}
