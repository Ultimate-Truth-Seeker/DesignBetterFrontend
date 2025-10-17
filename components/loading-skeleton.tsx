import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />
}

export function TemplateCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <LoadingSkeleton className="mb-3 h-48 w-full" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <LoadingSkeleton className="h-6 w-16" />
          <LoadingSkeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export function TemplateGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <TemplateCardSkeleton key={i} />
      ))}
    </div>
  )
}
