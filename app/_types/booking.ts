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
  service: Omit<
    BookingWithServiceAndBarbershop["service"],
    "price" | "barbershop"
  > & {
    price: number
    barbershop: Omit<
      BookingWithServiceAndBarbershop["service"]["barbershop"],
      "averageRating"
    > & {
      averageRating: number | null
    }
  }
}
