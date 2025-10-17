"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { PatternSidebar } from "@/components/pattern-creator/pattern-sidebar"
import { PatternContextPanel } from "@/components/pattern-creator/pattern-context-panel"
import { PatternNavigation } from "@/components/pattern-creator/pattern-navigation"
import { PageHeader } from "@/components/page-header"
import { usePatternAutosave } from "@/hooks/use-pattern-autosave"
import { PatternAPI } from "@/lib/pattern-api"
import type { Pattern, PatternStep, StepInfo, ValidationError } from "@/types/pattern"
import { MetadatosStep } from "@/components/pattern-creator/steps/metadatos-step"
import { ParametrosStep } from "@/components/pattern-creator/steps/parametros-step"
import { PiezasStep } from "@/components/pattern-creator/steps/piezas-step"
import { FormulasStep } from "@/components/pattern-creator/steps/formulas-step"
import { GradacionStep } from "@/components/pattern-creator/steps/gradacion-step"
import { PruebasStep } from "@/components/pattern-creator/steps/pruebas-step"
import { PublicacionStep } from "@/components/pattern-creator/steps/publicacion-step"
import { toast } from "sonner"

// Initial pattern state
const initialPattern: Partial<Pattern> = {
  code: "",
  name: "",
  description: "",
  category: "other",
  status: "draft",
  version: 1,
  params_schema: {
    type: "object",
    properties: {},
    required: [],
  },
  constraints: [],
  pieces: [],
  grading_rules: [],
  geometry_dsl: "",
}

const BASE_STEPS: Omit<StepInfo, "isComplete" | "hasErrors">[] = [
  {
    key: "metadatos",
    title: "Metadatos",
    description: "Información básica",
  },
  {
    key: "parametros",
    title: "Parámetros",
    description: "Definir variables",
  },
  {
    key: "piezas",
    title: "Piezas",
    description: "Diseño geométrico",
  },
  {
    key: "formulas",
    title: "Fórmulas",
    description: "Reglas y restricciones",
  },
  {
    key: "gradacion",
    title: "Gradación",
    description: "Escalado de tallas",
  },
  {
    key: "geometria",
    title: "Geometría DSL",
    description: "Editor avanzado",
  },
  {
    key: "pruebas",
    title: "Pruebas",
    description: "Validación y preview",
  },
  {
    key: "publicacion",
    title: "Publicación",
    description: "Versionar y publicar",
  },
]

