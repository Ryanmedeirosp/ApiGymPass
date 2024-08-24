import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-user'
import { UserAlreadyExists } from './errors/user-already-exist'

let userRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new RegisterUseCase(userRepository)
  })
  it('should hash user passwor upon registration', async () => {
    const { user } = await sut.execute({
      name: 'ryan',
      email: 'zito@gmail.com',
      password: '123456',
    })
    const passawordHashed = await compare('123456', user.password_hash)
    expect(passawordHashed).toBe(true)
  })

  it('not should be possible to register with same email twice', async () => {
    const email = 'zito@gmail.com'

    await sut.execute({
      name: 'ryan',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'ryan',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'ryan',
      email: 'zito@gmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
})
