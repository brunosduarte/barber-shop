import { PrismaClient } from "../../generated/prisma"
import { PrismaClient as StandardPrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const prismaClient = new PrismaClient()
const prisma = prismaClient.$extends(withAccelerate())
const standardPrismaClient = new StandardPrismaClient()

const globalForPrisma = global as unknown as {
  prisma: typeof prisma
  prismaClient: typeof prismaClient
  standardPrismaClient: typeof standardPrismaClient
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaClient = prismaClient
  globalForPrisma.standardPrismaClient = standardPrismaClient
}

export const db = prisma
export const prismaClientForAdapter = standardPrismaClient
