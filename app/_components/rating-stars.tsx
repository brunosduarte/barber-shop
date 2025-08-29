"use client"

import { StarIcon } from "lucide-react"
import { cn } from "../_lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
  showValue?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

const RatingStars = ({
  rating,
  maxRating = 5,
  size = 16,
  className,
  showValue = true,
  interactive = false,
  onRatingChange,
}: RatingStarsProps) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= rating
    const isHalfFilled = starValue - 0.5 <= rating && rating < starValue

    return (
      <button
        key={index}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onRatingChange?.(starValue)}
        className={cn(
          "transition-colors",
          interactive && "cursor-pointer hover:scale-110",
          !interactive && "cursor-default",
        )}
      >
        <StarIcon
          size={size}
          className={cn(
            "transition-colors",
            isFilled || isHalfFilled
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-300",
          )}
        />
      </button>
    )
  })

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm font-medium text-gray-600">
          {rating.toFixed(1).replace(".", ",")}
        </span>
      )}
    </div>
  )
}

export default RatingStars
