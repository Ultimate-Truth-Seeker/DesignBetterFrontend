"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search } from "lucide-react"
import { SearchFilters } from "@/components/search-filters"
import { TemplateCard } from "@/components/template-card"
import { sampleTemplates } from "@/types/template"

type SortOption = "new" | "price-asc" | "price-desc" | "rating"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("new")
  const [templates] = useState(sampleTemplates)

  const sortOptions = [
    { value: "new" as const, label: "New" },
    { value: "price-asc" as const, label: "Price ascending" },
    { value: "price-desc" as const, label: "Price descending" },
    { value: "rating" as const, label: "Rating" },
  ]

  const sortedTemplates = [...templates].sort((a, b) => {
    switch (sortBy) {
      case "new":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case "price-asc":
        return a.basePrice - b.basePrice
      case "price-desc":
        return b.basePrice - a.basePrice
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Page Title */}
      <div className="border-b bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-foreground">Búsqueda de Plantillas</h1>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl">
        {/* Filters Sidebar */}
        <SearchFilters />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar and Sorting */}
          <div className="mb-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className={sortBy === option.value ? "bg-primary text-primary-foreground" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => {
                  // Navigate to template detail page
                  window.location.href = `/template/${template.id}`
                }}
              />
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {sortedTemplates.length} templates
          </div>
        </div>
      </div>
    </div>
  )
}
