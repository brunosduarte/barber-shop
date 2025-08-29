"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { isValidRating } from "../_lib/rating"

interface CreateRatingParams {
  rating: number
  comment?: string
  bookingId: string
}

export const createRating = async (params: CreateRatingParams) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  if (!isValidRating(params.rating)) {
    throw new Error("Avaliação deve ser entre 1 e 5 estrelas")
  }

  // Verify the booking exists and belongs to the current user
  const booking = await db.booking.findUnique({
    where: { id: params.bookingId },
    include: { service: true, rating: true },
  })

  if (!booking) {
    throw new Error("Reserva não encontrada")
  }

  if (booking.userId !== session.user.id) {
    throw new Error("Você não tem permissão para avaliar esta reserva")
  }

  // Check if booking is in the past
  if (booking.date > new Date()) {
    throw new Error("Só é possível avaliar após a realização do serviço")
  }

  // Check if rating already exists
  if (booking.rating) {
    throw new Error("Esta reserva já foi avaliada")
  }

  // Create the rating
  const newRating = await db.rating.create({
    data: {
      rating: params.rating,
      comment: params.comment,
      userId: session.user.id,
      barbershopId: booking.service.barbershopId,
      bookingId: params.bookingId,
    },
  })

  // Update barbershop rating statistics
  await updateBarbershopRatingStats(booking.service.barbershopId)

  revalidatePath("/bookings")
  revalidatePath(`/barbershops/${booking.service.barbershopId}`)
  revalidatePath("/")

  return newRating
}

async function updateBarbershopRatingStats(barbershopId: string) {
  const ratings = await db.rating.findMany({
    where: { barbershopId },
    select: { rating: true },
  })

  const totalRatings = ratings.length
  const averageRating =
    totalRatings > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : null

  await db.barbershop.update({
    where: { id: barbershopId },
    data: {
      averageRating: averageRating,
      totalRatings: totalRatings,
    },
  })
}
