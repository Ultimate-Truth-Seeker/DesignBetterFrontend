"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Review } from "@/types/review"

interface TemplateReviewsProps {
  reviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export function TemplateReviews({ reviews }: TemplateReviewsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Latest reviews</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3 rounded-lg border bg-card p-4">
            {/* Rating */}
            <StarRating rating={review.rating} />

            {/* Review Content */}
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">{review.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{review.body}</p>
            </div>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {review.reviewer.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{review.reviewer.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(review.reviewer.date || "").toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
