import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/registers.controller'
import { authenticateController } from './controllers/authenticate.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)
}
