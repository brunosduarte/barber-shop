import { PrismaClient } from "@prisma/client"

async function seedDatabase() {
  const prisma = new PrismaClient()
  try {
    // Clear existing data in the correct order
    await prisma.rating.deleteMany({})
    await prisma.booking.deleteMany({})
    await prisma.barbershopService.deleteMany({})
    await prisma.barbershop.deleteMany({})
    await prisma.user.deleteMany({})

    console.log("🗑️  Cleared existing data")
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    ]

    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ]

    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ]

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ]

    // Verificar comprimento dos arrays
    if (
      creativeNames.length < 10 ||
      addresses.length < 10 ||
      images.length < 10
    ) {
      throw new Error("Número insuficiente de nomes, endereços ou imagens.")
    }

    // Função para validar URLs
    interface UrlValidator {
      (url: string): boolean
    }

    const isValidUrl: UrlValidator = (url: string): boolean => {
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    }

    const barbershops = []
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]

      // Validar URL da barbearia
      if (!isValidUrl(imageUrl)) {
        throw new Error(`URL inválida para barbearia: ${imageUrl}`)
      }

      // Criar barbearia
      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          phones: ["(11) 99999-9999"],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus.",
          imageUrl,
        },
      })

      // Criar serviços aleatórios para a barbearia (entre 3-6 serviços)
      const numServices = Math.floor(Math.random() * 4) + 3 // 3-6 services
      const shuffledServices = services.sort(() => 0.5 - Math.random())

      for (let j = 0; j < numServices; j++) {
        const service = shuffledServices[j]
        if (!isValidUrl(service.imageUrl)) {
          throw new Error(
            `URL inválida para serviço ${service.name}: ${service.imageUrl}`,
          )
        }

        // Add price variation (±20%)
        const priceVariation = 0.8 + Math.random() * 0.4 // 0.8 to 1.2 multiplier
        const adjustedPrice = Math.round(service.price * priceVariation)

        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            price: adjustedPrice,
            barbershopId: barbershop.id,
            imageUrl: service.imageUrl,
          },
        })
      }

      barbershops.push(barbershop)
    }

    console.log("🏪 Created barbershops and services")

    // Create mock users for testing
    const mockUsers = [
      {
        name: "João Silva",
        email: "joao@example.com",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Maria Santos",
        email: "maria@example.com",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b25d9b8a?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Pedro Oliveira",
        email: "pedro@example.com",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Ana Costa",
        email: "ana@example.com",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Carlos Mendes",
        email: "carlos@example.com",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
    ]

    const users = []
    for (const userData of mockUsers) {
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          image: userData.image,
          emailVerified: new Date(),
        },
      })
      users.push(user)
    }

    console.log("👥 Created mock users")

    // Create past bookings for rating testing
    const now = new Date()

    // Helper function to get random date in the past
    const getRandomPastDate = (daysBack: number) => {
      const date = new Date(now)
      date.setDate(date.getDate() - Math.floor(Math.random() * daysBack) - 1)
      date.setHours(
        Math.floor(Math.random() * 10) + 9,
        Math.random() < 0.5 ? 0 : 30,
        0,
        0,
      )
      return date
    }

    // Get all barbershop services
    const allServices = await prisma.barbershopService.findMany({
      include: { barbershop: true },
    })

    // Helper function to create weighted random ratings (more 4-5 stars, fewer 1-2)
    const getWeightedRating = () => {
      const rand = Math.random()
      if (rand < 0.35) return 5 // 35% chance of 5 stars
      if (rand < 0.6) return 4 // 25% chance of 4 stars
      if (rand < 0.75) return 3 // 15% chance of 3 stars
      if (rand < 0.9) return 2 // 15% chance of 2 stars
      return 1 // 10% chance of 1 star
    }

    // Create diverse past bookings with ratings
    let bookingCounter = 0
    const pastBookingsCount = 60 + Math.floor(Math.random() * 20) // 60-80 past bookings

    for (let i = 0; i < pastBookingsCount; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const service =
        allServices[Math.floor(Math.random() * allServices.length)]
      const bookingDate = getRandomPastDate(90) // Up to 90 days ago

      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          serviceId: service.id,
          date: bookingDate,
        },
      })

      // Variable rating probability based on how long ago (recent bookings more likely to be rated)
      const daysSinceBooking = Math.floor(
        (now.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24),
      )
      const ratingProbability = Math.max(0.5, 1 - daysSinceBooking / 180) // Higher for recent bookings

      if (Math.random() < ratingProbability) {
        const ratingValue = getWeightedRating()

        // Enhanced comments with more variety
        const comments = {
          5: [
            "Excelente serviço! Recomendo muito!",
            "Perfeito! Voltarei sempre.",
            "Atendimento impecável, resultado incrível!",
            "Superou minhas expectativas!",
            "Melhor barbearia da cidade!",
            "Profissional muito talentoso!",
            "Ambiente incrível e atendimento nota 10!",
            "Fiquei muito satisfeito, parabéns!",
          ],
          4: [
            "Muito bom! Pequenos detalhes a melhorar.",
            "Ótimo atendimento e resultado.",
            "Recomendo! Experiência muito positiva.",
            "Bom serviço, ambiente agradável.",
            "Gostei bastante, voltarei em breve.",
            "Quase perfeito, só algumas coisinhas.",
            "Profissional competente e educado.",
          ],
          3: [
            "Serviço ok, dentro do esperado.",
            "Regular, pode melhorar em alguns aspectos.",
            "Razoável, mas já vi melhor.",
            "Atendeu as expectativas básicas.",
            "Na média, nada excepcional.",
            "Preço justo pelo que oferece.",
          ],
          2: [
            "Não gostei muito do resultado.",
            "Esperava mais pelo preço cobrado.",
            "Atendimento deixou a desejar.",
            "Resultado abaixo das expectativas.",
            "Demora excessiva no atendimento.",
            "Ambiente poderia estar mais limpo.",
          ],
          1: [
            "Muito insatisfeito com o serviço.",
            "Não recomendo, experiência ruim.",
            "Qualidade bem abaixo do esperado.",
            "Perda de tempo e dinheiro.",
            "Profissional despreparado.",
            "Nunca mais volto neste lugar.",
          ],
        }

        const possibleComments = comments[ratingValue as keyof typeof comments]
        // 75% chance of having a comment
        const comment =
          Math.random() < 0.75
            ? possibleComments[
                Math.floor(Math.random() * possibleComments.length)
              ]
            : null

        await prisma.rating.create({
          data: {
            rating: ratingValue,
            comment,
            userId: user.id,
            barbershopId: service.barbershopId,
            bookingId: booking.id,
          },
        })
      }

      bookingCounter++
    }

    console.log(
      `📅 Created ${bookingCounter} past bookings with weighted ratings`,
    )

    // Create diverse future bookings with realistic patterns
    const futureBookingsCount = 20 + Math.floor(Math.random() * 15) // 20-35 future bookings

    for (let i = 0; i < futureBookingsCount; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const service =
        allServices[Math.floor(Math.random() * allServices.length)]

      // More bookings closer to current date (realistic booking behavior)
      const daysAhead =
        Math.random() < 0.6
          ? Math.floor(Math.random() * 7) + 1 // 60% within next week
          : Math.floor(Math.random() * 23) + 7 // 40% in 1-4 weeks

      const futureDate = new Date(now)
      futureDate.setDate(futureDate.getDate() + daysAhead)

      // Business hours: 9am-7pm, prefer peak hours (10am-4pm)
      const hour =
        Math.random() < 0.7
          ? Math.floor(Math.random() * 6) + 10 // 70% during 10am-4pm peak
          : Math.random() < 0.5
            ? 9
            : Math.floor(Math.random() * 3) + 17 // 30% early/late

      futureDate.setHours(hour, Math.random() < 0.5 ? 0 : 30, 0, 0)

      await prisma.booking.create({
        data: {
          userId: user.id,
          serviceId: service.id,
          date: futureDate,
        },
      })
    }

    console.log(
      `📆 Created ${futureBookingsCount} future bookings with realistic timing`,
    )

    // Update barbershop rating statistics
    for (const barbershop of barbershops) {
      const ratings = await prisma.rating.findMany({
        where: { barbershopId: barbershop.id },
        select: { rating: true },
      })

      if (ratings.length > 0) {
        const averageRating =
          ratings.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / ratings.length
        await prisma.barbershop.update({
          where: { id: barbershop.id },
          data: {
            averageRating: averageRating,
            totalRatings: ratings.length,
          },
        })
      }
    }

    console.log("⭐ Updated barbershop rating statistics")

    // Display final statistics
    const totalRatings = await prisma.rating.count()
    const totalBookings = await prisma.booking.count()
    const avgRating = await prisma.rating.aggregate({
      _avg: { rating: true },
    })

    console.log("\n📊 Seed Statistics:")
    console.log(`• ${barbershops.length} barbershops created`)
    console.log(`• ${users.length} users created`)
    console.log(`• ${totalBookings} bookings created`)
    console.log(`• ${totalRatings} ratings created`)
    console.log(
      `• Average rating: ${avgRating._avg.rating?.toFixed(1) || "N/A"} stars`,
    )
    console.log("\n✅ Seed concluído com sucesso!")
  } catch (error) {
    console.error("❌ Erro no seed:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  try {
    await seedDatabase()
  } catch (error) {
    console.error("Erro no seed:", error)
    process.exit(1)
  }
}

main()
