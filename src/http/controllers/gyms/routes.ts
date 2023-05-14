import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { searchGymsController } from './search-gym.controller'
import { fetchNearbyGymController } from './nearby-gym.controller'
import { registerGymController } from './register-gym.controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby-gyms', fetchNearbyGymController)

  app.post('/gyms', registerGymController)
}
