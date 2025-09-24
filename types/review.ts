export type Review = {
  id: number | string
  templateId: number
  rating: number
  title?: string
  body?: string
  reviewer: {
    name: string
    avatar?: string | null
    date?: string | null
  }
}