import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-user'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFound } from './errors/resource-not-found'

let userRepository: InMemoryRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })
  it('should be able to gey user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'ryan',
      email: 'zito@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('ryan')
  })

  it('should not be able not to get user profile with wrog id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
