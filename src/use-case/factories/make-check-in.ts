import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeCheckIn() {
  const prismaRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(prismaRepository, gymsRepository)
  return useCase
}
