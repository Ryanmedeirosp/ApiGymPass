import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExists } from '@/use-case/errors/user-already-exist'
import { makeRegister } from '@/use-case/factories/make-register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const useCase = makeRegister()

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
