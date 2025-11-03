"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { BadgeUI } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  if (onFiltersChange?.name) {}
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["Spring", "Smart", "Modern"])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  //const keywords = ["Spring", "Smart", "Modern", "Elegant", "Casual", "Summer", "Urban"]
  const colors = ["Black", "White", "Blue", "Red", "Green", "Navy", "Gray", "Beige"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  return (
    <div className="w-64 space-y-6 border-r bg-background p-4">
      {/* Keywords */}
      <div>
        <h3 className="mb-3 font-medium text-foreground">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {selectedKeywords.map((keyword) => (
            <BadgeUI key={keyword} variant="secondary" className="flex items-center gap-1">
              {keyword}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(keyword)} />
            </BadgeUI>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <div className="space-y-3">
          {["Casual", "Business", "Formal", "Summer"].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-medium text-foreground">Price Range</h3>
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="mb-3 font-medium text-foreground">Colors</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
              />
              <label
                htmlFor={color}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="mb-3 font-medium text-foreground">Sizes</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox id={size} checked={selectedSizes.includes(size)} onCheckedChange={() => toggleSize(size)} />
              <label
                htmlFor={size}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
