import { PageHeader } from "@/components/page-header"
import { TemplateGridSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Mis Plantillas" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <TemplateGridSkeleton count={6} />
      </div>
    </div>
  )
}
