"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Pattern, PatternCategory } from "@/types/pattern"
import { Shuffle } from "lucide-react"

interface MetadatosStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

const CATEGORIES: { value: PatternCategory; label: string }[] = [
  { value: "dress", label: "Vestido" },
  { value: "shirt", label: "Camisa" },
  { value: "pants", label: "Pantalón" },
  { value: "skirt", label: "Falda" },
  { value: "jacket", label: "Chaqueta" },
  { value: "top", label: "Top" },
  { value: "other", label: "Otro" },
]

export function MetadatosStep({ pattern, onUpdate }: MetadatosStepProps) {
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)

  const generateCode = async () => {
    if (!pattern.name) return

    setIsGeneratingCode(true)
    try {
      // Simulate code generation
      await new Promise((resolve) => setTimeout(resolve, 500))

      const slug = pattern.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 20)

      const timestamp = Date.now().toString().slice(-4)
      const code = `${pattern.category || "other"}-${slug}-${timestamp}`

      onUpdate({ code })
    } finally {
      setIsGeneratingCode(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Información Básica</h2>
        <p className="text-muted-foreground">
          Completa la información básica de tu patrón. Esta información será visible para los usuarios.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre del Patrón *</Label>
          <Input
            id="name"
            value={pattern.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Ej: Vestido de verano con mangas"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="code">Código del Patrón *</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              value={pattern.code || ""}
              onChange={(e) => onUpdate({ code: e.target.value })}
              placeholder="Ej: dress-summer-sleeves-2024"
            />
            <Button type="button" variant="outline" onClick={generateCode} disabled={!pattern.name || isGeneratingCode}>
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            El código debe ser único. Usa el botón para generar uno automáticamente.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Categoría *</Label>
          <Select
            value={pattern.category || ""}
            onValueChange={(value: PatternCategory) => onUpdate({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            La categoría determina los parámetros predeterminados disponibles.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={pattern.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe tu patrón, sus características y uso recomendado..."
            rows={4}
          />
        </div>

        <div className="grid gap-2">
          <Label>Estado</Label>
          <div className="flex items-center gap-2">
            <Badge variant={pattern.status === "draft" ? "secondary" : "default"}>
              {pattern.status === "draft" ? "Borrador" : pattern.status === "published" ? "Publicado" : "Archivado"}
            </Badge>
            <span className="text-sm text-muted-foreground">Versión {pattern.version || 1}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Los patrones publicados tienen campos bloqueados. Crea una nueva versión para editarlos.
          </p>
        </div>
      </div>
    </div>
  )
}
