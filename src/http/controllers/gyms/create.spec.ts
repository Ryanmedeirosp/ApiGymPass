import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticate } from '@/utils/test/creteAndAutenticate'

describe('create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create gym', async () => {
    const { token } = await createAndAuthenticate(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym',
        description: 'some ',
        phone: '12314242',
        latitude: -9.6149654,
        longitude: -35.7309573,
      })

    expect(response.status).toEqual(201)
  })
})
