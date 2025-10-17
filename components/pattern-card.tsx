"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Pattern } from "@/types/pattern"
import { Edit, MoreVertical, Copy, Trash2 } from "lucide-react"
import Link from "next/link"

interface PatternCardProps {
  pattern: Pattern
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function PatternCard({ pattern, onDelete, onDuplicate }: PatternCardProps) {
  const statusColors = {
    draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    published: "bg-green-500/10 text-green-700 dark:text-green-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  const categoryLabels = {
    shirt: "Camisa",
    pants: "Pantalón",
    dress: "Vestido",
    jacket: "Chaqueta",
    skirt: "Falda",
    other: "Otro",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{pattern.name}</h3>
            <p className="text-sm text-muted-foreground">{pattern.code}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/crear-patron?id=${pattern.id}`} className="cursor-pointer">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(pattern.id!)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(pattern.id!)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        {pattern.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pattern.description}</p>
        )}

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Categoría:</span>
            <span className="text-foreground">{categoryLabels[pattern.category]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Versión:</span>
            <span className="text-foreground">v{pattern.version}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Piezas:</span>
            <span className="text-foreground">{pattern.pieces?.length || 0}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Parámetros:</span>
            <span className="text-foreground">{Object.keys(pattern.params_schema?.properties || {}).length}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <Badge className={statusColors[pattern.status]}>
            {pattern.status === "draft" && "Borrador"}
            {pattern.status === "published" && "Publicado"}
            {pattern.status === "archived" && "Archivado"}
          </Badge>

          <Link href={`/patterns/crear-patron?id=${pattern.id}`}>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-3 w-3" />
              Editar
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
