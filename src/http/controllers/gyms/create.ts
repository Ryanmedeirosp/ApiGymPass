import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGyms } from '@/use-case/factories/make-create-gym'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Define o schema de validação
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90, {
      message: 'Latitude must be between -90 and 90',
    }),
    longitude: z.number().refine((value) => Math.abs(value) <= 180, {
      message: 'Longitude must be between -180 and 180',
    }),
  })

  // Tentativa de validação
  try {
    // Faz o parse e valida o corpo da requisição
    const { title, description, phone, latitude, longitude } =
      createGymBodySchema.parse(request.body)

    // Se passar na validação, executa o caso de uso de criação
    const useCase = makeCreateGyms()

    await useCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    // Retorna resposta de sucesso
    return reply.status(201).send()
  } catch (error) {
    // Se ocorrer erro na validação, retorna status 400 com a mensagem de erro
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
        issues: error.errors, // Detalhes do erro de validação
      })
    }

    // Tratamento de outros tipos de erro
    return reply.status(500).send({
      message: 'Internal server error',
    })
  }
}
