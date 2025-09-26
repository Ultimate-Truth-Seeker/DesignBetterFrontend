"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, GitBranch, Upload, Save } from "lucide-react"
import type { Pattern } from "@/types/pattern"

interface PublicacionStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

interface ValidationCheck {
  id: string
  label: string
  status: "passed" | "failed" | "warning"
  message: string
}

interface ChangelogEntry {
  field: string
  oldValue: any
  newValue: any
  type: "added" | "modified" | "removed"
}

export function PublicacionStep({ pattern, onUpdate }: PublicacionStepProps) {
  const [releaseNotes, setReleaseNotes] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock validation checks
  const validationChecks: ValidationCheck[] = [
    {
      id: "metadata",
      label: "Metadatos completos",
      status: pattern.name && pattern.code ? "passed" : "failed",
      message:
        pattern.name && pattern.code ? "Todos los campos requeridos están completos" : "Faltan campos requeridos",
    },
    {
      id: "parameters",
      label: "Parámetros definidos",
      status:
        pattern.params_schema?.properties && Object.keys(pattern.params_schema.properties).length > 0
          ? "passed"
          : "failed",
      message:
        pattern.params_schema?.properties && Object.keys(pattern.params_schema.properties).length > 0
          ? `${Object.keys(pattern.params_schema.properties).length} parámetros definidos`
          : "No hay parámetros definidos",
    },
    {
      id: "pieces",
      label: "Piezas creadas",
      status: pattern.pieces && pattern.pieces.length > 0 ? "passed" : "failed",
      message:
        pattern.pieces && pattern.pieces.length > 0
          ? `${pattern.pieces.length} piezas definidas`
          : "No hay piezas definidas",
    },
    {
      id: "constraints",
      label: "Restricciones validadas",
      status: "passed",
      message: "Todas las restricciones son válidas",
    },
    {
      id: "grading",
      label: "Reglas de gradación",
      status: pattern.grading_rules && pattern.grading_rules.length > 0 ? "passed" : "warning",
      message:
        pattern.grading_rules && pattern.grading_rules.length > 0
          ? "Reglas de gradación definidas"
          : "No hay reglas de gradación (opcional)",
    },
    {
      id: "tests",
      label: "Pruebas ejecutadas",
      status: "warning",
      message: "Se recomienda ejecutar al menos una prueba antes de publicar",
    },
  ]

  // Mock changelog (would come from comparing with last published version)
  const changelog: ChangelogEntry[] = [
    {
      field: "params_schema.properties.ease",
      oldValue: null,
      newValue: { type: "number", default: 5 },
      type: "added",
    },
    {
      field: "pieces[0].name",
      oldValue: "Delantera",
      newValue: "Delantero",
      type: "modified",
    },
    {
      field: "constraints[2]",
      oldValue: { expression: "bust > 80" },
      newValue: null,
      type: "removed",
    },
  ]

  const canPublish = validationChecks.filter((check) => check.status === "failed").length === 0

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onUpdate({ status: "draft" })
    } catch (error) {
      console.error("Failed to save draft:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreateVersion = async () => {
    setIsPublishing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onUpdate({
        version: (pattern.version || 1) + 1,
        status: "draft",
      })
    } catch (error) {
      console.error("Failed to create version:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handlePublish = async () => {
    if (!canPublish) return

    setIsPublishing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onUpdate({
        status: "published",
        // In real implementation, would set published_at timestamp
      })
    } catch (error) {
      console.error("Failed to publish pattern:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  const renderChangelogItem = (entry: ChangelogEntry) => {
    const getChangeIcon = () => {
      switch (entry.type) {
        case "added":
          return <span className="text-green-600">+</span>
        case "modified":
          return <span className="text-blue-600">~</span>
        case "removed":
          return <span className="text-red-600">-</span>
      }
    }

    const getChangeColor = () => {
      switch (entry.type) {
        case "added":
          return "text-green-600"
        case "modified":
          return "text-blue-600"
        case "removed":
          return "text-red-600"
      }
    }

    return (
      <div key={entry.field} className="flex items-start gap-3 p-3 border rounded-lg">
        <div className="font-mono text-sm mt-0.5">{getChangeIcon()}</div>
        <div className="flex-1 space-y-1">
          <div className="font-medium text-sm">{entry.field}</div>
          <div className="text-xs text-muted-foreground space-y-1">
            {entry.type === "added" && (
              <div>
                Agregado: <code className="bg-muted px-1 rounded">{JSON.stringify(entry.newValue)}</code>
              </div>
            )}
            {entry.type === "modified" && (
              <>
                <div>
                  Anterior: <code className="bg-muted px-1 rounded">{JSON.stringify(entry.oldValue)}</code>
                </div>
                <div>
                  Nuevo: <code className="bg-muted px-1 rounded">{JSON.stringify(entry.newValue)}</code>
                </div>
              </>
            )}
            {entry.type === "removed" && (
              <div>
                Eliminado: <code className="bg-muted px-1 rounded">{JSON.stringify(entry.oldValue)}</code>
              </div>
            )}
          </div>
        </div>
        <Badge variant="outline" className={getChangeColor()}>
          {entry.type}
        </Badge>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Versionado y Publicación</h2>
        <p className="text-muted-foreground">
          Revisa los cambios, valida el patrón y publícalo para que esté disponible
        </p>
      </div>

      <Tabs defaultValue="validation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="validation">Validación</TabsTrigger>
          <TabsTrigger value="changes">Cambios</TabsTrigger>
          <TabsTrigger value="publish">Publicar</TabsTrigger>
        </TabsList>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Checklist de Validación</CardTitle>
              <CardDescription>
                Verifica que el patrón cumple con todos los requisitos antes de publicar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {validationChecks.map((check) => (
                <div key={check.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    {check.status === "passed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {check.status === "failed" && <AlertCircle className="w-5 h-5 text-red-600" />}
                    {check.status === "warning" && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{check.label}</div>
                    <div className="text-sm text-muted-foreground">{check.message}</div>
                  </div>
                  <Badge
                    variant={
                      check.status === "passed" ? "default" : check.status === "warning" ? "secondary" : "destructive"
                    }
                  >
                    {check.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Cambios</CardTitle>
              <CardDescription>Cambios desde la última versión publicada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {changelog.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay cambios desde la última versión</p>
              ) : (
                changelog.map(renderChangelogItem)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Versión</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Versión actual:</Label>
                  <div className="font-medium">v{pattern.version || 1}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Estado:</Label>
                  <Badge variant={pattern.status === "published" ? "default" : "secondary"}>
                    {pattern.status || "draft"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="release-notes">Notas de la versión (opcional)</Label>
                <Textarea
                  id="release-notes"
                  placeholder="Describe los cambios principales de esta versión..."
                  value={releaseNotes}
                  onChange={(e) => setReleaseNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Guardando..." : "Guardar Borrador"}
            </Button>

            <Button variant="outline" onClick={handleCreateVersion} disabled={isPublishing}>
              <GitBranch className="w-4 h-4 mr-2" />
              {isPublishing ? "Creando..." : "Nueva Versión"}
            </Button>

            <Button
              onClick={handlePublish}
              disabled={!canPublish || isPublishing}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isPublishing ? "Publicando..." : "Publicar"}
            </Button>
          </div>

          {!canPublish && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">No se puede publicar</span>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  Corrige los errores de validación antes de publicar el patrón.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
