// import { PrismaClient } from '@prisma/client/edge'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { WebSocket } from 'undici'

neonConfig.webSocketConstructor = WebSocket

let _prisma: PrismaClient

export function usePrisma() {
  const config = useRuntimeConfig()

  if (!_prisma) {
    const pool = new Pool({ connectionString: config.databaseUrl })
    const adapter = new PrismaNeon(pool)
    _prisma = new PrismaClient({ adapter })
  }

  return _prisma
}
