import type { DesignerTemplate, TemplateFormData } from "@/types/designer-template"
import type { Pattern } from "@/types/pattern"

// Mock API for template operations
export const templateApi = {
  // Fetch all templates for the current designer
  async fetchTemplates(): Promise<DesignerTemplate[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock data
    return [
      {
        id: "1",
        code: "TPL-SHIRT-001",
        name: "Classic Button-Down Shirt",
        pattern_base_id: "pat-1",
        default_params: {
          collar_type: "classic",
          sleeve_length: "long",
          fit: "regular",
          pocket: true,
        },
        exposed_options: [
          {
            parameter_key: "collar_type",
            label: "Collar Style",
            type: "select",
            options: ["classic", "button-down", "spread", "cutaway"],
            default: "classic",
            required: true,
          },
          {
            parameter_key: "sleeve_length",
            label: "Sleeve Length",
            type: "radio",
            options: ["short", "long"],
            default: "long",
            required: true,
          },
          {
            parameter_key: "pocket",
            label: "Add Pocket",
            type: "boolean",
            default: true,
            required: false,
          },
        ],
        compatibility_rules: [
          {
            id: "rule-1",
            condition: {
              param: "collar_type",
              operator: "equals",
              value: "button-down"
            },//"collar_type === 'button-down'",
            //action: "suggest",
            then: {
              param: "fit",
              action: "suggest",
              value: "slim"
            },
            //target: "fit === 'slim'",
            message: "Button-down collars work best with slim fit",
          },
        ],
        materials_policy: {
          pieces: {
            body: {
              allowed_materials: ["cotton", "linen", "cotton-blend"],
              default_material: "cotton",
            },
            collar: {
              allowed_materials: ["cotton", "linen"],
              default_material: "cotton",
            },
            cuffs: {
              allowed_materials: ["cotton", "linen"],
              default_material: "cotton",
            },
          },
        },
        size_range: {
          type: "standard",
          sizes: ["S", "M", "L", "XL", "XXL"],
        },
        media: {
          hero_url: "/smart-business-outfit-template.png",
          gallery: ["/smart-business-outfit-template.png"],
        },
        status: "published",
        version: 1,
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "tpl-2",
        code: "TPL-DRESS-001",
        name: "Summer A-Line Dress",
        pattern_base_id: "pat-2",
        default_params: {
          length: "knee",
          neckline: "round",
          sleeves: "sleeveless",
          waist_type: "fitted",
        },
        exposed_options: [
          {
            parameter_key: "length",
            label: "Dress Length",
            type: "select",
            options: ["mini", "knee", "midi", "maxi"],
            default: "knee",
            required: true,
          },
          {
            parameter_key: "neckline",
            label: "Neckline",
            type: "select",
            options: ["round", "v-neck", "square", "boat"],
            default: "round",
            required: true,
          },
          {
            parameter_key: "sleeves",
            label: "Sleeve Style",
            type: "radio",
            options: ["sleeveless", "short", "three-quarter", "long"],
            default: "sleeveless",
            required: true,
          },
        ],
        compatibility_rules: [],
        materials_policy: {
          pieces: {
            bodice: {
              allowed_materials: ["cotton", "linen", "silk", "rayon"],
              default_material: "cotton",
            },
            skirt: {
              allowed_materials: ["cotton", "linen", "silk", "rayon"],
              default_material: "cotton",
            },
          },
        },
        size_range: {
          type: "standard",
          sizes: ["XS", "S", "M", "L", "XL"],
        },
        media: {
          hero_url: "/elegant-evening-dress-template.png",
          gallery: ["/elegant-evening-dress-template.png"],
        },
        status: "published",
        version: 1,
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "tpl-3",
        code: "TPL-PANTS-001",
        name: "Tailored Trousers",
        pattern_base_id: "pat-3",
        default_params: {
          fit: "regular",
          rise: "mid",
          leg_style: "straight",
          pleats: false,
        },
        exposed_options: [
          {
            parameter_key: "fit",
            label: "Fit",
            type: "select",
            options: ["slim", "regular", "relaxed"],
            default: "regular",
            required: true,
          },
          {
            parameter_key: "leg_style",
            label: "Leg Style",
            type: "select",
            options: ["straight", "tapered", "wide"],
            default: "straight",
            required: true,
          },
          {
            parameter_key: "pleats",
            label: "Add Pleats",
            type: "boolean",
            default: false,
            required: false,
          },
        ],
        compatibility_rules: [
          {
            id: "rule-2",
            condition: {
              param: "fit",
              operator: "equals",
              value: "slim"
            },//"collar_type === 'button-down'",
            //action: "suggest",
            then: {
              param: "pleats",
              action: "disable",
              value: "true"
            },
            //target: "fit === 'slim'",
            message: "Slim fit pants cannot have pleats",
          },
        ],
        materials_policy: {
          pieces: {
            front: {
              allowed_materials: ["wool", "cotton", "polyester-blend"],
              default_material: "wool",
            },
            back: {
              allowed_materials: ["wool", "cotton", "polyester-blend"],
              default_material: "wool",
            },
            waistband: {
              allowed_materials: ["wool", "cotton"],
              default_material: "wool",
            },
          },
        },
        size_range: {
          type: "standard",
          sizes: ["28", "30", "32", "34", "36", "38", "40"],
        },
        media: {
          hero_url: "/casual-weekend-style-template.png",
          gallery: ["/casual-weekend-style-template.png"],
        },
        status: "draft",
        version: 1,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  },

  // Fetch a single template by ID
  async fetchTemplate(id: string): Promise<DesignerTemplate | null> {
    const templates = await this.fetchTemplates()
    return templates.find((t) => t.id === id) || null
  },

  // Create new template
  async createTemplate(data: Partial<TemplateFormData>): Promise<DesignerTemplate> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("[v0] Creating template:", data)

    // Mock response
    const newTemplate: DesignerTemplate = {
      id: `tpl-${Date.now()}`,
      code: data.code || "",
      name: data.name || "",
      pattern_base_id: data.pattern_base_id || "",
      default_params: data.default_params || {},
      exposed_options: data.exposed_options || [],
      compatibility_rules: data.compatibility_rules || [],
      materials_policy: data.materials_policy || { pieces: {} },
      size_range: data.size_range || { type: "standard", sizes: [] },
      media: data.media || { hero_url: "", gallery: [] },
      status: data.status || "draft",
      version: 1,
      created_at: new Date().toISOString(),
    }

    return newTemplate
  },

  // Update existing template
  async updateTemplate(id: string, data: Partial<TemplateFormData>): Promise<DesignerTemplate> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("[v0] Updating template:", { id, data })

    // Mock response - merge with existing data
    const existingTemplate = await this.fetchTemplate(id)
    if (!existingTemplate) {
      throw new Error("Template not found")
    }

    return {
      ...existingTemplate,
      ...data,
      id, // Keep the same ID
      version: existingTemplate.version + 1,
    }
  },

  // Save template (create or update) - kept for backward compatibility
  async saveTemplate(data: Partial<TemplateFormData>, id?: string): Promise<DesignerTemplate> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("[v0] Saving template:", { id, data })

    // Mock response
    return {
      id: id || `tpl-${Date.now()}`,
      code: data.code || "",
      name: data.name || "",
      pattern_base_id: data.pattern_base_id || "",
      default_params: data.default_params || {},
      exposed_options: data.exposed_options || [],
      compatibility_rules: data.compatibility_rules || [],
      materials_policy: data.materials_policy || { pieces: {} },
      size_range: data.size_range || { type: "standard", sizes: [] },
      media: data.media || { hero_url: "", gallery: [] },
      status: data.status || "draft",
      version: 1,
      created_at: new Date().toISOString(),
    }
  },

  // Delete template
  async deleteTemplate(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log("[v0] Deleting template:", id)
  },

  // Duplicate template
  async duplicateTemplate(id: string): Promise<DesignerTemplate> {
    const template = await this.fetchTemplate(id)
    if (!template) throw new Error("Template not found")

    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      ...template,
      id: `tpl-${Date.now()}`,
      code: `${template.code}-COPY`,
      name: `${template.name} (Copy)`,
      status: "draft",
      created_at: new Date().toISOString(),
    }
  },

  // Fetch available patterns for template creation
  async fetchAvailablePatterns(): Promise<Pattern[]> {
    // This would fetch patterns from the pattern API
    // For now, return mock data
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: "pat-1",
        code: "PAT-SHIRT-001",
        name: "Basic Shirt Pattern",
        description: "Classic button-down shirt pattern",
        category: "shirt",
        status: "published",
        version: 1,
        params_schema: {
          type: "object",
          properties: {
            collar_type: {
              type: "string",
              enum: ["classic", "button-down", "spread", "cutaway"],
              default: "classic",
            },
            sleeve_length: {
              type: "string",
              enum: ["short", "long"],
              default: "long",
            },
            fit: {
              type: "string",
              enum: ["slim", "regular", "relaxed"],
              default: "regular",
            },
            pocket: {
              type: "boolean",
              default: true,
            },
          },
          required: ["collar_type", "sleeve_length", "fit"],
        },
        constraints: [],
        pieces: [],
        grading_rules: [],
      },
      {
        id: "pat-2",
        code: "PAT-DRESS-001",
        name: "A-Line Dress Pattern",
        description: "Versatile A-line dress pattern",
        category: "dress",
        status: "published",
        version: 1,
        params_schema: {
          type: "object",
          properties: {
            length: {
              type: "string",
              enum: ["mini", "knee", "midi", "maxi"],
              default: "knee",
            },
            neckline: {
              type: "string",
              enum: ["round", "v-neck", "square", "boat"],
              default: "round",
            },
            sleeves: {
              type: "string",
              enum: ["sleeveless", "short", "three-quarter", "long"],
              default: "sleeveless",
            },
            waist_type: {
              type: "string",
              enum: ["fitted", "empire", "natural"],
              default: "fitted",
            },
          },
          required: ["length", "neckline", "sleeves"],
        },
        constraints: [],
        pieces: [],
        grading_rules: [],
      },
      {
        id: "pat-3",
        code: "PAT-PANTS-001",
        name: "Tailored Pants Pattern",
        description: "Classic tailored trousers pattern",
        category: "pants",
        status: "published",
        version: 1,
        params_schema: {
          type: "object",
          properties: {
            fit: {
              type: "string",
              enum: ["slim", "regular", "relaxed"],
              default: "regular",
            },
            rise: {
              type: "string",
              enum: ["low", "mid", "high"],
              default: "mid",
            },
            leg_style: {
              type: "string",
              enum: ["straight", "tapered", "wide"],
              default: "straight",
            },
            pleats: {
              type: "boolean",
              default: false,
            },
          },
          required: ["fit", "rise", "leg_style"],
        },
        constraints: [],
        pieces: [],
        grading_rules: [],
      },
    ]
  },
}
