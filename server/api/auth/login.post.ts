import { z } from 'zod'

import bcrypt from 'bcryptjs'

// import { verify } from 'argon2'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { email, password } = await z.object({
      email: z.string().email(),
      password: z.string().min(6).max(14),
    }).parseAsync(body)

    const prisma = usePrisma()

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    })

    if (!user)
      throw createError({ message: 'user not found', statusCode: 400 })

    const passwordVerified = await bcrypt.compare(password, user.password)
    // const passwordVerified = await verify(user.password, password)

    if (!passwordVerified)
      throw createError({ message: 'password not correct', statusCode: 400 })

    return { success: true, user }
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return { success: false, error }
  }
})
