// Mock API functions for pattern operations
// Replace these with actual API calls to your backend

import type { Pattern, ValidationError } from "@/types/pattern"

export class PatternAPI {
  private static baseUrl = "/api/patterns" // Replace with your actual API base URL

  static async getPatterns(): Promise<Pattern[]> {
    // TODO: Replace with actual API call
    console.log("[v0] Fetching patterns from API")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock sample patterns
    return [
      {
        id: "pattern_001",
        code: "SHIRT_001",
        name: "Camisa Básica Masculina",
        description: "Patrón de camisa básica con cuello y mangas largas",
        category: "shirt",
        status: "published",
        version: 2,
        params_schema: {
          type: "object",
          properties: {
            chest: { type: "number", title: "Contorno de pecho", default: 100 },
            waist: { type: "number", title: "Contorno de cintura", default: 90 },
            shoulder: { type: "number", title: "Ancho de hombros", default: 45 },
          },
          required: ["chest", "waist", "shoulder"],
        },
        constraints: [{ formula: "chest > waist", description: "El pecho debe ser mayor que la cintura" }],
        pieces: [
          { id: "front", name: "Delantero", points: [], symmetry: "none" },
          { id: "back", name: "Espalda", points: [], symmetry: "none" },
        ],
        grading_rules: [
          { size: "S", param: "chest", value: 95 },
          { size: "M", param: "chest", value: 100 },
          { size: "L", param: "chest", value: 105 },
        ],
        geometry_dsl: "",
        created_at: "2025-01-15T10:00:00Z",
        updated_at: "2025-01-20T14:30:00Z",
      },
      {
        id: "pattern_002",
        code: "PANTS_001",
        name: "Pantalón Clásico",
        description: "Patrón de pantalón clásico con pinzas",
        category: "pants",
        status: "draft",
        version: 1,
        params_schema: {
          type: "object",
          properties: {
            waist: { type: "number", title: "Contorno de cintura", default: 80 },
            hip: { type: "number", title: "Contorno de cadera", default: 100 },
            inseam: { type: "number", title: "Largo de entrepierna", default: 75 },
          },
          required: ["waist", "hip", "inseam"],
        },
        constraints: [],
        pieces: [
          { id: "front", name: "Delantero", points: [], symmetry: "vertical" },
          { id: "back", name: "Trasero", points: [], symmetry: "vertical" },
        ],
        grading_rules: [],
        geometry_dsl: "",
        created_at: "2025-01-22T09:15:00Z",
        updated_at: "2025-01-22T09:15:00Z",
      },
      {
        id: "pattern_003",
        code: "DRESS_001",
        name: "Vestido de Verano",
        description: "Vestido ligero con falda amplia",
        category: "dress",
        status: "published",
        version: 1,
        params_schema: {
          type: "object",
          properties: {
            bust: { type: "number", title: "Contorno de busto", default: 90 },
            waist: { type: "number", title: "Contorno de cintura", default: 70 },
            length: { type: "number", title: "Largo total", default: 100 },
          },
          required: ["bust", "waist", "length"],
        },
        constraints: [{ formula: "bust > waist", description: "El busto debe ser mayor que la cintura" }],
        pieces: [
          { id: "bodice_front", name: "Corpiño delantero", points: [], symmetry: "vertical" },
          { id: "bodice_back", name: "Corpiño trasero", points: [], symmetry: "vertical" },
          { id: "skirt", name: "Falda", points: [], symmetry: "vertical" },
        ],
        grading_rules: [
          { size: "XS", param: "bust", value: 85 },
          { size: "S", param: "bust", value: 90 },
          { size: "M", param: "bust", value: 95 },
        ],
        geometry_dsl: "",
        created_at: "2025-01-18T11:20:00Z",
        updated_at: "2025-01-19T16:45:00Z",
      },
      {
        id: "pattern_004",
        code: "JACKET_001",
        name: "Chaqueta Deportiva",
        description: "Chaqueta casual con cremallera frontal",
        category: "jacket",
        status: "archived",
        version: 3,
        params_schema: {
          type: "object",
          properties: {
            chest: { type: "number", title: "Contorno de pecho", default: 105 },
            sleeve: { type: "number", title: "Largo de manga", default: 60 },
          },
          required: ["chest", "sleeve"],
        },
        constraints: [],
        pieces: [
          { id: "front", name: "Delantero", points: [], symmetry: "none" },
          { id: "back", name: "Espalda", points: [], symmetry: "none" },
          { id: "sleeve", name: "Manga", points: [], symmetry: "vertical" },
        ],
        grading_rules: [],
        geometry_dsl: "",
        created_at: "2024-12-10T08:00:00Z",
        updated_at: "2025-01-05T10:30:00Z",
      },
    ]
  }

  static async getPattern(id: string): Promise<Pattern | null> {
    // TODO: Replace with actual API call
    console.log("[v0] Fetching pattern by ID:", id)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Get all patterns and find the one with matching ID
    const patterns = await this.getPatterns()
    return patterns.find((p) => p.id === id) || null
  }

  static async deletePattern(id: string): Promise<void> {
    // TODO: Replace with actual API call
    console.log("[v0] Deleting pattern:", id)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  static async duplicatePattern(id: string): Promise<Pattern> {
    // TODO: Replace with actual API call
    console.log("[v0] Duplicating pattern:", id)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get the original pattern and create a copy
    const original = await this.getPattern(id)
    if (!original) {
      throw new Error("Pattern not found")
    }

    return {
      ...original,
      id: `pattern_${Date.now()}`,
      code: `${original.code}_COPY`,
      name: `${original.name} (Copia)`,
      status: "draft",
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  static async savePattern(pattern: Partial<Pattern>): Promise<Pattern> {
    // TODO: Replace with actual API call
    console.log("[v0] Saving pattern to API:", pattern)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate API response
    return {
      ...pattern,
      id: pattern.id || `pattern_${Date.now()}`,
      created_at: pattern.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Pattern
  }

  static async validatePattern(pattern: Partial<Pattern>): Promise<ValidationError[]> {
    // TODO: Replace with actual API call
    console.log("[v0] Validating pattern:", pattern)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate validation errors
    const errors: ValidationError[] = []

    if (!pattern.name) {
      errors.push({
        step: "metadatos",
        field: "name",
        message: "El nombre es requerido",
        severity: "error",
      })
    }

    return errors
  }

  static async checkCodeUniqueness(code: string): Promise<boolean> {
    // TODO: Replace with actual API call
    console.log("[v0] Checking code uniqueness:", code)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate uniqueness check (always return true for demo)
    return true
  }

  static async resolveGeometry(pattern: Partial<Pattern>, parameters: Record<string, any>): Promise<any> {
    // TODO: Replace with actual API call
    console.log("[v0] Resolving geometry:", { pattern, parameters })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate geometry resolution
    return {
      pieces: pattern.pieces?.map((piece) => ({
        ...piece,
        resolvedPoints: piece.points.map((point) => ({
          ...point,
          x: typeof point.x === "string" ? Math.random() * 100 : point.x,
          y: typeof point.y === "string" ? Math.random() * 100 : point.y,
        })),
      })),
    }
  }

  static async publishPattern(patternId: string): Promise<Pattern> {
    // TODO: Replace with actual API call
    console.log("[v0] Publishing pattern:", patternId)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate published pattern response
    return {
      id: patternId,
      status: "published",
      updated_at: new Date().toISOString(),
    } as Pattern
  }
}
