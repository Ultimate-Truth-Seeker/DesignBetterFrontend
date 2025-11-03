"use client"

import type React from "react"

import { useState } from "react"
import { ButtonUI } from "@/components/ui/button"
import { InputUI } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { BadgeUI } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Code, Eye } from "lucide-react"
import type { Pattern, ParameterDefinition } from "@/types/pattern"
import { DEFAULT_PARAMETERS } from "@/types/pattern-defaults"

interface ParametrosStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

export function ParametrosStep({ pattern, onUpdate }: ParametrosStepProps) {
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [editingParam, setEditingParam] = useState<ParameterDefinition | null>(null)
  const [editingCell, setEditingCell] = useState<{ key: string; field: string } | null>(null)

  const parameters = Object.entries(pattern.params_schema?.properties || {}).map(([key, schema]) => ({
    key,
    type: schema.type as "number" | "string" | "boolean" | "enum",
    default: schema.default,
    minimum: schema.minimum,
    maximum: schema.maximum,
    enumValues: schema.enum,
    required: pattern.params_schema?.required?.includes(key) || false,
    description: schema.description || "",
  }))

  const addParameter = () => {
    setEditingParam({
      key: "",
      type: "number",
      default: 0,
      required: false,
      description: "",
    })
  }

  const saveParameter = (param: ParameterDefinition) => {
    if (!param.key) return

    const newProperties = {
      ...pattern.params_schema?.properties,
      [param.key]: {
        type: param.type,
        default: param.default,
        ...(param.minimum !== undefined && { minimum: param.minimum }),
        ...(param.maximum !== undefined && { maximum: param.maximum }),
        ...(param.enumValues && { enum: param.enumValues }),
        description: param.description,
      },
    }

    const newRequired = param.required
      ? [...(pattern.params_schema?.required || []), param.key].filter((k, i, arr) => arr.indexOf(k) === i)
      : (pattern.params_schema?.required || []).filter((k) => k !== param.key)

    onUpdate({
      params_schema: {
        type: "object",
        properties: newProperties,
        required: newRequired,
      },
    })

    setEditingParam(null)
  }

  const deleteParameter = (key: string) => {
    const newProperties = { ...pattern.params_schema?.properties }
    delete newProperties[key]

    const newRequired = (pattern.params_schema?.required || []).filter((k) => k !== key)

    onUpdate({
      params_schema: {
        type: "object",
        properties: newProperties,
        required: newRequired,
      },
    })
  }

  const loadDefaults = () => {
    if (!pattern.category || pattern.category === "other") return

    const defaults = DEFAULT_PARAMETERS[pattern.category]
    const newProperties: Record<string, any> = {}
    const newRequired: string[] = []

    defaults.forEach((param) => {
      newProperties[param.key] = {
        type: param.type,
        default: param.default,
        ...(param.minimum !== undefined && { minimum: param.minimum }),
        ...(param.maximum !== undefined && { maximum: param.maximum }),
        ...(param.enumValues && { enum: param.enumValues }),
        description: param.description,
      }

      if (param.required) {
        newRequired.push(param.key)
      }
    })

    onUpdate({
      params_schema: {
        type: "object",
        properties: { ...pattern.params_schema?.properties, ...newProperties },
        required: [...(pattern.params_schema?.required || []), ...newRequired].filter(
          (k, i, arr) => arr.indexOf(k) === i,
        ),
      },
    })
  }

  const updateParameterValue = (key: string, field: string, value: any) => {
    const currentParam = parameters.find((p) => p.key === key)
    if (!currentParam) return

    let processedValue = value

    if (field === "default") {
      switch (currentParam.type) {
        case "number":
          processedValue = Number.parseFloat(value) || 0
          break
        case "boolean":
          processedValue = value === "true" || value === true
          break
        case "string":
          processedValue = String(value)
          break
      }
    } else if (field === "minimum" || field === "maximum") {
      processedValue = Number.parseFloat(value) || undefined
    } else if (field === "required") {
      processedValue = value === "true" || value === true
    }

    const newProperties = {
      ...pattern.params_schema?.properties,
      [key]: {
        ...pattern.params_schema?.properties[key],
        [field]: processedValue,
        type: pattern.params_schema?.properties[key]?.type || ""
      },
    }

    let newRequired = pattern.params_schema?.required || []
    if (field === "required") {
      if (processedValue) {
        newRequired = [...newRequired, key].filter((k, i, arr) => arr.indexOf(k) === i)
      } else {
        newRequired = newRequired.filter((k) => k !== key)
      }
    }

    onUpdate({
      params_schema: {
        type: "object",
        properties: newProperties,
        required: newRequired,
      },
    })

    setEditingCell(null)
  }

  const InlineCellEditor = ({ param, field, value }: { param: any; field: string; value: any }) => {
    const [tempValue, setTempValue] = useState(String(value || ""))

    const handleSave = () => {
      updateParameterValue(param.key, field, tempValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSave()
      } else if (e.key === "Escape") {
        setEditingCell(null)
      }
    }

    if (field === "type") {
      return (
        <Select
          value={tempValue}
          onValueChange={(val) => {
            updateParameterValue(param.key, field, val)
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="number">Número</SelectItem>
            <SelectItem value="string">Texto</SelectItem>
            <SelectItem value="boolean">Booleano</SelectItem>
            <SelectItem value="enum">Enumeración</SelectItem>
          </SelectContent>
        </Select>
      )
    }

    if (field === "required") {
      return (
        <Select
          value={String(value)}
          onValueChange={(val) => {
            updateParameterValue(param.key, field, val)
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sí</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      )
    }

    return (
      <InputUI
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="h-8"
        autoFocus
        type={
          param.type === "number" && (field === "default" || field === "minimum" || field === "maximum")
            ? "number"
            : "text"
        }
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Parámetros del Patrón</h2>
          <p className="text-muted-foreground">
            Define los parámetros que controlarán las dimensiones y características de tu patrón.
          </p>
        </div>
        <div className="flex gap-2">
          {pattern.category && pattern.category !== "other" && (
            <ButtonUI variant="outline" onClick={loadDefaults}>
              Cargar Predeterminados
            </ButtonUI>
          )}
          <ButtonUI onClick={addParameter}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Parámetro
          </ButtonUI>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "json")}>
        <TabsList>
          <TabsTrigger value="table">
            <Eye className="h-4 w-4 mr-2" />
            Vista de Tabla
          </TabsTrigger>
          <TabsTrigger value="json">
            <Code className="h-4 w-4 mr-2" />
            Vista JSON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clave</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor por Defecto</TableHead>
                  <TableHead>Rango</TableHead>
                  <TableHead>Requerido</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parameters.map((param) => (
                  <TableRow key={param.key}>
                    <TableCell className="font-mono">{param.key}</TableCell>
                    <TableCell>
                      {editingCell?.key === param.key && editingCell?.field === "type" ? (
                        <InlineCellEditor param={param} field="type" value={param.type} />
                      ) : (
                        <BadgeUI
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setEditingCell({ key: param.key, field: "type" })}
                        >
                          {param.type}
                        </BadgeUI>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.key === param.key && editingCell?.field === "default" ? (
                        <InlineCellEditor param={param} field="default" value={param.default} />
                      ) : (
                        <span
                          className="cursor-pointer hover:bg-accent px-2 py-1 rounded"
                          onClick={() => setEditingCell({ key: param.key, field: "default" })}
                        >
                          {String(param.default)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {param.type === "number" ? (
                        <div className="flex gap-1 text-sm">
                          {editingCell?.key === param.key && editingCell?.field === "minimum" ? (
                            <InlineCellEditor param={param} field="minimum" value={param.minimum} />
                          ) : (
                            <span
                              className="cursor-pointer hover:bg-accent px-1 rounded"
                              onClick={() => setEditingCell({ key: param.key, field: "minimum" })}
                            >
                              {param.minimum ?? "min"}
                            </span>
                          )}
                          <span>-</span>
                          {editingCell?.key === param.key && editingCell?.field === "maximum" ? (
                            <InlineCellEditor param={param} field="maximum" value={param.maximum} />
                          ) : (
                            <span
                              className="cursor-pointer hover:bg-accent px-1 rounded"
                              onClick={() => setEditingCell({ key: param.key, field: "maximum" })}
                            >
                              {param.maximum ?? "max"}
                            </span>
                          )}
                        </div>
                      ) : param.enumValues ? (
                        param.enumValues.join(", ")
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCell?.key === param.key && editingCell?.field === "required" ? (
                        <InlineCellEditor param={param} field="required" value={param.required} />
                      ) : (
                        <span
                          className="cursor-pointer hover:bg-accent px-2 py-1 rounded"
                          onClick={() => setEditingCell({ key: param.key, field: "required" })}
                        >
                          {param.required ? "Sí" : "No"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {editingCell?.key === param.key && editingCell?.field === "description" ? (
                        <InlineCellEditor param={param} field="description" value={param.description} />
                      ) : (
                        <span
                          className="cursor-pointer hover:bg-accent px-2 py-1 rounded truncate block"
                          onClick={() => setEditingCell({ key: param.key, field: "description" })}
                        >
                          {param.description || "Agregar descripción..."}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <ButtonUI variant="ghost" size="sm" onClick={() => setEditingParam(param)}>
                          Editar
                        </ButtonUI>
                        <ButtonUI variant="ghost" size="sm" onClick={() => deleteParameter(param.key)}>
                          <Trash2 className="h-4 w-4" />
                        </ButtonUI>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {parameters.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No hay parámetros definidos. Agrega uno para comenzar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="border rounded-lg p-4">
            <Textarea
              value={JSON.stringify(pattern.params_schema, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  onUpdate({ params_schema: parsed })
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="font-mono text-sm min-h-[400px]"
              placeholder="JSON Schema del patrón..."
            />
          </div>
        </TabsContent>
      </Tabs>

      {editingParam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingParam.key ? "Editar Parámetro" : "Nuevo Parámetro"}</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="param-key">Clave *</Label>
                <InputUI
                  id="param-key"
                  value={editingParam.key}
                  onChange={(e) => setEditingParam({ ...editingParam, key: e.target.value })}
                  placeholder="nombre_parametro"
                />
              </div>

              <div>
                <Label htmlFor="param-type">Tipo *</Label>
                <Select
                  value={editingParam.type}
                  onValueChange={(value: "number" | "string" | "boolean" | "enum") =>
                    setEditingParam({ ...editingParam, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Número</SelectItem>
                    <SelectItem value="string">Texto</SelectItem>
                    <SelectItem value="boolean">Booleano</SelectItem>
                    <SelectItem value="enum">Enumeración</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="param-description">Descripción</Label>
                <InputUI
                  id="param-description"
                  value={editingParam.description}
                  onChange={(e) => setEditingParam({ ...editingParam, description: e.target.value })}
                  placeholder="Descripción del parámetro"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="param-required"
                  checked={editingParam.required}
                  onCheckedChange={(checked) => setEditingParam({ ...editingParam, required: !!checked })}
                />
                <Label htmlFor="param-required">Requerido</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <ButtonUI onClick={() => saveParameter(editingParam)} disabled={!editingParam.key}>
                  Guardar
                </ButtonUI>
                <ButtonUI variant="outline" onClick={() => setEditingParam(null)}>
                  Cancelar
                </ButtonUI>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
