import { Prisma } from "@/generated/prisma"

export type BookingWithServiceAndBarbershop = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
  }
}>
