export type MeasurementSource = "table" | "custom" | "customer"
export type ConfigurationState = "draft" | "ready" | "approved" | "archived"

export interface Configuration {
  id: string
  template_id: string
  measurement_source: MeasurementSource
  measurement_table_id?: string
  customer_id?: string
  custom_measures?: Record<string, number>
  selected_options: Record<string, any>
  resolved_params: Record<string, any>
  pieces_2d: any | null // Will be implemented later
  material_assignments: Record<string, string> // piece_id -> material_id
  cost_breakdown: {
    base_price: number
    material_costs: Record<string, number>
    customization_fees: number
    total: number
  }
  price_total: number
  state: ConfigurationState
  created_at: string
  updated_at?: string
}

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
