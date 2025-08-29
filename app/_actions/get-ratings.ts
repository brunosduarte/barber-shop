"use server"

import { db } from "../_lib/prisma"

export const getBarbershopRatings = async (barbershopId: string) => {
  const ratings = await db.rating.findMany({
    where: { barbershopId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return ratings
}

export const getUserCompletedBookingsWithoutRating = async (userId: string) => {
  const bookings = await db.booking.findMany({
    where: {
      userId,
      date: {
        lt: new Date(), // Only past bookings
      },
      rating: null, // Only bookings without ratings
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  return bookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))
}
