import { makeSearchGymService } from '@/services/factories/make-search-gym-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.query)

  const searchGymsService = makeSearchGymService()

  const { gyms } = await searchGymsService.service({
    page,
    query,
  })
  return reply.status(200).send({
    gyms,
  })
}
