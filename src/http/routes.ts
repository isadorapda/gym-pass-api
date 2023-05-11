import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/registers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
}
