export default function PersonalizarTemplateLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
          <div className="flex gap-4 mt-6">
            <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  )
}