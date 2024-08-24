import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticate() {
  const prismaRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUseCase(prismaRepository)
  return useCase
}
