import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGyms() {
  const prismaRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaRepository)
  return useCase
}
