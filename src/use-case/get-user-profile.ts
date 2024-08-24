import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileReply {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileReply> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return {
      user,
    }
  }
}
