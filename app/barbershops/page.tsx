import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const resolvedSearchParams = await searchParams
  const barbershopsRaw = await db.barbershop.findMany({
    where: {
      OR: [
        resolvedSearchParams?.title
          ? {
              name: {
                contains: resolvedSearchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        resolvedSearchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: resolvedSearchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
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

  const barbershops = barbershopsRaw.map((barbershop) => ({
    ...barbershop,
    averageRating: barbershop.averageRating
      ? Number(barbershop.averageRating)
      : null,
  }))

  return (
    <div className="mb-4">
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;
          {resolvedSearchParams?.title || resolvedSearchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
