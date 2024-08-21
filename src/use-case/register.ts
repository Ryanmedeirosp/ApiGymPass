import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exist'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const password_hash = await hash(password, 6)

    const sameEmail = await this.userRepository.findByEmail(email)

    if (sameEmail) {
      throw new UserAlreadyExists()
    }
    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
