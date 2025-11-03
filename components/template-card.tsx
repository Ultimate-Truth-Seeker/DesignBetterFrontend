"use client"

import type { Template } from "@/types/template"
import { BadgeUI } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface TemplateCardProps {
  template: Template
  onClick?: () => void
}

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <div
      className="group cursor-pointer rounded-lg border bg-card p-4 transition-all hover:shadow-md"
      onClick={onClick}
    >
      {/* Template Image */}
      <div className="relative mb-3 overflow-hidden rounded-md">
        <img
          src={template.image || "/placeholder.svg"}
          alt={template.title}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
        {template.isNew && <BadgeUI className="absolute right-2 top-2 bg-green-600 text-white">New</BadgeUI>}
      </div>

      {/* Template Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-foreground line-clamp-1">{template.title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{template.rating}</span>
          <span>({template.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">${template.basePrice}</span>
          <span className="text-sm text-muted-foreground">{template.category}</span>
        </div>
      </div>
    </div>
  )
}
