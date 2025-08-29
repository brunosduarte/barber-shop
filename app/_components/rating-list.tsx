"use client"

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"
import RatingStars from "./rating-stars"
import { RatingWithUser } from "../_types/rating"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface RatingListProps {
  ratings: RatingWithUser[]
}

const RatingList = ({ ratings }: RatingListProps) => {
  if (ratings.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">Ainda não há avaliações</p>
        <p className="mt-1 text-sm text-gray-400">
          Seja o primeiro a avaliar este estabelecimento
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Avaliações ({ratings.length})</h3>

      <div className="space-y-3">
        {ratings.map((rating) => (
          <Card key={rating.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={rating.user.image || ""} />
                  <AvatarFallback>
                    {rating.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{rating.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {format(rating.createdAt, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                    <RatingStars
                      rating={rating.rating}
                      size={14}
                      showValue={false}
                    />
                  </div>

                  {rating.comment && (
                    <p className="text-sm text-gray-700">{rating.comment}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RatingList
