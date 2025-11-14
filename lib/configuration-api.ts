import type { Configuration } from "@/types/configuration"
const exampleConfig1: Configuration = {
  id: "config_1730720123456",
  template_id: "template_basic_tshirt",
  measurement_source: "table",
  measurement_table_id: "table_female_standard_s",
  customer_id: "cust_001",
  custom_measures: undefined,
  selected_options: {
    color: "white",
    size: "S",
    sleeve: "short",
  },
  resolved_params: {
    pattern_scale: 1.0,
    fabric_density: 0.8,
  },
  pieces_2d: null,
  material_assignments: {
    front_panel: "mat_cotton_white",
    back_panel: "mat_cotton_white",
  },
  cost_breakdown: {
    base_price: 20,
    material_costs: {
      mat_cotton_white: 5,
    },
    customization_fees: 2,
    total: 27,
  },
  price_total: 27,
  state: "draft",
  created_at: "2025-11-04T17:00:00.000Z",
}
const exampleConfig2: Configuration = {
  id: "config_1730720999999",
  template_id: "template_formal_dress_v1",
  measurement_source: "custom",
  customer_id: "cust_002",
  custom_measures: {
    bust: 89.5,
    waist: 68.2,
    hips: 95.0,
  },
  selected_options: {
    neckline: "v_shaped",
    length: "long",
    fabric: "silk_red",
  },
  resolved_params: {
    cut_style: "empire",
    seam_allowance: 1.5,
  },
  pieces_2d: null,
  material_assignments: {
    bodice_front: "mat_silk_red",
    skirt_main: "mat_silk_red",
    lining: "mat_satin_beige",
  },
  cost_breakdown: {
    base_price: 60,
    material_costs: {
      mat_silk_red: 15,
      mat_satin_beige: 5,
    },
    customization_fees: 10,
    total: 90,
  },
  price_total: 90,
  state: "ready",
  created_at: "2025-11-04T16:45:00.000Z",
  updated_at: "2025-11-04T17:10:00.000Z",
}
const exampleConfig3: Configuration = {
  id: "config_1730721888888",
  template_id: "template_jacket_modern_v2",
  measurement_source: "customer",
  customer_id: "cust_003",
  measurement_table_id: undefined,
  custom_measures: undefined,
  selected_options: {
    color: "black",
    lining: "polyester_gray",
    zipper: "silver_metal",
  },
  resolved_params: {
    pattern_fit: "slim",
    sleeve_type: "long",
  },
  pieces_2d: null,
  material_assignments: {
    outer_shell: "mat_leather_black",
    lining: "mat_polyester_gray",
  },
  cost_breakdown: {
    base_price: 100,
    material_costs: {
      mat_leather_black: 25,
      mat_polyester_gray: 10,
    },
    customization_fees: 15,
    total: 150,
  },
  price_total: 150,
  state: "approved",
  created_at: "2025-11-03T13:00:00.000Z",
  updated_at: "2025-11-04T10:30:00.000Z",
}
export const mockConfigurations: Configuration[] = [
  exampleConfig1,
  exampleConfig2,
  exampleConfig3,
]
class ConfigurationAPI {
  
  async createConfiguration(config: Partial<Configuration>): Promise<Configuration> {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newConfig: Configuration = {
      id: `config_${Date.now()}`,
      template_id: config.template_id!,
      measurement_source: config.measurement_source || "table",
      measurement_table_id: config.measurement_table_id,
      customer_id: config.customer_id,
      custom_measures: config.custom_measures,
      selected_options: config.selected_options || {},
      resolved_params: config.resolved_params || {},
      pieces_2d: null, // Will be implemented later
      material_assignments: config.material_assignments || {},
      cost_breakdown: config.cost_breakdown || {
        base_price: 0,
        material_costs: {},
        customization_fees: 0,
        total: 0,
      },
      price_total: config.price_total || 0,
      state: "draft",
      created_at: new Date().toISOString(),
      ...config,
    }
    
    console.log("[v0] Created configuration:", newConfig)
    return newConfig
  }

  async updateConfiguration(id: string, updates: Partial<Configuration>): Promise<Configuration> {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("[v0] Updated configuration:", id, updates)
    return {
      id,
      ...updates,
    } as Configuration
  }

  async getConfiguration(id: string): Promise<Configuration | null> {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return mock configuration
    return mockConfigurations.find((c) => c.id == id) || null
  }
}

export const configurationApi = new ConfigurationAPI()
