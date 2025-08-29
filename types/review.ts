export interface Review {
  id: string
  templateId: string
  rating: number
  title: string
  body: string
  reviewer: {
    name: string
    avatar?: string
    date: string
  }
}

// Sample review data
export const sampleReviews: Review[] = [
  {
    id: "1",
    templateId: "1",
    rating: 5,
    title: "Amazing template!",
    body: "This template exceeded my expectations. The quality is outstanding and the customization options are perfect for my needs.",
    reviewer: {
      name: "Maria Rodriguez",
      avatar: "/diverse-woman-portrait.png",
      date: "2024-01-15",
    },
  },
  {
    id: "2",
    templateId: "1",
    rating: 4,
    title: "Great value for money",
    body: "Really impressed with the attention to detail. The template is well-designed and easy to customize. Highly recommended!",
    reviewer: {
      name: "John Smith",
      avatar: "/thoughtful-man.png",
      date: "2024-01-12",
    },
  },
  {
    id: "3",
    templateId: "1",
    rating: 5,
    title: "Perfect for my project",
    body: "Exactly what I was looking for. The template is modern, clean, and very professional. Will definitely buy more from this designer.",
    reviewer: {
      name: "Sarah Johnson",
      avatar: "/professional-woman.png",
      date: "2024-01-10",
    },
  },
]
