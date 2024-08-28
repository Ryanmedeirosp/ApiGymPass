import { SearchGymUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGyms() {
  const prismaRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(prismaRepository)
  return useCase
}