export default function CrearPatronPage() {
  const searchParams = useSearchParams()
  const patternId = searchParams.get("id")

  const [currentStep, setCurrentStep] = useState<PatternStep>("metadatos")
  const [pattern, setPattern] = useState<Partial<Pattern>>(initialPattern)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [lastSaved, setLastSaved] = useState<Date>()
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(!!patternId)

  useEffect(() => {
    if (patternId) {
      loadPattern(patternId)
    }
  }, [patternId])

  const loadPattern = async (id: string) => {
    setIsLoading(true)
    try {
      const existingPattern = await PatternAPI.getPattern(id)
      if (existingPattern) {
        setPattern(existingPattern)
        toast.success("Patrón cargado correctamente")
      } else {
        toast.error("Patrón no encontrado")
      }
    } catch (error) {
      console.error("Failed to load pattern:", error)
      toast.error("Error al cargar el patrón")
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = useCallback(
    (step: PatternStep): ValidationError[] => {
      const errors: ValidationError[] = []

      switch (step) {
        case "metadatos":
          if (!pattern.name?.trim()) {
            errors.push({
              step,
              field: "name",
              message: "El nombre es requerido",
              severity: "error",
            })
          }
          if (!pattern.code?.trim()) {
            errors.push({
              step,
              field: "code",
              message: "El código es requerido",
              severity: "error",
            })
          }
          if (!pattern.category) {
            errors.push({
              step,
              field: "category",
              message: "La categoría es requerida",
              severity: "error",
            })
          }
          break
        case "parametros":
          if (!pattern.params_schema?.properties || Object.keys(pattern.params_schema.properties).length === 0) {
            errors.push({
              step,
              message: "Debe definir al menos un parámetro",
              severity: "error",
            })
          }
          break
        case "piezas":
          if (!pattern.pieces || pattern.pieces.length === 0) {
            errors.push({
              step,
              message: "Debe crear al menos una pieza",
              severity: "error",
            })
          }
          break
        case "formulas":
          if (!pattern.constraints || pattern.constraints.length === 0) {
            errors.push({
              step,
              message: "Se recomienda definir al menos una restricción",
              severity: "warning",
            })
          }
          break
        case "gradacion":
          if (!pattern.grading_rules || pattern.grading_rules.length === 0) {
            errors.push({
              step,
              message: "Las reglas de gradación son opcionales pero recomendadas",
              severity: "warning",
            })
          }
          break
        case "pruebas":
          // This step doesn't modify the pattern, so no validation needed
          break
        case "publicacion":
          if (pattern.status === "draft") {
            errors.push({
              step,
              message: "El patrón está en borrador",
              severity: "warning",
            })
          }
          break
      }

      return errors
    },
    [pattern],
  )

  const steps = useMemo(() => {
    return BASE_STEPS.map((baseStep) => {
      const stepErrors = validateStep(baseStep.key)
      const hasErrors = stepErrors.some((e) => e.severity === "error")
      const hasWarnings = stepErrors.some((e) => e.severity === "warning")

      let isComplete = false
      switch (baseStep.key) {
        case "metadatos":
          isComplete = !!(pattern.name && pattern.code && pattern.category)
          break
        case "parametros":
          isComplete = !!(pattern.params_schema?.properties && Object.keys(pattern.params_schema.properties).length > 0)
          break
        case "piezas":
          isComplete = !!(pattern.pieces && pattern.pieces.length > 0)
          break
        case "formulas":
          isComplete = !!(pattern.constraints && pattern.constraints.length > 0)
          break
        case "gradacion":
          isComplete = !!(pattern.grading_rules && pattern.grading_rules.length > 0)
          break
        case "geometria":
          isComplete = true // Optional step
          break
        case "pruebas":
          isComplete = true // Testing step, always considered complete
          break
        case "publicacion":
          isComplete = !!(pattern.name && pattern.code && pattern.params_schema?.properties && pattern.pieces?.length)
          break
      }

      return {
        ...baseStep,
        isComplete: isComplete && !hasErrors,
        hasErrors: hasErrors || hasWarnings,
      }
    })
  }, [pattern, validateStep])

  useEffect(() => {
    const allErrors = BASE_STEPS.flatMap((step) => validateStep(step.key))
    setValidationErrors(allErrors)
  }, [pattern, validateStep])

  // Manual save function
  const savePattern = useCallback(async () => {
    if (!isDirty || isSaving) return

    setIsSaving(true)
    try {
      const savedPattern = await PatternAPI.savePattern(pattern)
      setPattern(savedPattern)
      setLastSaved(new Date())
      setIsDirty(false)
      toast.success("Patrón guardado correctamente")
    } catch (error) {
      console.error("Failed to save pattern:", error)
      toast.error("Error al guardar el patrón")
    } finally {
      setIsSaving(false)
    }
  }, [pattern, isDirty, isSaving])

  // Set up auto-save
  const { saveNow } = usePatternAutosave({
    pattern,
    isDirty,
    onSave: savePattern,
    onSaveSuccess: (timestamp) => {
      setLastSaved(timestamp)
      setIsDirty(false)
    },
    onSaveError: (error) => {
      console.error("Auto-save failed:", error)
      toast.error("Error en el guardado automático")
    },
  })

  // Update pattern data
  const updatePattern = useCallback((updates: Partial<Pattern>) => {
    setPattern((prev) => ({ ...prev, ...updates }))
    setIsDirty(true)
  }, [])

  const handleStepChange = (step: PatternStep) => {
    setCurrentStep(step)
  }

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)
  const currentStepInfo = steps[currentStepIndex]
  const canGoNext = currentStepInfo?.isComplete || currentStepIndex === steps.length - 1
  const canGoPrevious = currentStepIndex > 0

  const renderStepContent = () => {
    switch (currentStep) {
      case "metadatos":
        return <MetadatosStep pattern={pattern} onUpdate={updatePattern} />
      case "parametros":
        return <ParametrosStep pattern={pattern} onUpdate={updatePattern} />
      case "piezas":
        return <PiezasStep pattern={pattern} onUpdate={updatePattern} />
      case "formulas":
        return <FormulasStep pattern={pattern} onUpdate={updatePattern} />
      case "gradacion":
        return <GradacionStep pattern={pattern} onUpdate={updatePattern} />
      case "pruebas":
        return <PruebasStep pattern={pattern} onUpdate={updatePattern} />
      case "publicacion":
        return <PublicacionStep pattern={pattern} onUpdate={updatePattern} />
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {steps.find((s) => s.key === currentStep)?.title}
            </h2>
            <p className="text-muted-foreground mb-4">{steps.find((s) => s.key === currentStep)?.description}</p>
            <p className="text-sm text-muted-foreground">Componente del paso "{currentStep}" será implementado aquí</p>
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title={patternId ? "Editar Patrón" : "Crear Patrón"} />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando patrón...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={patternId ? "Editar Patrón" : "Crear Patrón"} />

      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex flex-1 overflow-hidden">
          <PatternSidebar currentStep={currentStep} steps={steps} onStepChange={handleStepChange} />

          <main className="flex-1 overflow-hidden">
            <div className="h-full p-6">
              <div className="bg-card rounded-lg border border-border h-full overflow-auto">
                <div className="p-6">{renderStepContent()}</div>
              </div>
            </div>
          </main>

          <PatternContextPanel
            currentStep={currentStep}
            validationErrors={validationErrors}
            lastSaved={lastSaved}
            isDirty={isDirty}
          />
        </div>

        <PatternNavigation
          currentStep={currentStep}
          steps={steps}
          onStepChange={handleStepChange}
          onSave={saveNow}
          isSaving={isSaving}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
      </div>
    </div>
  )
}
