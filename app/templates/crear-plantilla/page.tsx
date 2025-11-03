"use client"

import "client-only"
import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from "lucide-react"
import type { DesignerTemplate, TemplateStatus } from "@/types/designer-template"
import type { Pattern } from "@/types/pattern"
import { templateApi } from "@/lib/template-api"
import { patternApi } from "@/lib/pattern-api"

export default function CrearPlantillaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("id")
  const isEditing = !!templateId

  const [template, setTemplate] = useState<Partial<DesignerTemplate>>({
    code: "",
    name: "",
    pattern_base_id: "",
    default_params: {},
    exposed_options: [],
    compatibility_rules: [],
    materials_policy: { pieces : {}},
    size_range: { type: "standard"},
    media: { hero_url: "", gallery: [] },
    status: "draft",
  })

  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [newMaterial, setNewMaterial] = useState("")

  // Load patterns list
  useEffect(() => {
    const loadPatterns = async () => {
      const patternsList = await patternApi.getPatterns()
      setPatterns(patternsList.filter((p) => p.status === "published"))
    }
    loadPatterns()
  }, [])

  // Load template if editing
  useEffect(() => {
    const loadTemplate = async () => {
      if (templateId) {
        const loadedTemplate = await templateApi.fetchTemplate(templateId)
        if (loadedTemplate) {
        setTemplate(loadedTemplate)

        // Load the associated pattern
        const pattern = await patternApi.getPattern(loadedTemplate.pattern_base_id)
        setSelectedPattern(pattern)}
      }
    }
    loadTemplate()
  }, [templateId])

  // Load pattern params when pattern is selected (only for new templates)
  useEffect(() => {
    if (selectedPattern && !isEditing) {
      // Initialize default_params from pattern's params_schema
      const defaultParams: Record<string, any> = {}
      if (selectedPattern.params_schema?.properties) {
        Object.entries(selectedPattern.params_schema.properties).forEach(([key, schema]: [string, any]) => {
          defaultParams[key] = schema.default || null
        })
      }

      // Initialize materials_policy from pattern's pieces
      const materialsPolicy: Record<string, Record<string, string[]>> = {}
      if (selectedPattern.pieces) {
        selectedPattern.pieces.forEach((piece: any) => {
          materialsPolicy[piece.id] = {"allowed_materials" : []}
        })
      }

      setTemplate((prev) => ({
        ...prev,
        pattern_base_id: selectedPattern.id,
        default_params: defaultParams,
        materials_policy:{ pieces: materialsPolicy}
      }))
    }
  }, [selectedPattern, isEditing])

  // Autosave functionality
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const timer = setTimeout(async () => {
      await handleSave(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [template, hasUnsavedChanges])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  const handleSave = async (isAutosave = false) => {
    if (isAutosave === false) {}
    setIsSaving(true)
    try {
      if (isEditing && template.id) {
        await templateApi.updateTemplate(template.id, template)
      } else {
        const newTemplate = await templateApi.createTemplate(template)
        setTemplate(newTemplate)
        // Update URL to editing mode
        router.replace(`/crear-plantilla?id=${newTemplate.id}`)
      }
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Error saving template:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const updateTemplate = (updates: Partial<DesignerTemplate>) => {
    setTemplate((prev) => ({ ...prev, ...updates }))
    setHasUnsavedChanges(true)
  }

  const updateDefaultParam = (key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      default_params: {
        ...prev.default_params,
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const toggleExposedOption = (paramKey: string, controlType: string) => {
    setTemplate((prev) => {
      const newExposedOptions = { ...prev.exposed_options }
      if (newExposedOptions[paramKey]) {
        delete newExposedOptions[paramKey]
      } else {
        newExposedOptions[paramKey] = { type: controlType }
      }
      return { ...prev, exposed_options: newExposedOptions }
    })
    setHasUnsavedChanges(true)
  }

  const addCompatibilityRule = () => {
    setTemplate((prev) => ({
      ...prev,
      compatibility_rules: [...(prev.compatibility_rules || []), { condition: "", action: "", description: "" }],
    }))
    setHasUnsavedChanges(true)
  }

  const updateCompatibilityRule = (index: number, updates: any) => {
    setTemplate((prev) => {
      const newRules = [...(prev.compatibility_rules || [])]
      newRules[index] = { ...newRules[index], ...updates }
      return { ...prev, compatibility_rules: newRules }
    })
    setHasUnsavedChanges(true)
  }

  const removeCompatibilityRule = (index: number) => {
    setTemplate((prev) => ({
      ...prev,
      compatibility_rules: prev.compatibility_rules?.filter((_, i) => i !== index),
    }))
    setHasUnsavedChanges(true)
  }

  const updateMaterialsPolicy = (pieceId: string, materials: string[]) => {
    setTemplate((prev) => ({
      ...prev,
      materials_policy: {
        ...prev.materials_policy,
        [pieceId]: materials,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const addMaterialToPiece = (pieceId: string, material: string) => {
    const currentMaterials = template.materials_policy?.[pieceId] || []
    if (!currentMaterials.includes(material)) {
      updateMaterialsPolicy(pieceId, [...currentMaterials, material])
    }
  }

  const removeMaterialFromPiece = (pieceId: string, material: string) => {
    const currentMaterials = template.materials_policy?.[pieceId] || []
    updateMaterialsPolicy(
      pieceId,
      currentMaterials.filter((m) => m !== material),
    )
  }

  const patternParams = useMemo(() => {
    if (!selectedPattern?.params_schema?.properties) return []
    return Object.entries(selectedPattern.params_schema.properties).map(([key, schema]: [string, any]) => ({
      key,
      schema,
    }))
  }, [selectedPattern])

  const patternPieces = useMemo(() => {
    if (!selectedPattern?.pieces) return []
    return selectedPattern.pieces
  }, [selectedPattern])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/templates")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{isEditing ? "Editar Plantilla" : "Crear Plantilla"}</h1>
                {lastSaved && (
                  <p className="text-sm text-muted-foreground">Último guardado: {lastSaved.toLocaleTimeString()}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && <Badge variant="outline">Cambios sin guardar</Badge>}
              <Button onClick={() => handleSave()} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="metadata" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="metadata">Metadatos</TabsTrigger>
            <TabsTrigger value="params">Parámetros</TabsTrigger>
            <TabsTrigger value="exposed">Opciones Expuestas</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibilidad</TabsTrigger>
            <TabsTrigger value="materials">Materiales</TabsTrigger>
            <TabsTrigger value="media">Medios</TabsTrigger>
          </TabsList>

          {/* Metadata Tab */}
          <TabsContent value="metadata" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código *</Label>
                    <Input
                      id="code"
                      value={template.code}
                      onChange={(e) => updateTemplate({ code: e.target.value })}
                      placeholder="TPL-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      value={template.name}
                      onChange={(e) => updateTemplate({ name: e.target.value })}
                      placeholder="Camisa Casual Verano"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pattern">Patrón Base *</Label>
                  {isEditing ? (
                    <Input value={selectedPattern?.name || "Cargando..."} disabled className="bg-muted" />
                  ) : (
                    <Select
                      value={template.pattern_base_id}
                      onValueChange={(value) => {
                        const pattern = patterns.find((p) => p.id === value)
                        setSelectedPattern(pattern || null)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar patrón" />
                      </SelectTrigger>
                      <SelectContent>
                        {patterns.map((pattern) => (
                          <SelectItem key={pattern.id} value={pattern.id}>
                            {pattern.name} ({pattern.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {isEditing && (
                    <p className="text-sm text-muted-foreground">
                      El patrón no puede cambiarse después de crear la plantilla
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={template.status}
                    onValueChange={(value: TemplateStatus) => updateTemplate({ status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parameters Tab */}
          <TabsContent value="params" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parámetros por Defecto</CardTitle>
                <p className="text-sm text-muted-foreground">Valores predeterminados cargados del patrón base</p>
              </CardHeader>
              <CardContent>
                {!selectedPattern ? (
                  <p className="text-muted-foreground">Selecciona un patrón para ver sus parámetros</p>
                ) : patternParams.length === 0 ? (
                  <p className="text-muted-foreground">Este patrón no tiene parámetros definidos</p>
                ) : (
                  <div className="space-y-4">
                    {patternParams.map(({ key, schema }) => (
                      <div key={key} className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label className="font-medium">{schema.title || key}</Label>
                          <p className="text-sm text-muted-foreground">{schema.description}</p>
                        </div>
                        <div>
                          <Badge variant="outline">{schema.type}</Badge>
                        </div>
                        <div>
                          {schema.type === "number" && (
                            <Input
                              type="number"
                              value={template.default_params?.[key] || ""}
                              onChange={(e) => updateDefaultParam(key, Number.parseFloat(e.target.value))}
                              min={schema.minimum}
                              max={schema.maximum}
                            />
                          )}
                          {schema.type === "string" && schema.enum && (
                            <Select
                              value={template.default_params?.[key] || ""}
                              onValueChange={(value) => updateDefaultParam(key, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {schema.enum.map((option: string) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          {schema.type === "string" && !schema.enum && (
                            <Input
                              value={template.default_params?.[key] || ""}
                              onChange={(e) => updateDefaultParam(key, e.target.value)}
                            />
                          )}
                          {schema.type === "boolean" && (
                            <Checkbox
                              checked={template.default_params?.[key] || false}
                              onCheckedChange={(checked) => updateDefaultParam(key, checked)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exposed Options Tab */}
          <TabsContent value="exposed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Opciones Expuestas al Cliente</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Selecciona qué parámetros pueden personalizar los clientes
                </p>
              </CardHeader>
              <CardContent>
                {!selectedPattern ? (
                  <p className="text-muted-foreground">Selecciona un patrón para configurar opciones expuestas</p>
                ) : patternParams.length === 0 ? (
                  <p className="text-muted-foreground">Este patrón no tiene parámetros para exponer</p>
                ) : (
                  <div className="space-y-4">
                    {patternParams.map(({ key, schema }) => {
                      const isExposed = !!template.exposed_options?.[key]
                      const controlType = schema.enum
                        ? "select"
                        : schema.type === "boolean"
                          ? "boolean"
                          : schema.type === "number"
                            ? "range"
                            : "text"

                      return (
                        <div key={key} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={isExposed}
                                onCheckedChange={() => toggleExposedOption(key, controlType)}
                              />
                              <Label className="font-medium">{schema.title || key}</Label>
                            </div>
                            <p className="ml-6 text-sm text-muted-foreground">{schema.description}</p>
                          </div>
                          <Badge variant={isExposed ? "default" : "outline"}>{controlType}</Badge>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compatibility Rules Tab */}
          <TabsContent value="compatibility" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reglas de Compatibilidad</CardTitle>
                    <p className="text-sm text-muted-foreground">Define restricciones entre opciones</p>
                  </div>
                  <Button onClick={addCompatibilityRule} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Regla
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!template.compatibility_rules || template.compatibility_rules.length === 0 ? (
                  <p className="text-muted-foreground">No hay reglas de compatibilidad definidas</p>
                ) : (
                  <div className="space-y-4">
                    {template.compatibility_rules.map((rule, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <Label>Regla {index + 1}</Label>
                              <Button variant="ghost" size="icon" onClick={() => removeCompatibilityRule(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label>Condición (ej: cuello=mao)</Label>
                              <Input
                                value={rule.condition}
                                onChange={(e) =>
                                  updateCompatibilityRule(index, {
                                    condition: e.target.value,
                                  })
                                }
                                placeholder="parametro=valor"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Acción (ej: puño!=francés)</Label>
                              <Input
                                value={rule.action}
                                onChange={(e) =>
                                  updateCompatibilityRule(index, {
                                    action: e.target.value,
                                  })
                                }
                                placeholder="parametro!=valor"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Descripción</Label>
                              <Textarea
                                value={rule.description}
                                onChange={(e) =>
                                  updateCompatibilityRule(index, {
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Explicación de la regla"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Policy Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Política de Materiales</CardTitle>
                <p className="text-sm text-muted-foreground">Define materiales permitidos para cada pieza</p>
              </CardHeader>
              <CardContent>
                {!selectedPattern ? (
                  <p className="text-muted-foreground">Selecciona un patrón para configurar materiales</p>
                ) : patternPieces.length === 0 ? (
                  <p className="text-muted-foreground">Este patrón no tiene piezas definidas</p>
                ) : (
                  <div className="space-y-6">
                    {patternPieces.map((piece: any) => {
                      const pieceMaterials = template.materials_policy?.[piece.id] || []

                      return (
                        <Card key={piece.id}>
                          <CardHeader>
                            <CardTitle className="text-base">{piece.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Agregar material (ej: Algodón 100%)"
                                value={newMaterial}
                                onChange={(e) => setNewMaterial(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && newMaterial.trim()) {
                                    addMaterialToPiece(piece.id, newMaterial.trim())
                                    setNewMaterial("")
                                  }
                                }}
                              />
                              <Button
                                onClick={() => {
                                  if (newMaterial.trim()) {
                                    addMaterialToPiece(piece.id, newMaterial.trim())
                                    setNewMaterial("")
                                  }
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {pieceMaterials.map((material) => (
                                <Badge key={material} variant="secondary" className="gap-1">
                                  {material}
                                  <button
                                    onClick={() => removeMaterialFromPiece(piece.id, material)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                              {pieceMaterials.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                  No hay materiales definidos para esta pieza
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medios</CardTitle>
                <p className="text-sm text-muted-foreground">Imágenes de referencia para la plantilla</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Imagen Principal (Hero)</Label>
                  <div className="flex gap-4">
                    {template.media?.hero_url && (
                      <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
                        <img
                          src={template.media.hero_url || "/placeholder.svg"}
                          alt="Hero"
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() =>
                            updateTemplate({
                              media: { ...template.media, hero_url: "" },
                            })
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex h-48 w-48 items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Subir imagen</p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="mt-2"
                          onChange={(e) => {
                            // Mock upload - in real app would upload to server
                            const file = e.target.files?.[0]
                            if (file) {
                              const url = URL.createObjectURL(file)
                              updateTemplate({
                                media: { ...template.media, hero_url: url },
                              })
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Galería</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {template.media?.gallery?.map((url, index) => (
                      <div key={index} className="relative h-32 overflow-hidden rounded-lg border">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1"
                          onClick={() => {
                            const newGallery = template.media?.gallery?.filter((_, i) => i !== index)
                            updateTemplate({
                              media: { ...template.media, gallery: newGallery },
                            })
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="mt-2"
                          onChange={(e) => {
                            // Mock upload
                            const files = Array.from(e.target.files || [])
                            const urls = files.map((file) => URL.createObjectURL(file))
                            updateTemplate({
                              media: {
                                ...template.media,
                                gallery: [...(template.media?.gallery || []), ...urls],
                              },
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
