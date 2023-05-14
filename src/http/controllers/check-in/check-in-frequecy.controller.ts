import { makeGetCheckInFrequencyService } from '@/services/factories/make-get-check-in-frequency-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkInFrequencyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInFrequencyService = makeGetCheckInFrequencyService()

  const { totalCheckIns } = await checkInFrequencyService.service({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    totalCheckIns,
  })
}
