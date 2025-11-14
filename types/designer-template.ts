import type { PatternStatus } from "./pattern"

// Designer template model - different from customer-facing template
export interface DesignerTemplate {
  id: string
  code: string
  name: string
  pattern_base_id: string // FK to Pattern
  default_params: Record<string, any> // Default parameter values
  exposed_options: ExposedOption[] // UI controls for customization
  compatibility_rules: CompatibilityRule[] // Conditional rules
  materials_policy: MaterialsPolicy // Materials per piece
  size_range: SizeRange // Target sizes/measurements
  media: TemplateMedia // Images
  status: PatternStatus
  version: number
  created_at: string
  updated_at?: string
  created_by?: string
}

// UI control types for exposed parameters
export type ExposedOptionType = "select" | "radio" | "boolean" | "range" | "color"

export interface ExposedOption {
  parameter_key: string // References a parameter from the pattern
  label: string
  type: ExposedOptionType
  options?: string[] // For select/radio
  min?: number // For range
  max?: number // For range
  step?: number // For range
  default?: any
  required: boolean
  description?: string
}

// Compatibility rules between options
export interface CompatibilityRule {
  id: string
  condition: {
    param: string
    operator: "equals" | "not_equals" | "in" | "not_in"
    value: any
  }
  then: {
    param: string
    action: "disable" | "require" | "set" | "suggest"
    value?: any
    allowed_values?: any[]
  }
  message?: string
}

// Materials policy per piece
export interface MaterialsPolicy {
  pieces: Record<
    string,
    {
      allowed_materials: string[] // e.g., ["cotton", "linen", "silk"]
      default_material?: string
      restrictions?: string // Additional notes
    }
  >
}

// Size range definition
export interface SizeRange {
  type: "standard" | "custom"
  sizes?: string[] // For standard: ["XS", "S", "M", "L", "XL"]
  measurements?: {
    // For custom measurements
    min: Record<string, number>
    max: Record<string, number>
  }
}

// Media for template
export interface TemplateMedia {
  hero_url: string
  gallery: string[]
}

// For template creation/editing
export interface TemplateFormData {
  code: string
  name: string
  pattern_base_id: string
  default_params: Record<string, any>
  exposed_options: ExposedOption[]
  compatibility_rules: CompatibilityRule[]
  materials_policy: MaterialsPolicy
  size_range: SizeRange
  media: TemplateMedia
  status: PatternStatus
}

export type TemplateStatus = PatternStatus