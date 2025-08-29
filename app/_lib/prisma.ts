import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const prismaClient = new PrismaClient()
const prisma = prismaClient.$extends(withAccelerate())

const globalForPrisma = global as unknown as {
  prisma: typeof prisma
  prismaClient: typeof prismaClient
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaClient = prismaClient
}

export const db = prisma
export const prismaClientForAdapter = prismaClient
