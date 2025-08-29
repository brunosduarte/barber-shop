import { Prisma } from "@/generated/prisma"

export type BookingWithServiceAndBarbershop = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
    rating: true
  }
}>

export type BookingWithNumberPrice = Omit<
  BookingWithServiceAndBarbershop,
  "service"
> & {
  service: Omit<BookingWithServiceAndBarbershop["service"], "price"> & {
    price: number
  }
}
