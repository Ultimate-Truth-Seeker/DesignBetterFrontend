"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Heart, ExternalLink } from "lucide-react"
import { TemplateReviews } from "@/components/template-reviews"
import { TemplateCarousel } from "@/components/template-carousel"
import { sampleTemplates } from "@/types/template"
import { sampleReviews } from "@/types/review"

export default function TemplateDetailPage() {
  const params = useParams()
  const templateId = params.id as string

  // Find the template (in real app, this would be an API call)
  const template = sampleTemplates.find((t) => t.id === templateId) || sampleTemplates[0]
  const reviews = sampleReviews.filter((r) => r.templateId === templateId)
  const recommendedTemplates = sampleTemplates.filter((t) => t.id !== templateId).slice(0, 6)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Page Title */}
      <div className="border-b bg-background px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-foreground">Detalle de Plantilla</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Template Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                className="h-96 w-full object-cover lg:h-[500px]"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 h-8 w-8 p-0"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </Button>
            </div>
          </div>

          {/* Template Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {template.category}
                </Badge>
                {template.isNew && <Badge className="bg-green-600 text-white">New</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground">{template.title}</h1>
              <p className="text-2xl font-semibold text-foreground">${template.basePrice}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-muted-foreground">
                High-quality template perfect for your design needs. Fully customizable with multiple options for
                colors, sizes, and styles.
              </p>
            </div>

            {/* Customization Options */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {template.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {template.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                Personaliza esta plantilla
              </Button>

              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                size="lg"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visualizar en 3D
              </Button>
            </div>

            {/* Additional Info */}
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50">
                <span className="font-medium">Additional Information</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  This template includes all necessary files and documentation. Compatible with major design software
                  and fully customizable to match your brand requirements.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <TemplateReviews reviews={reviews} />
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <TemplateCarousel
            title="También te recomendamos"
            templates={recommendedTemplates}
            onTemplateClick={(template) => {
              window.location.href = `/template/${template.id}`
            }}
          />
        </div>
      </div>
    </div>
  )
}
