import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticate } from '@/utils/test/creteAndAutenticate'

describe('nearby gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search nearby gym', async () => {
    const { token } = await createAndAuthenticate(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym',
        description: 'some ',
        phone: '12314242',
        latitude: -9.6149654,
        longitude: -35.7309573,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '2',
        description: 'some ',
        phone: '12314242',
        latitude: -9.4019354,
        longitude: -36.1129833,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -9.4019354,
        longitude: -36.1129833,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: '2',
      }),
    ])
  })
})
