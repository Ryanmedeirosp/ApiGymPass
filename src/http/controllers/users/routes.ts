import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
