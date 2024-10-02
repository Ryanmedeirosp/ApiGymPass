import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGyms } from '@/use-case/factories/make-search-gyms'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsSchema.parse(request.query)

  const useCase = makeSearchGyms()

  const { gyms } = await useCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ gyms })
}
