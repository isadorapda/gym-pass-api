import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { checkInController } from './check-in.controller'
import { checkInHistoryController } from './check-in-history.controller'
import { checkInFrequencyController } from './check-in-frequecy.controller'
import { validateCheckInController } from './validate-check-in.controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', checkInController)
  app.get('/check-ins/history', checkInHistoryController)
  app.get('/check-ins/frequency', checkInFrequencyController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
