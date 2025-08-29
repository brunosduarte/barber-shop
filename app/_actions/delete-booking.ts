"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

export const deleteBooking = async (bookingId: string) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  // Verify that the booking belongs to the current user
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true },
  })

  if (!booking) {
    throw new Error("Reserva não encontrada")
  }

  if (booking.userId !== session.user.id) {
    throw new Error("Você não tem permissão para cancelar esta reserva")
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings")
}
