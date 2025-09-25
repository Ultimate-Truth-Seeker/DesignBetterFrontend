"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Play, Eye, Cable as Cube } from "lucide-react"
import type { Pattern } from "@/types/pattern"

interface PruebasStepProps {
  pattern: Partial<Pattern>
  onUpdate: (updates: Partial<Pattern>) => void
}

interface TestResult {
  id: string
  timestamp: Date
  measurements: Record<string, number>
  parameters: Record<string, any>
  status: "success" | "error" | "warning"
  errors: string[]
  warnings: string[]
}

const MEASUREMENT_SETS = {
  xs: { bust: 82, waist: 66, hip: 90, back_length: 38 },
  s: { bust: 86, waist: 70, hip: 94, back_length: 39 },
  m: { bust: 90, waist: 74, hip: 98, back_length: 40 },
  l: { bust: 94, waist: 78, hip: 102, back_length: 41 },
  xl: { bust: 98, waist: 82, hip: 106, back_length: 42 },
}

export function PruebasStep({ pattern, onUpdate }: PruebasStepProps) {
  const [selectedMeasurementSet, setSelectedMeasurementSet] = useState<string>("m")
  const [customMeasurements, setCustomMeasurements] = useState<Record<string, number>>({})
  const [testParameters, setTestParameters] = useState<Record<string, any>>({})
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [isResolving, setIsResolving] = useState(false)

  const handleValidatePattern = async () => {
    setIsValidating(true)
    try {
      // Simulate API call to validate pattern
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const measurements =
        selectedMeasurementSet === "custom"
          ? customMeasurements
          : MEASUREMENT_SETS[selectedMeasurementSet as keyof typeof MEASUREMENT_SETS]

      const result: TestResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        measurements,
        parameters: testParameters,
        status: Math.random() > 0.3 ? "success" : "warning",
        errors: Math.random() > 0.7 ? ["Variable 'shoulder_width' no está definida en parámetros"] : [],
        warnings: Math.random() > 0.5 ? ["La pieza 'manga' podría ser muy estrecha para talla XL"] : [],
      }

      setTestResults((prev) => [result, ...prev.slice(0, 4)])
    } catch (error) {
      console.error("Validation failed:", error)
    } finally {
      setIsValidating(false)
    }
  }

  const handleResolveGeometry = async () => {
    setIsResolving(true)
    try {
      // Simulate API call to resolve geometry
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // In real implementation, this would render the 2D pattern
    } catch (error) {
      console.error("Geometry resolution failed:", error)
    } finally {
      setIsResolving(false)
    }
  }

  const renderParameterForm = () => {
    if (!pattern.params_schema?.properties) return null

    return (
      <div className="space-y-4">
        {Object.entries(pattern.params_schema.properties).map(([key, schema]: [string, any]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{schema.title || key}</Label>
            {schema.type === "number" ? (
              <Input
                id={key}
                type="number"
                value={testParameters[key] || schema.default || ""}
                onChange={(e) =>
                  setTestParameters((prev) => ({
                    ...prev,
                    [key]: Number.parseFloat(e.target.value) || 0,
                  }))
                }
                min={schema.minimum}
                max={schema.maximum}
                step={schema.step || 0.1}
              />
            ) : schema.type === "string" && schema.enum ? (
              <Select
                value={testParameters[key] || schema.default || ""}
                onValueChange={(value) =>
                  setTestParameters((prev) => ({
                    ...prev,
                    [key]: value,
                  }))
                }
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
            ) : (
              <Input
                id={key}
                value={testParameters[key] || schema.default || ""}
                onChange={(e) =>
                  setTestParameters((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            )}
            {schema.description && <p className="text-sm text-muted-foreground">{schema.description}</p>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Pruebas y Preview</h2>
        <p className="text-muted-foreground">
          Valida que el patrón se resuelve correctamente y previsualiza el resultado
        </p>
      </div>

      <Tabs defaultValue="test" className="space-y-6">
        <TabsList>
          <TabsTrigger value="test">Configurar Prueba</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="preview">Preview 2D</TabsTrigger>
        </TabsList>

        <TabsContent value="test" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Medidas</CardTitle>
                <CardDescription>Selecciona un conjunto de medidas para la prueba</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Conjunto de medidas</Label>
                  <Select value={selectedMeasurementSet} onValueChange={setSelectedMeasurementSet}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedMeasurementSet === "custom" ? (
                  <div className="space-y-3">
                    {["bust", "waist", "hip", "back_length"].map((measurement) => (
                      <div key={measurement} className="space-y-1">
                        <Label htmlFor={measurement}>{measurement.replace("_", " ")}</Label>
                        <Input
                          id={measurement}
                          type="number"
                          value={customMeasurements[measurement] || ""}
                          onChange={(e) =>
                            setCustomMeasurements((prev) => ({
                              ...prev,
                              [measurement]: Number.parseFloat(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(
                      MEASUREMENT_SETS[selectedMeasurementSet as keyof typeof MEASUREMENT_SETS] || {},
                    ).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace("_", " ")}:</span>
                        <span>{value} cm</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parámetros</CardTitle>
                <CardDescription>Configura los valores de los parámetros para la prueba</CardDescription>
              </CardHeader>
              <CardContent>{renderParameterForm()}</CardContent>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleValidatePattern} disabled={isValidating}>
              <Play className="w-4 h-4 mr-2" />
              {isValidating ? "Validando..." : "Validar Patrón"}
            </Button>
            <Button variant="outline" onClick={handleResolveGeometry} disabled={isResolving}>
              <Eye className="w-4 h-4 mr-2" />
              {isResolving ? "Resolviendo..." : "Resolver Geometría"}
            </Button>
            <Button variant="outline" disabled>
              <Cube className="w-4 h-4 mr-2" />
              Generar 3D (Próximamente)
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {testResults.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No hay resultados de pruebas. Ejecuta una validación para ver los resultados.
                </p>
              </CardContent>
            </Card>
          ) : (
            testResults.map((result) => (
              <Card key={result.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Prueba {result.timestamp.toLocaleTimeString()}</CardTitle>
                    <Badge
                      variant={
                        result.status === "success"
                          ? "default"
                          : result.status === "warning"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {result.status === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {result.status !== "success" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {result.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-destructive">Errores:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.errors.map((error, index) => (
                          <li key={index} className="text-sm text-destructive">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-yellow-600">Advertencias:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-yellow-600">
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Medidas utilizadas:</h4>
                      <div className="space-y-1">
                        {Object.entries(result.measurements).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace("_", " ")}:</span>
                            <span>{value} cm</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Parámetros:</h4>
                      <div className="space-y-1">
                        {Object.entries(result.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview 2D</CardTitle>
              <CardDescription>Visualización del patrón resuelto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Canvas 2D para mostrar el patrón resuelto aparecerá aquí</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
