import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckIn } from '@/use-case/factories/make-validate-check-in'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParams.parse(request.params)

  const useCase = makeValidateCheckIn()

  await useCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
