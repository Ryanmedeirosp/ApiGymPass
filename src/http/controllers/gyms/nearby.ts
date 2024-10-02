import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeNearbyGyms } from '@/use-case/factories/make-nearby-gym'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = searchGymsSchema.parse(request.query)

  const useCase = makeNearbyGyms()

  const { gyms } = await useCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
