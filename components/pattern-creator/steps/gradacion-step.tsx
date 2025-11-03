"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Code, Eye, TrendingUp } from "lucide-react"
import type { Pattern, GradingRule } from "@/types/pattern"
import { DEFAULT_GRADING_RULES } from "@/types/pattern-defaults"

interface GradacionStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export function GradacionStep({ pattern, onUpdate }: GradacionStepProps) {
  const [viewMode, setViewMode] = useState<"table" | "json">("table")
  const [editingRule, setEditingRule] = useState<GradingRule | null>(null)

  const gradingRules = pattern.grading_rules || []

  const addGradingRule = () => {
    setEditingRule({
      id: `grading_${Date.now()}`,
      parameter: "",
      baseSize: "M",
      increments: {
        XS: -10,
        S: -5,
        M: 0,
        L: 5,
        XL: 10,
      },
      method: "linear",
    })
  }

  const saveGradingRule = (rule: GradingRule) => {
    if (!rule.parameter) return

    const existingIndex = gradingRules.findIndex((r) => r.id === rule.id)
    let newRules

    if (existingIndex >= 0) {
      newRules = [...gradingRules]
      newRules[existingIndex] = rule
    } else {
      newRules = [...gradingRules, rule]
    }

    onUpdate({ grading_rules: newRules })
    setEditingRule(null)
  }

  const deleteGradingRule = (id: string) => {
    const newRules = gradingRules.filter((r) => r.id !== id)
    onUpdate({ grading_rules: newRules })
  }

  const loadDefaults = () => {
    if (!pattern.category || pattern.category === "other") return

    const defaults = DEFAULT_GRADING_RULES[pattern.category]
    const newRules = [
      ...gradingRules,
      ...defaults.filter((defaultRule) => !gradingRules.some((existing) => existing.id === defaultRule.id)),
    ]

    onUpdate({ grading_rules: newRules })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Gradación de Tallas</h2>
          <p className="text-muted-foreground">Define cómo escalan las medidas del patrón entre diferentes tallas.</p>
        </div>
        <div className="flex gap-2">
          {pattern.category && pattern.category !== "other" && (
            <Button variant="outline" onClick={loadDefaults}>
              Cargar Predeterminadas
            </Button>
          )}
          <Button onClick={addGradingRule}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Regla
          </Button>
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
                  <TableHead>Parámetro</TableHead>
                  <TableHead>Talla Base</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>XS</TableHead>
                  <TableHead>S</TableHead>
                  <TableHead>M</TableHead>
                  <TableHead>L</TableHead>
                  <TableHead>XL</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradingRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.parameter}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.baseSize}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{rule.method}</Badge>
                    </TableCell>
                    {SIZES.slice(0, 5).map((size) => (
                      <TableCell key={size} className="text-center">
                        <span className={rule.increments[size] === 0 ? "font-bold" : ""}>
                          {rule.increments[size] > 0 ? "+" : ""}
                          {rule.increments[size]}
                        </span>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditingRule(rule)}>
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteGradingRule(rule.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {gradingRules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      No hay reglas de gradación definidas. Agrega una para comenzar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Preview Chart */}
          {gradingRules.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Previsualización de Gradación
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gradingRules.slice(0, 4).map((rule) => (
                  <div key={rule.id} className="space-y-2">
                    <h4 className="text-sm font-medium">{rule.parameter}</h4>
                    <div className="flex items-center justify-between text-xs">
                      {SIZES.slice(0, 5).map((size) => (
                        <div key={size} className="text-center">
                          <div className="font-mono">{size}</div>
                          <div
                            className={`h-8 w-8 mx-auto rounded border flex items-center justify-center ${
                              size === rule.baseSize ? "bg-primary text-primary-foreground" : "bg-accent"
                            }`}
                          >
                            {rule.increments[size] > 0 ? "+" : ""}
                            {rule.increments[size]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="json">
          <div className="border rounded-lg p-4">
            <textarea
              value={JSON.stringify(pattern.grading_rules, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  onUpdate({ grading_rules: parsed })
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="w-full h-96 font-mono text-sm border rounded p-2"
              placeholder="Reglas de gradación en formato JSON..."
            />
          </div>
        </TabsContent>
      </Tabs>

      {editingRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {gradingRules.some((r) => r.id === editingRule.id) ? "Editar Regla" : "Nueva Regla"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-parameter">Parámetro *</Label>
                <Select
                  value={editingRule.parameter}
                  onValueChange={(value) => setEditingRule({ ...editingRule, parameter: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un parámetro" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(pattern.params_schema?.properties || {}).map((param) => (
                      <SelectItem key={param} value={param}>
                        {param}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rule-base-size">Talla Base</Label>
                <Select
                  value={editingRule.baseSize}
                  onValueChange={(value) => setEditingRule({ ...editingRule, baseSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Incrementos por Talla</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {SIZES.slice(0, 5).map((size) => (
                    <div key={size}>
                      <Label className="text-xs">{size}</Label>
                      <Input
                        type="number"
                        value={editingRule.increments[size] || 0}
                        onChange={(e) =>
                          setEditingRule({
                            ...editingRule,
                            increments: {
                              ...editingRule.increments,
                              [size]: Number.parseFloat(e.target.value) || 0,
                            },
                          })
                        }
                        className="h-8"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="rule-method">Método</Label>
                <Select
                  value={editingRule.method}
                  onValueChange={(value: "linear" | "polynomial") => setEditingRule({ ...editingRule, method: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Lineal</SelectItem>
                    <SelectItem value="polynomial">Polinómica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => saveGradingRule(editingRule)} disabled={!editingRule.parameter}>
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setEditingRule(null)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
