import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { BookingWithServiceAndBarbershop } from "../_types/booking"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: BookingWithServiceAndBarbershop
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = booking.date >= new Date()

  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        {/* ESQUERDA */}
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm">
            {format(booking.date, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
