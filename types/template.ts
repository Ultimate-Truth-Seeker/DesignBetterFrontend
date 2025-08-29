// Template data structure
export interface Template {
  id: string
  title: string
  image: string
  basePrice: number
  category: string
  tags: string[]
  colors: string[]
  sizes: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
}

// Sample template data
export const sampleTemplates: Template[] = [
  {
    id: "1",
    title: "Modern Spring Outfit",
    image: "/modern-spring-outfit-template.png",
    basePrice: 45,
    category: "Casual",
    tags: ["Spring", "Modern", "Casual"],
    colors: ["Blue", "White", "Green"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
  },
  {
    id: "2",
    title: "Smart Business Look",
    image: "/smart-business-outfit-template.png",
    basePrice: 89,
    category: "Business",
    tags: ["Smart", "Business", "Professional"],
    colors: ["Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "3",
    title: "Elegant Evening Dress",
    image: "/elegant-evening-dress-template.png",
    basePrice: 120,
    category: "Formal",
    tags: ["Elegant", "Evening", "Formal"],
    colors: ["Black", "Red", "Navy"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviewCount: 156,
    isNew: true,
  },
  {
    id: "4",
    title: "Casual Weekend Style",
    image: "/casual-weekend-style-template.png",
    basePrice: 35,
    category: "Casual",
    tags: ["Casual", "Weekend", "Comfortable"],
    colors: ["Denim", "White", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: "5",
    title: "Summer Beach Outfit",
    image: "/summer-beach-outfit-template.png",
    basePrice: 55,
    category: "Summer",
    tags: ["Summer", "Beach", "Light"],
    colors: ["Coral", "Turquoise", "White"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: "6",
    title: "Urban Street Style",
    image: "/urban-street-style-template.png",
    basePrice: 65,
    category: "Street",
    tags: ["Urban", "Street", "Trendy"],
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 112,
  },
]
