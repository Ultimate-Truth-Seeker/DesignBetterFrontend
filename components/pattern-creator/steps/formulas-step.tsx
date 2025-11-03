"use client"

import { useState } from "react"
import { ButtonUI } from "@/components/ui/button"
import { InputUI } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BadgeUI } from "@/components/ui/badge"
import { Plus, Trash2, Code, Eye, AlertTriangle, CheckCircle } from "lucide-react"
import type { Pattern, Constraint } from "@/types/pattern"
import { DEFAULT_CONSTRAINTS } from "@/types/pattern-defaults"

interface FormulasStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

export function FormulasStep({ pattern, onUpdate }: FormulasStepProps) {
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [editingConstraint, setEditingConstraint] = useState<Constraint | null>(null)
  const [testValues, setTestValues] = useState<Record<string, number>>({})

  const constraints = pattern.constraints || []

  const addConstraint = () => {
    setEditingConstraint({
      id: `constraint_${Date.now()}`,
      type: "range",
      expression: "",
      message: "",
      severity: "warning",
    })
  }

  const saveConstraint = (constraint: Constraint) => {
    if (!constraint.expression) return

    const existingIndex = constraints.findIndex((c) => c.id === constraint.id)
    let newConstraints

    if (existingIndex >= 0) {
      newConstraints = [...constraints]
      newConstraints[existingIndex] = constraint
    } else {
      newConstraints = [...constraints, constraint]
    }

    onUpdate({ constraints: newConstraints })
    setEditingConstraint(null)
  }

  const deleteConstraint = (id: string) => {
    const newConstraints = constraints.filter((c) => c.id !== id)
    onUpdate({ constraints: newConstraints })
  }

  const loadDefaults = () => {
    if (!pattern.category || pattern.category === "other") return

    const defaults = DEFAULT_CONSTRAINTS[pattern.category]
    const newConstraints = [
      ...constraints,
      ...defaults.filter((defaultConstraint) => !constraints.some((existing) => existing.id === defaultConstraint.id)),
    ]

    onUpdate({ constraints: newConstraints })
  }

  const validateConstraint = (expression: string, testVals: Record<string, number>) => {
    try {
      // Simple validation - replace variables with test values
      let evalExpression = expression
      Object.entries(testVals).forEach(([key, value]) => {
        evalExpression = evalExpression.replace(new RegExp(key, "g"), value.toString())
      })

      // Basic math evaluation (simplified)
      const result = eval(evalExpression.replace(/[^0-9+\-*/.()>=<\s]/g, ""))
      return { valid: true, result }
    } catch {
      return { valid: false, result: null }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Fórmulas y Restricciones</h2>
          <p className="text-muted-foreground">
            Define reglas y relaciones entre parámetros para validar la consistencia del patrón.
          </p>
        </div>
        <div className="flex gap-2">
          {pattern.category && pattern.category !== "other" && (
            <ButtonUI variant="outline" onClick={loadDefaults}>
              Cargar Predeterminadas
            </ButtonUI>
          )}
          <ButtonUI onClick={addConstraint}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Restricción
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
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Expresión</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Severidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {constraints.map((constraint) => {
                  const validation = validateConstraint(constraint.expression, testValues)
                  return (
                    <TableRow key={constraint.id}>
                      <TableCell className="font-mono text-sm">{constraint.id}</TableCell>
                      <TableCell>
                        <BadgeUI variant="outline">{constraint.type}</BadgeUI>
                      </TableCell>
                      <TableCell className="font-mono text-sm max-w-[200px] truncate">
                        {constraint.expression}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{constraint.message}</TableCell>
                      <TableCell>
                        <BadgeUI variant={constraint.severity === "error" ? "destructive" : "secondary"}>
                          {constraint.severity}
                        </BadgeUI>
                      </TableCell>
                      <TableCell>
                        {validation.valid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <ButtonUI variant="ghost" size="sm" onClick={() => setEditingConstraint(constraint)}>
                            Editar
                          </ButtonUI>
                          <ButtonUI variant="ghost" size="sm" onClick={() => deleteConstraint(constraint.id)}>
                            <Trash2 className="h-4 w-4" />
                          </ButtonUI>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {constraints.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No hay restricciones definidas. Agrega una para comenzar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Test Panel */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Simulador de Restricciones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(pattern.params_schema?.properties || {}).map(([key, schema]) => (
                <div key={key}>
                  <Label className="text-xs">{key}</Label>
                  <InputUI
                    type="number"
                    placeholder={String(schema.default || 0)}
                    value={testValues[key] || ""}
                    onChange={(e) =>
                      setTestValues({
                        ...testValues,
                        [key]: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-8"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Ingresa valores de prueba para validar las restricciones en tiempo real.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="json">
          <div className="border rounded-lg p-4">
            <Textarea
              value={JSON.stringify(pattern.constraints, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  onUpdate({ constraints: parsed })
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="font-mono text-sm min-h-[400px]"
              placeholder="Restricciones en formato JSON..."
            />
          </div>
        </TabsContent>
      </Tabs>

      {editingConstraint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {constraints.some((c) => c.id === editingConstraint.id) ? "Editar Restricción" : "Nueva Restricción"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="constraint-id">ID *</Label>
                <InputUI
                  id="constraint-id"
                  value={editingConstraint.id}
                  onChange={(e) => setEditingConstraint({ ...editingConstraint, id: e.target.value })}
                  placeholder="constraint_id"
                />
              </div>

              <div>
                <Label htmlFor="constraint-type">Tipo *</Label>
                <Select
                  value={editingConstraint.type}
                  onValueChange={(value: "range" | "relation" | "forbid" | "require") =>
                    setEditingConstraint({ ...editingConstraint, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="range">Rango</SelectItem>
                    <SelectItem value="relation">Relación</SelectItem>
                    <SelectItem value="forbid">Restringir</SelectItem>
                    <SelectItem value="require">Requerir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="constraint-expression">Expresión *</Label>
                <InputUI
                  id="constraint-expression"
                  value={editingConstraint.expression}
                  onChange={(e) => setEditingConstraint({ ...editingConstraint, expression: e.target.value })}
                  placeholder="bust_ease >= waist_ease"
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="constraint-message">Mensaje</Label>
                <InputUI
                  id="constraint-message"
                  value={editingConstraint.message}
                  onChange={(e) => setEditingConstraint({ ...editingConstraint, message: e.target.value })}
                  placeholder="Mensaje de error o advertencia"
                />
              </div>

              <div>
                <Label htmlFor="constraint-severity">Severidad</Label>
                <Select
                  value={editingConstraint.severity}
                  onValueChange={(value: "error" | "warning") =>
                    setEditingConstraint({ ...editingConstraint, severity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warning">Advertencia</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <ButtonUI onClick={() => saveConstraint(editingConstraint)} disabled={!editingConstraint.expression}>
                  Guardar
                </ButtonUI>
                <ButtonUI variant="outline" onClick={() => setEditingConstraint(null)}>
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
