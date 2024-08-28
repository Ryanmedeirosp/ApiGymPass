import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfile() {
  const prismaRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(prismaRepository)
  return useCase
}
