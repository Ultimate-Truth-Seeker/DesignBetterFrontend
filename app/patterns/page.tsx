"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PatternAPI } from "@/lib/pattern-api"
import type { Pattern } from "@/types/pattern"
import { PatternCard } from "@/components/pattern-card"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function PatternsPage() {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [filteredPatterns, setFilteredPatterns] = useState<Pattern[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all")

  useEffect(() => {
    loadPatterns()
  }, [])

  useEffect(() => {
    filterPatterns()
  }, [patterns, searchQuery, statusFilter])

  const loadPatterns = async () => {
    setIsLoading(true)
    try {
      const data = await PatternAPI.getPatterns()
      setPatterns(data)
    } catch (error) {
      console.error("Failed to load patterns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPatterns = () => {
    let filtered = patterns

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      )
    }

    setFilteredPatterns(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este patrón?")) return

    try {
      await PatternAPI.deletePattern(id)
      setPatterns((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Failed to delete pattern:", error)
    }
  }

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await PatternAPI.duplicatePattern(id)
      setPatterns((prev) => [duplicated, ...prev])
    } catch (error) {
      console.error("Failed to duplicate pattern:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Mis Patrones" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar patrones por nombre, código o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              onClick={() => setStatusFilter("draft")}
              size="sm"
            >
              Borradores
            </Button>
            <Button
              variant={statusFilter === "published" ? "default" : "outline"}
              onClick={() => setStatusFilter("published")}
              size="sm"
            >
              Publicados
            </Button>
            <Button
              variant={statusFilter === "archived" ? "default" : "outline"}
              onClick={() => setStatusFilter("archived")}
              size="sm"
            >
              Archivados
            </Button>
          </div>

          <Link href="/crear-patron">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Patrón
            </Button>
          </Link>
        </div>

        {/* Patterns Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-64" />
            ))}
          </div>
        ) : filteredPatterns.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all"
                ? "No se encontraron patrones con los filtros aplicados"
                : "No tienes patrones creados aún"}
            </div>
            <Link href="/crear-patron">
              <Button>Crear tu primer patrón</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} onDelete={handleDelete} onDuplicate={handleDuplicate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
