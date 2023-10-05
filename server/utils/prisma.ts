import { PrismaClient } from '@prisma/client/edge'

let _prisma: PrismaClient

export function usePrisma() {
  if (!_prisma)
    _prisma = new PrismaClient()

  return _prisma
}
