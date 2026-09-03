export default function BlogPostSkeleton() {
  return (
    <div className="mt-6 animate-pulse" aria-hidden>
      <div className="h-5 w-24 rounded-full bg-muted" />
      <div className="mt-4 h-9 w-3/4 rounded bg-muted" />
      <div className="mt-3 h-4 w-32 rounded bg-muted" />
      <div className="mt-8 aspect-video w-full rounded-3xl bg-muted" />
      <div className="mt-10 flex flex-col gap-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}
