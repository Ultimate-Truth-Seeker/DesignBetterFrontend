export interface MeasurementSchema {
  id: string
  code: string // bust, waist, hips, etc.
  display_name: string
  unit: "cm" | "in"
  min: number
  max: number
  required: boolean
  formula_notes?: string
  created_at: string
}

export interface BodyProfile {
  id: string
  name: string
  gender: "male" | "female" | "unisex" | "other"
  size_system: "US" | "EU" | "UK" | "custom"
  unit_system: "metric" | "imperial"
  measures: Record<string, number> // { bust: 90, waist: 70, ... }
  owner_id?: string
  version: number
  created_at: string
}

export interface MeasurementGuide {
  code: string
  title: string
  description: string
  steps: string[]
  image_url?: string
  tips?: string[]
}

// Mock measurement schema data
export const MEASUREMENT_SCHEMA: MeasurementSchema[] = [
  {
    id: "1",
    code: "bust",
    display_name: "Busto / Pecho",
    unit: "cm",
    min: 70,
    max: 150,
    required: true,
    formula_notes: "Medida alrededor de la parte más ancha del pecho",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    code: "waist",
    display_name: "Cintura",
    unit: "cm",
    min: 50,
    max: 130,
    required: true,
    formula_notes: "Medida alrededor de la parte más estrecha del torso",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    code: "hips",
    display_name: "Cadera",
    unit: "cm",
    min: 70,
    max: 160,
    required: true,
    formula_notes: "Medida alrededor de la parte más ancha de las caderas",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    code: "shoulder_width",
    display_name: "Ancho de Hombros",
    unit: "cm",
    min: 30,
    max: 60,
    required: true,
    formula_notes: "Distancia entre los puntos más externos de los hombros",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    code: "sleeve_length",
    display_name: "Largo de Manga",
    unit: "cm",
    min: 50,
    max: 90,
    required: false,
    formula_notes: "Desde el hombro hasta la muñeca",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    code: "back_length",
    display_name: "Largo de Espalda",
    unit: "cm",
    min: 35,
    max: 60,
    required: true,
    formula_notes: "Desde la base del cuello hasta la cintura",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    code: "neck",
    display_name: "Cuello",
    unit: "cm",
    min: 30,
    max: 50,
    required: false,
    formula_notes: "Circunferencia del cuello",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    code: "inseam",
    display_name: "Entrepierna",
    unit: "cm",
    min: 60,
    max: 100,
    required: false,
    formula_notes: "Desde la entrepierna hasta el tobillo",
    created_at: new Date().toISOString(),
  },
]

// Measurement guides
export const MEASUREMENT_GUIDES: Record<string, MeasurementGuide> = {
  bust: {
    code: "bust",
    title: "Cómo medir el Busto/Pecho",
    description: "Mide alrededor de la parte más ancha del pecho",
    steps: [
      "Coloca la cinta métrica alrededor de tu espalda",
      "Pásala por debajo de las axilas",
      "Llévala al frente sobre la parte más prominente del pecho",
      "Asegúrate de que la cinta esté paralela al suelo",
      "Respira normalmente y toma la medida",
    ],
    tips: [
      "Usa un sostén sin relleno para mayor precisión",
      "No aprietes demasiado la cinta",
      "Pide ayuda a alguien para mayor exactitud",
    ],
  },
  waist: {
    code: "waist",
    title: "Cómo medir la Cintura",
    description: "Mide alrededor de la parte más estrecha del torso",
    steps: [
      "Localiza tu cintura natural (generalmente justo arriba del ombligo)",
      "Coloca la cinta métrica alrededor de tu cintura",
      "Asegúrate de que la cinta esté paralela al suelo",
      "Respira normalmente, no contengas la respiración",
      "Toma la medida sin apretar demasiado",
    ],
    tips: ["No metas el estómago", "La cinta debe estar ajustada pero cómoda", "Mide sobre la piel o ropa ajustada"],
  },
  hips: {
    code: "hips",
    title: "Cómo medir la Cadera",
    description: "Mide alrededor de la parte más ancha de las caderas",
    steps: [
      "Párate derecho con los pies juntos",
      "Localiza la parte más ancha de tus caderas/glúteos",
      "Coloca la cinta métrica alrededor de esta área",
      "Asegúrate de que la cinta esté paralela al suelo",
      "Toma la medida sin apretar",
    ],
    tips: [
      "Usa un espejo para verificar que la cinta esté nivelada",
      "Mide sobre ropa interior o pantalones ajustados",
    ],
  },
  shoulder_width: {
    code: "shoulder_width",
    title: "Cómo medir el Ancho de Hombros",
    description: "Mide la distancia entre los puntos más externos de los hombros",
    steps: [
      "Párate derecho con los hombros relajados",
      "Localiza el punto donde el hombro se une con el brazo",
      "Mide desde este punto en un hombro hasta el mismo punto en el otro",
      "La cinta debe pasar por la parte superior de la espalda",
    ],
    tips: ["Es más fácil con ayuda de otra persona", "No encorves los hombros"],
  },
  sleeve_length: {
    code: "sleeve_length",
    title: "Cómo medir el Largo de Manga",
    description: "Mide desde el hombro hasta la muñeca",
    steps: [
      "Dobla ligeramente el codo",
      "Coloca la cinta en el punto del hombro",
      "Pásala por el codo",
      "Llévala hasta el hueso de la muñeca",
    ],
    tips: ["Mide con el brazo ligeramente doblado", "Pide ayuda para mayor precisión"],
  },
  back_length: {
    code: "back_length",
    title: "Cómo medir el Largo de Espalda",
    description: "Mide desde la base del cuello hasta la cintura",
    steps: [
      "Localiza la vértebra más prominente en la base del cuello",
      "Coloca la cinta en este punto",
      "Mide hacia abajo por el centro de la espalda",
      "Termina en la cintura natural",
    ],
    tips: ["Mantén la espalda recta", "Es más fácil con ayuda"],
  },
  neck: {
    code: "neck",
    title: "Cómo medir el Cuello",
    description: "Mide la circunferencia del cuello",
    steps: [
      "Coloca la cinta alrededor de la base del cuello",
      "Deja espacio para un dedo entre la cinta y el cuello",
      "Asegúrate de que la cinta esté nivelada",
    ],
    tips: ["No aprietes demasiado", "Mide donde normalmente usarías el cuello de una camisa"],
  },
  inseam: {
    code: "inseam",
    title: "Cómo medir la Entrepierna",
    description: "Mide desde la entrepierna hasta el tobillo",
    steps: [
      "Párate derecho con los pies ligeramente separados",
      "Coloca la cinta en la entrepierna",
      "Mide hacia abajo por la parte interna de la pierna",
      "Termina en el tobillo o donde desees que termine el pantalón",
    ],
    tips: ["Usa un pantalón que te quede bien como referencia", "Mide descalzo"],
  },
}
