import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { error } from 'console'

describe('refresh (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh a token', async () => {
    await request(app.server).post('/user').send({
      name: 'ryan',
      email: 'ryan@gmail.com',
      password: '123456',
    })

    const authRespose = await request(app.server).post('/session').send({
      email: 'ryan@gmail.com',
      password: '123456',
    })

    const cookies = authRespose.get('Set-Cookie')

    if (!cookies) {
      throw error()
    }

    const respose = await await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(respose.statusCode).toEqual(200)
    expect(respose.body).toEqual({
      token: expect.any(String),
    })

    expect(respose.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
