import { Prisma } from "@/generated/prisma/client"

export type RatingWithUser = Prisma.RatingGetPayload<{
  include: {
    user: {
      select: {
        id: true
        name: true
        image: true
      }
    }
  }
}>

export type BarbershopWithRatings = Prisma.BarbershopGetPayload<{
  include: {
    ratings: {
      include: {
        user: true
      }
    }
    services: true
  }
}>

export type BarbershopWithRatingStats = Omit<
  Prisma.BarbershopGetPayload<{
    include: {
      services: true
    }
  }>,
  "averageRating"
> & {
  averageRating: number | null
  totalRatings: number
}
