import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  it('should hash user passwor upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'ryan',
      email: 'zito@gmail.com',
      password: '1231',
    })
    const passawordHashed = await compare('123456', user.password_hash)
    expect(passawordHashed).toBe(true)
  })
})
