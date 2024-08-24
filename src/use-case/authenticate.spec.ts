import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-user'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from './errors/invalid-credentials'

let userRepository: InMemoryRepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'ryan',
      email: 'zito@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'zito@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'zito@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'ryan',
      email: 'zito@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'zito@gmail.com',
        password: '1234566',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
