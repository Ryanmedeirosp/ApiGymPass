import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-case/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserAlreadyExists } from '@/use-case/errors/user-already-exist'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const prismaRepository = new PrismaUserRepository()
    const useCase = new RegisterUseCase(prismaRepository)

    await useCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ massage: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
