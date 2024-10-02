import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticate(app: FastifyInstance) {
  await request(app.server).post('/user').send({
    name: 'ryan',
    email: 'ryan@gmail.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'ryan@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
