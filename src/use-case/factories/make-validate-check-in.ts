import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckIn() {
  const prismaRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(prismaRepository)
  return useCase
}
