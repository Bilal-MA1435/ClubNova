function SkeletonCard() {
  return (
    <div className="surface animate-pulse p-6">
      <div className="h-4 w-24 rounded bg-slate-200" />
      <div className="mt-4 h-8 w-3/4 rounded bg-slate-200" />
      <div className="mt-6 space-y-3">
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="shell py-12">
      <div className="space-y-6">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-16 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  );
}
