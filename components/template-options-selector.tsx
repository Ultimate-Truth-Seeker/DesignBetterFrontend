"use client"

import { useState, useMemo } from "react"
import type { DesignerTemplate } from "@/types/designer-template"
import type { CompatibilityRule } from "@/types/configuration"
import { Label } from "@/components/ui/label"
import { InputUI } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TemplateOptionsSelectorProps {
  template: DesignerTemplate
  onOptionsChange: (selectedOptions: Record<string, any>, resolvedParams: Record<string, any>) => void
}

export function TemplateOptionsSelector({ template, onOptionsChange }: TemplateOptionsSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Parse compatibility rules
  const compatibilityRules = useMemo(() => {
    return (template.compatibility_rules as CompatibilityRule[]) || []
  }, [template.compatibility_rules])

  // Check compatibility rules
  const checkCompatibility = (options: Record<string, any>) => {
    const errors: Record<string, string> = {}

    compatibilityRules.forEach((rule) => {
      const conditionMet = evaluateCondition(rule.condition, options)

      if (conditionMet) {
        const targetParam = rule.then.param
        const targetValue = options[targetParam]

        if (rule.then.action === "disable" && targetValue === rule.then.value) {
          errors[targetParam] =
            rule.message ||
            `This option is not compatible with ${rule.condition.param}=${options[rule.condition.param]}`
        } else if (rule.then.action === "require" && !targetValue) {
          errors[targetParam] =
            rule.message || `This option is required when ${rule.condition.param}=${options[rule.condition.param]}`
        }
      }
    })

    return errors
  }

  const evaluateCondition = (condition: CompatibilityRule["condition"], options: Record<string, any>) => {
    const value = options[condition.param]

    switch (condition.operator) {
      case "equals":
        return value === condition.value
      case "not_equals":
        return value !== condition.value
      case "in":
        return Array.isArray(condition.value) && condition.value.includes(value)
      case "not_in":
        return Array.isArray(condition.value) && !condition.value.includes(value)
      default:
        return false
    }
  }

  // Get disabled values for a parameter based on compatibility rules
  const getDisabledValues = (paramName: string, currentOptions: Record<string, any>) => {
    const disabledValues: any[] = []

    compatibilityRules.forEach((rule) => {
      if (rule.then.param === paramName && rule.then.action === "disable") {
        const conditionMet = evaluateCondition(rule.condition, currentOptions)
        if (conditionMet && rule.then.value !== undefined) {
          disabledValues.push(rule.then.value)
        }
      }
    })

    return disabledValues
  }

  // Resolve final parameters
  const resolveParams = (options: Record<string, any>) => {
    const resolved = { ...(template.default_params as Record<string, any>) }

    // Override with selected options
    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined && options[key] !== null) {
        resolved[key] = options[key]
      }
    })

    // Apply compatibility rule transformations
    compatibilityRules.forEach((rule) => {
      const conditionMet = evaluateCondition(rule.condition, options)
      if (conditionMet && rule.then.action === "set") {
        resolved[rule.then.param] = rule.then.value
      }
    })

    return resolved
  }

  // Handle option change
  const handleOptionChange = (paramName: string, value: any) => {
    const newOptions = { ...selectedOptions, [paramName]: value }
    setSelectedOptions(newOptions)

    // Validate compatibility
    const errors = checkCompatibility(newOptions)
    setValidationErrors(errors)

    // Resolve params and notify parent
    const resolvedParams = resolveParams(newOptions)
    onOptionsChange(newOptions, resolvedParams)
  }

  // Render control based on type
  const renderControl = (option: any) => {
    const paramName = option.name
    const disabledValues = getDisabledValues(paramName, selectedOptions)
    const hasError = !!validationErrors[paramName]

    switch (option.type) {
      case "select":
        return (
          <Select
            value={selectedOptions[paramName] || ""}
            onValueChange={(value) => handleOptionChange(paramName, value)}
          >
            <SelectTrigger className={hasError ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${option.label}`} />
            </SelectTrigger>
            <SelectContent>
              {option.options?.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value} disabled={disabledValues.includes(opt.value)}>
                  {opt.label}
                  {disabledValues.includes(opt.value) && " (Not compatible)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "radio":
        return (
          <RadioGroup
            value={selectedOptions[paramName] || ""}
            onValueChange={(value) => handleOptionChange(paramName, value)}
            className={hasError ? "border border-red-500 rounded-md p-2" : ""}
          >
            {option.options?.map((opt: any) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={opt.value}
                  id={`${paramName}-${opt.value}`}
                  disabled={disabledValues.includes(opt.value)}
                />
                <Label
                  htmlFor={`${paramName}-${opt.value}`}
                  className={disabledValues.includes(opt.value) ? "text-muted-foreground line-through" : ""}
                >
                  {opt.label}
                  {disabledValues.includes(opt.value) && " (Not compatible)"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "boolean":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={paramName}
              checked={selectedOptions[paramName] || false}
              onCheckedChange={(checked) => handleOptionChange(paramName, checked)}
              disabled={disabledValues.includes(true)}
              className={hasError ? "border-red-500" : ""}
            />
            <Label htmlFor={paramName}>{option.label}</Label>
          </div>
        )

      case "range":
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{option.min}</span>
              <span className="font-medium">{selectedOptions[paramName] || option.default || option.min}</span>
              <span>{option.max}</span>
            </div>
            <Slider
              value={[selectedOptions[paramName] || option.default || option.min]}
              onValueChange={([value]) => handleOptionChange(paramName, value)}
              min={option.min}
              max={option.max}
              step={option.step || 1}
              className={hasError ? "border-red-500" : ""}
            />
          </div>
        )

      default:
        return (
          <InputUI
            value={selectedOptions[paramName] || ""}
            onChange={(e) => handleOptionChange(paramName, e.target.value)}
            placeholder={option.placeholder}
            className={hasError ? "border-red-500" : ""}
          />
        )
    }
  }

  const exposedOptions = (template.exposed_options as any[]) || []

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Customize Your Template</h3>
        <p className="text-sm text-muted-foreground">
          Select your preferred options. Some options may be restricted based on compatibility rules.
        </p>
      </div>

      {exposedOptions.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This template has no customizable options. Default parameters will be used.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {exposedOptions.map((option) => (
            <div key={option.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">
                  {option.label}
                  {option.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {option.description && <span className="text-xs text-muted-foreground">{option.description}</span>}
              </div>

              {renderControl(option)}

              {validationErrors[option.name] && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationErrors[option.name]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {Object.keys(validationErrors).length === 0 && Object.keys(selectedOptions).length > 0 && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">All options are compatible and valid!</AlertDescription>
        </Alert>
      )}
    </div>
  )
}