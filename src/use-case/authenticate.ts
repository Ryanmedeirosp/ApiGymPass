import { UserRepository } from '@/repositories/user-repository'
import { InvalidCredentials } from './errors/invalid-credentials'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateReply {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateReply> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const doesPassaworMatches = await compare(password, user.password_hash)

    if (!doesPassaworMatches) {
      throw new InvalidCredentials()
    }
    return {
      user,
    }
  }
}
