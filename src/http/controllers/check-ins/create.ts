import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCheckIn } from '@/use-case/factories/make-check-in'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParmsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createChechInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParmsSchema.parse(request.params)
  const { latitude, longitude } = createChechInBodySchema.parse(request.body)

  const useCase = makeCheckIn()

  await useCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
