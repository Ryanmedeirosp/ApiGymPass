import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetrics } from '@/use-case/factories/make-get-user-metrics'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetUserMetrics()

  const { checkInsCount } = await useCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
