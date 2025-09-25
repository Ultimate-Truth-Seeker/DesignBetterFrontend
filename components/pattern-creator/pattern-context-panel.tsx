"use client"

import type { PatternStep, ValidationError } from "@/types/pattern"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"

interface PatternContextPanelProps {
  currentStep: PatternStep
  validationErrors: ValidationError[]
  lastSaved?: Date
  isDirty: boolean
}

const STEP_HELP = {
  metadatos: {
    title: "Información Básica",
    content: [
      "Completa la información básica del patrón",
      "El código debe ser único y se genera automáticamente",
      "Selecciona la categoría apropiada para obtener parámetros predeterminados",
    ],
  },
  parametros: {
    title: "Definición de Parámetros",
    content: [
      "Define los parámetros que controlarán tu patrón",
      "Usa el editor visual o el modo JSON avanzado",
      "Los parámetros pueden ser números, texto, booleanos o enumeraciones",
    ],
  },
  piezas: {
    title: "Diseño de Piezas",
    content: [
      "Crea las piezas geométricas de tu patrón",
      "Usa expresiones paramétricas para hacer las piezas dinámicas",
      "Define puntos de referencia y líneas de construcción",
    ],
  },
  formulas: {
    title: "Reglas y Restricciones",
    content: [
      "Define reglas que deben cumplir los parámetros",
      "Crea relaciones entre diferentes medidas",
      "Establece rangos válidos y validaciones",
    ],
  },
  gradacion: {
    title: "Escalado de Tallas",
    content: [
      "Define cómo cambian las medidas entre tallas",
      "Configura curvas de crecimiento para cada parámetro",
      "Previsualiza el escalado en diferentes tallas",
    ],
  },
  geometria: {
    title: "DSL de Geometría",
    content: [
      "Editor avanzado para definir geometría con código",
      "Usa el lenguaje DSL para operaciones complejas",
      "Opcional: solo si necesitas funciones avanzadas",
    ],
  },
  pruebas: {
    title: "Validación y Pruebas",
    content: [
      "Prueba tu patrón con diferentes medidas",
      "Valida que todas las reglas se cumplan",
      "Genera previsualizaciones 2D y 3D",
    ],
  },
  publicacion: {
    title: "Publicación",
    content: [
      "Revisa todos los cambios antes de publicar",
      "Crea una nueva versión del patrón",
      "Publica para que esté disponible para uso",
    ],
  },
}

export function PatternContextPanel({ currentStep, validationErrors, lastSaved, isDirty }: PatternContextPanelProps) {
  const stepHelp = STEP_HELP[currentStep]
  const stepErrors = validationErrors.filter((error) => error.step === currentStep)

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">{stepHelp.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          {isDirty ? (
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Sin guardar
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Guardado
            </Badge>
          )}
          {lastSaved && <span className="text-xs text-muted-foreground">{lastSaved.toLocaleTimeString()}</span>}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Help Content */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Ayuda</h4>
            <ul className="space-y-1">
              {stepHelp.content.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Validation Errors */}
          {stepErrors.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Validaciones</h4>
              <div className="space-y-2">
                {stepErrors.map((error, index) => (
                  <Alert key={index} variant={error.severity === "error" ? "destructive" : "default"}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {error.field && <strong>{error.field}: </strong>}
                      {error.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Acciones Rápidas</h4>
            <div className="space-y-2">
              {currentStep === "parametros" && (
                <button className="w-full text-left text-xs text-primary hover:underline">
                  Cargar parámetros predeterminados
                </button>
              )}
              {currentStep === "piezas" && (
                <button className="w-full text-left text-xs text-primary hover:underline">
                  Importar pieza desde plantilla
                </button>
              )}
              {currentStep === "pruebas" && (
                <button className="w-full text-left text-xs text-primary hover:underline">Usar medidas estándar</button>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
