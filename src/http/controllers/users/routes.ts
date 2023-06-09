import { FastifyInstance } from 'fastify'
import { registerController } from './registers.controller'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshAuthorizationController } from './refresh-auth.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.patch('/token/refresh', refreshAuthorizationController)

  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
