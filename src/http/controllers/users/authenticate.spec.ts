import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/user').send({
      name: 'ryan',
      email: 'ryan@gmail.com',
      password: '123456',
    })

    const respose = await request(app.server).post('/session').send({
      email: 'ryan@gmail.com',
      password: '123456',
    })

    expect(respose.statusCode).toEqual(200)
    expect(respose.body).toEqual({
      token: expect.any(String),
    })
  })
})
