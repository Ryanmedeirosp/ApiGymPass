import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../register'

export function makeRegister() {
  const prismaRepository = new PrismaUserRepository()
  const useCase = new RegisterUseCase(prismaRepository)

  return useCase
}
