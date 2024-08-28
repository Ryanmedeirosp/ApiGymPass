import { NearbyGymsmUseCase } from '../nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeNearbyGyms() {
  const prismaRepository = new PrismaGymsRepository()
  const useCase = new NearbyGymsmUseCase(prismaRepository)
  return useCase
}
