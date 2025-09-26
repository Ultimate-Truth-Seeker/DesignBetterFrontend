"use client"

import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import type { PatternStep, StepInfo } from "@/types/pattern"

interface PatternNavigationProps {
  currentStep: PatternStep
  steps: StepInfo[]
  onStepChange: (step: PatternStep) => void
  onSave: () => Promise<void>
  isSaving: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export function PatternNavigation({
  currentStep,
  steps,
  onStepChange,
  onSave,
  isSaving,
  canGoNext,
  canGoPrevious,
}: PatternNavigationProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep)
  const previousStep = currentIndex > 0 ? steps[currentIndex - 1] : null
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null

  const handlePrevious = () => {
    if (previousStep && canGoPrevious) {
      onStepChange(previousStep.key)
    }
  }

  const handleNext = () => {
    if (nextStep && canGoNext) {
      onStepChange(nextStep.key)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-t border-border bg-card">
      <Button variant="outline" onClick={handlePrevious} disabled={!previousStep || !canGoPrevious}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        {previousStep ? previousStep.title : "Anterior"}
      </Button>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Guardando..." : "Guardar Ahora"}
        </Button>

        <span className="text-sm text-muted-foreground">
          Paso {currentIndex + 1} de {steps.length}
        </span>
      </div>

      <Button onClick={handleNext} disabled={!nextStep || !canGoNext}>
        {nextStep ? nextStep.title : "Siguiente"}
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}
