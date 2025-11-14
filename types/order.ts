export type PaymentMethod = "bank_transfer" | "cash_on_delivery" | "paypal" | "credit_card" | "crypto"

export type OrderStatus = "pending" | "confirmed" | "in_production" | "ready" | "shipped" | "delivered" | "cancelled"

export interface Order {
  id: string
  user_id: string
  configuration_id: string
  designer_id?: string
  payment_method: PaymentMethod
  payment_status: "pending" | "paid" | "failed" | "refunded"
  order_status: OrderStatus
  total_amount: number
  created_at: string
  updated_at: string
  estimated_delivery?: string
  tracking_number?: string
  notes?: string
}

export interface OrderWithDetails extends Order {
  configuration: {
    id: string
    template_name: string
    template_code: string
    selected_options: Record<string, any>
    material_assignments: Record<string, string>
    cost_breakdown: {
      base_price: number
      material_costs: Record<string, number>
      customization_fees: number
      total: number
    }
  }
  designer?: {
    id: string
    name: string
    email: string
  }
}
