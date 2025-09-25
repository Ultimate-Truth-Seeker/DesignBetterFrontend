"use client"

import type { PatternStep, StepInfo } from "@/types/pattern"
import { cn } from "@/lib/utils"
import { FileText, Settings, Shapes, Calculator, Ruler, Code, TestTube, Upload } from "lucide-react"

interface PatternSidebarProps {
  currentStep: PatternStep
  steps: StepInfo[]
  onStepChange: (step: PatternStep) => void
}

const STEP_ICONS = {
  metadatos: FileText,
  parametros: Settings,
  piezas: Shapes,
  formulas: Calculator,
  gradacion: Ruler,
  geometria: Code,
  pruebas: TestTube,
  publicacion: Upload,
}

export function PatternSidebar({ currentStep, steps, onStepChange }: PatternSidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Crear Patrón</h2>
        <p className="text-sm text-muted-foreground">Sigue los pasos para crear tu patrón</p>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[step.key]
            const isActive = currentStep === step.key
            const isClickable = index === 0 || steps[index - 1]?.isComplete

            return (
              <li key={step.key}>
                <button
                  onClick={() => isClickable && onStepChange(step.key)}
                  disabled={!isClickable}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    !isActive && isClickable && "hover:bg-accent hover:text-accent-foreground",
                    !isClickable && "opacity-50 cursor-not-allowed",
                    step.hasErrors && "border-l-2 border-destructive",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{step.title}</div>
                    <div className="text-xs opacity-75 truncate">{step.description}</div>
                  </div>
                  <div className="flex-shrink-0">
                    {step.isComplete && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    {step.hasErrors && <div className="w-2 h-2 bg-destructive rounded-full" />}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Progreso: {steps.filter((s) => s.isComplete).length} / {steps.length}
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(steps.filter((s) => s.isComplete).length / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
