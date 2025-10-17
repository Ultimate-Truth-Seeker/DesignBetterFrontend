"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Copy, Trash2, Eye } from "lucide-react"
import type { DesignerTemplate } from "@/types/designer-template"
import Link from "next/link"
import Image from "next/image"

interface DesignerTemplateCardProps {
  template: DesignerTemplate
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function DesignerTemplateCard({ template, onDelete, onDuplicate }: DesignerTemplateCardProps) {
  const statusColors = {
    draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    published: "bg-green-500/10 text-green-700 dark:text-green-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  const statusLabels = {
    draft: "Borrador",
    published: "Publicado",
    archived: "Archivado",
  }

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={template.media.hero_url || "/placeholder.svg"}
          alt={template.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Badge className={statusColors[template.status]}>{statusLabels[template.status]}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground line-clamp-1">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.code}</p>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/crear-plantilla?id=${template.id}`} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/template/${template.id}`} className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver Detalles
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(template.id)} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(template.id)}
                className="flex items-center gap-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Opciones expuestas:</span>
            <span className="font-medium text-foreground">{template.exposed_options.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Reglas:</span>
            <span className="font-medium text-foreground">{template.compatibility_rules.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Versión:</span>
            <span className="font-medium text-foreground">v{template.version}</span>
          </div>
        </div>

        {/* Edit Button */}
        <Link href={`/crear-plantilla?id=${template.id}`} className="mt-4 block">
          <Button variant="outline" className="w-full bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Editar Plantilla
          </Button>
        </Link>
      </div>
    </Card>
  )
}
