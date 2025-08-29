export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-muted lg:h-[500px]"></div>
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted"></div>
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
