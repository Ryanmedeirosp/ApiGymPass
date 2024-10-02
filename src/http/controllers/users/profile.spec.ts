import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticate } from '@/utils/test/creteAndAutenticate'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get user Profile', async () => {
    const { token } = await createAndAuthenticate(app)
    const profileresponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileresponse.status).toEqual(200)
    expect(profileresponse.body.user).toEqual(
      expect.objectContaining({
        email: 'ryan@gmail.com',
      }),
    )
  })
})
