import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentials } from '@/use-case/errors/invalid-credentials'
import { makeAuthenticate } from '@/use-case/factories/make-authenticate'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const useCase = makeAuthenticate()

    await useCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return reply.status(400).send({ massage: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}