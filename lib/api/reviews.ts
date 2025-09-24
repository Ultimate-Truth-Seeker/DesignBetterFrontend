import type { Review } from "@/types/review"

export async function getTemplateReviews(templateId: number | string): Promise<Review[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/plantillas/${templateId}/reviews/`, {
    method: "GET",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Error cargando reseñas")
  return (await res.json()) as Review[]
}

export async function createReview(input: {
  templateId: number | string
  rating: number
  title?: string
  body?: string
}): Promise<Review> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || "No se pudo crear la reseña")
  }
  return (await res.json()) as Review
}