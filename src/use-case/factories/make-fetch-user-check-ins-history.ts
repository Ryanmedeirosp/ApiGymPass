import { CheckInHistoryUseCase } from '../check-ins-history'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeFetchUserCheckInsHistory() {
  const prismaRepository = new PrismaCheckInRepository()
  const useCase = new CheckInHistoryUseCase(prismaRepository)
  return useCase
}
