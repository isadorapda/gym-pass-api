import { makeFetchCheckInHistoryService } from '@/services/factories/make-fetch-user-check-in-history-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function checkInHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInHistoryService = makeFetchCheckInHistoryService()

  const { checkIns } = await fetchCheckInHistoryService.service({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
