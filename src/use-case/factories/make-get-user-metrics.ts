import { GetUserMetricsUseCaseUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetrics() {
  const prismaRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCaseUseCase(prismaRepository)
  return useCase
}
