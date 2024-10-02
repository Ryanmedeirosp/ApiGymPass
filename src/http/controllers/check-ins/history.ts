import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserCheckInsHistory } from '@/use-case/factories/make-fetch-user-check-ins-history'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistorySchema.parse(request.query)

  const useCase = makeFetchUserCheckInsHistory()

  const { checkIns } = await useCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({ checkIns })
}
