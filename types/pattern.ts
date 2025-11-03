export type PatternStatus = "draft" | "published" | "archived"

export type PatternCategory = "dress" | "shirt" | "pants" | "skirt" | "jacket" | "top" | "other"

export interface PatternMetadata {
  id?: string
  code: string
  name: string
  description: string
  category: PatternCategory
  status: PatternStatus
  version: number
  created_by?: string
  created_at?: string
  updated_at?: string
}

// JSON Schema for parameters
export interface ParameterDefinition {
  key: string
  type: "number" | "string" | "boolean" | "enum"
  default?: any
  minimum?: number
  maximum?: number
  step?: number
  required: boolean
  description: string
  enumValues?: string[]
}

export interface ParamsSchema {
  type: "object"
  properties: Record<
    string,
    {
      type: string
      default?: any
      minimum?: number
      maximum?: number
      enum?: string[]
      description?: string
    }
  >
  required: string[]
}

// Geometric entities for pattern pieces
export interface Point {
  id: string
  x: number | string // Can be numeric or parametric expression
  y: number | string
  label?: string
}

export interface Line {
  id: string
  start: string // Point ID
  end: string // Point ID
  type: "straight" | "curve" | "bezier"
  controlPoints?: Point[]
}

export interface PatternPiece {
  id: string
  name: string
  visible: boolean
  drawOrder: number
  seamAllowance: number
  notches: Point[]
  points: Point[]
  lines: Line[]
  expressions: Record<string, string> // Parametric expressions
}

// Constraints and formulas
export interface Constraint {
  id: string
  type: "forbid" | "require" | "range" | "relation"
  expression: string
  message: string
  severity: "error" | "warning"
}

// Grading rules for sizing
export interface GradingRule {
  id: string
  parameter: string
  baseSize: string
  increments: Record<string, number> // Size name -> value
  method: "linear" | "polynomial"
}

// Complete pattern structure
export interface Pattern extends PatternMetadata {
  params_schema: ParamsSchema
  constraints: Constraint[]
  pieces: PatternPiece[]
  grading_rules: GradingRule[]
  geometry_dsl?: string
}

// Step navigation
export type PatternStep =
  | "metadatos"
  | "parametros"
  | "piezas"
  | "formulas"
  | "gradacion"
  | "geometria"
  | "pruebas"
  | "publicacion"

export interface StepInfo {
  key: PatternStep
  title: string
  description: string
  isComplete: boolean
  hasErrors: boolean
}

// Validation and testing
export interface ValidationError {
  step: PatternStep
  field?: string
  message: string
  severity: "error" | "warning"
}

export interface TestMeasurements {
  bust?: number
  waist?: number
  hips?: number
  back_length?: number
  front_length?: number
  [key: string]: number | undefined
}

export interface PatternTest {
  id: string
  name: string
  measurements: TestMeasurements
  parameters: Record<string, any>
  results?: {
    valid: boolean
    errors: ValidationError[]
    geometry?: any
  }
}
