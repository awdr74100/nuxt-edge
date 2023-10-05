import { PrismaClient } from '@prisma/client/edge'

let _prisma: PrismaClient

export function usePrisma() {
  const config = useRuntimeConfig()

  if (!_prisma) {
    _prisma = new PrismaClient({
      datasources: { db: {
        url: config.NUXT_DATABASE_URL,
      } },
    })
  }

  return _prisma
}
