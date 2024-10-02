import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    const respose = await request(app.server).post('/user').send({
      name: 'ryan',
      email: 'ryan@gmail.com',
      password: '123456',
    })

    expect(respose.statusCode).toEqual(201)
  })
})
