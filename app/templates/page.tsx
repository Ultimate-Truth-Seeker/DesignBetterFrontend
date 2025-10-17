"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { templateApi } from "@/lib/template-api"
import type { DesignerTemplate } from "@/types/designer-template"
import { DesignerTemplateCard } from "@/components/designer-template-card"
import { PageHeader } from "@/components/page-header"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<DesignerTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<DesignerTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    filterTemplates()
  }, [templates, searchQuery, statusFilter])

  const loadTemplates = async () => {
    setIsLoading(true)
    try {
      const data = await templateApi.fetchTemplates()
      setTemplates(data)
    } catch (error) {
      console.error("Error loading templates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTemplates = () => {
    let filtered = templates

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((template) => template.status === statusFilter)
    }

    setFilteredTemplates(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta plantilla?")) return

    try {
      await templateApi.deleteTemplate(id)
      setTemplates(templates.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Error deleting template:", error)
    }
  }

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await templateApi.duplicateTemplate(id)
      setTemplates([duplicated, ...templates])
    } catch (error) {
      console.error("Error duplicating template:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Mis Plantillas" />
        <div className="mx-auto max-w-7xl px-4 py-8">
          <LoadingSkeleton count={6} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Mis Plantillas" />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar plantillas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Archivado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Create Button */}
          <Link href="/templates/crear-plantilla">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Plantilla
            </Button>
          </Link>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center">
            <p className="mb-4 text-lg font-medium text-muted-foreground">
              {searchQuery || statusFilter !== "all" ? "No se encontraron plantillas" : "No tienes plantillas creadas"}
            </p>
            <Link href="/templates/crear-plantilla">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primera Plantilla
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <DesignerTemplateCard
                key={template.id}
                template={template}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
          <span>Total: {templates.length}</span>
          <span>Publicadas: {templates.filter((t) => t.status === "published").length}</span>
          <span>Borradores: {templates.filter((t) => t.status === "draft").length}</span>
        </div>
      </div>
    </div>
  )
}
