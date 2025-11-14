import type { Order, OrderWithDetails, PaymentMethod } from "@/types/order"

class OrderAPI {
  private mockOrders: OrderWithDetails[] = [
    {
      id: "order_1",
      user_id: "user_1",
      configuration_id: "config_1",
      designer_id: "designer_1",
      payment_method: "bank_transfer",
      payment_status: "paid",
      order_status: "in_production",
      total_amount: 125.5,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimated_delivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      configuration: {
        id: "config_1",
        template_name: "Camisa Clásica",
        template_code: "SHIRT_001",
        selected_options: {
          collar: "classic",
          cuff: "french",
          pocket: "single",
        },
        material_assignments: {
          body: "cotton",
          collar: "cotton",
          cuffs: "cotton",
        },
        cost_breakdown: {
          base_price: 80,
          material_costs: { body: 20, collar: 10, cuffs: 10 },
          customization_fees: 5.5,
          total: 125.5,
        },
      },
      designer: {
        id: "designer_1",
        name: "María García",
        email: "maria@example.com",
      },
    },
    {
      id: "order_2",
      user_id: "user_1",
      configuration_id: "config_2",
      designer_id: "designer_2",
      payment_method: "credit_card",
      payment_status: "paid",
      order_status: "delivered",
      total_amount: 95.0,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      estimated_delivery: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      tracking_number: "TRACK123456",
      configuration: {
        id: "config_2",
        template_name: "Pantalón Casual",
        template_code: "PANTS_001",
        selected_options: {
          fit: "slim",
          length: "regular",
          pockets: "standard",
        },
        material_assignments: {
          body: "denim",
          pockets: "cotton",
        },
        cost_breakdown: {
          base_price: 60,
          material_costs: { body: 25, pockets: 5 },
          customization_fees: 5.0,
          total: 95.0,
        },
      },
      designer: {
        id: "designer_2",
        name: "Carlos Rodríguez",
        email: "carlos@example.com",
      },
    },
  ]

  async createOrder(data: {
    user_id: string
    configuration_id: string
    designer_id?: string
    payment_method: PaymentMethod
    total_amount: number
  }): Promise<Order> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const order: Order = {
      id: `order_${Date.now()}`,
      user_id: data.user_id,
      configuration_id: data.configuration_id,
      designer_id: data.designer_id,
      payment_method: data.payment_method,
      payment_status: "pending",
      order_status: "pending",
      total_amount: data.total_amount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      estimated_delivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    }

    console.log("[v0] Order created:", order)
    return order
  }

  async fetchOrders(userId: string): Promise<OrderWithDetails[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Filter orders by user
    const userOrders = this.mockOrders.filter((order) => order.user_id === userId)

    console.log("[v0] Fetched orders for user:", userId, userOrders.length)
    return userOrders
  }

  async fetchOrder(orderId: string): Promise<OrderWithDetails | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const order = this.mockOrders.find((o) => o.id === orderId)

    console.log("[v0] Fetched order:", orderId, order ? "found" : "not found")
    return order || null
  }

  async cancelOrder(orderId: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("[v0] Order cancelled:", orderId)
  }
}

export const orderApi = new OrderAPI()
