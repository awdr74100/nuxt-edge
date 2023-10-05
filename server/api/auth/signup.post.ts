import { z } from 'zod'

// import bcrypt from 'bcryptjs'

import { hash } from 'argon2'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { email, password } = await z.object({
      email: z.string().email(),
      password: z.string().min(6).max(14),
    }).parseAsync(body)

    const hashedPassword = await hash(password)
    // const hashedPassword = await bcrypt.hash(password, 8)

    const prisma = usePrisma()

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: {
          create: [
            {
              assignedBy: 'auto',
              role: {
                connectOrCreate: {
                  where: {
                    name: 'user',
                  },
                  create: {
                    name: 'user',
                  },
                },
              },
            },
          ],
        },
      },
    })

    return { success: true, user }
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return { success: false, error }
  }
})
