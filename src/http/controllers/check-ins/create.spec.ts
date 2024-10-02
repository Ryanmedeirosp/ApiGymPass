import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticate } from '@/utils/test/creteAndAutenticate'
import { prisma } from '@/lib/prisma'

describe('create checkIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a checkIn', async () => {
    const { token } = await createAndAuthenticate(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Java',
        latitude: -9.6149654,
        longitude: -35.7309573,
      },
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -9.6149654,
        longitude: -35.7309573,
      })

    expect(response.status).toEqual(201)
  })
})
