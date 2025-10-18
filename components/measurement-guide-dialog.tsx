"use client"

import type { MeasurementGuide } from "@/types/body-measurement"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

interface MeasurementGuideDialogProps {
  guide: MeasurementGuide
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MeasurementGuideDialog({ guide, open, onOpenChange }: MeasurementGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            {guide.title}
          </DialogTitle>
          <DialogDescription className="text-base">{guide.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Steps */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Pasos a seguir:</h3>
            <ol className="space-y-2">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">Consejos útiles:</h3>
              <ul className="space-y-2">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
