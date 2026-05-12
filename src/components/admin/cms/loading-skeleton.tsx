export function CmsCardSkeleton() {
  return (
    <div className="block p-6 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-neutral-800" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-neutral-800 rounded w-1/2" />
          <div className="h-3 bg-neutral-800 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}
