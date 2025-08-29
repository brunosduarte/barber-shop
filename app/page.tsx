import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import QuickSearch from "./_components/quick-search"
import Search from "./_components/search"
import BookingItem from "./_components/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const confirmedBookings = session?.user ? await getConfirmedBookings() : []

  const barbershops = await db.barbershop.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      imageUrl: true,
      averageRating: true,
      totalRatings: true,
    },
    orderBy: [{ averageRating: "desc" }, { totalRatings: "desc" }],
  })

  const popularBarbershops = await db.barbershop.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      imageUrl: true,
      averageRating: true,
      totalRatings: true,
    },
    orderBy: {
      name: "desc",
    },
  })

  const formattedDateString = () => {
    const today = new Date()
    const weekday = format(today, "eeee", { locale: ptBR })
    const day = format(today, "dd")
    const month = format(today, "MMMM", { locale: ptBR })

    const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase()

    return `${capitalizedWeekday}, ${day} de ${month}`
  }

  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}!
        </h2>
        <p>{formattedDateString()}</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <QuickSearch />

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full md:h-[250px] lg:h-[350px]">
          <Image
            alt="Agende nos melhores com BsD Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTOS */}
        {confirmedBookings.length > 0 && (
          <div>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Agendamentos
            </h2>
            <div className="flex flex-col gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <div key={booking.id} className="flex-1">
                  <BookingItem booking={booking} />
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop, index) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={{
                ...barbershop,
                averageRating: barbershop.averageRating
                  ? Number(barbershop.averageRating)
                  : null,
              }}
              priority={index < 3}
            />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={{
                ...barbershop,
                averageRating: barbershop.averageRating
                  ? Number(barbershop.averageRating)
                  : null,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
