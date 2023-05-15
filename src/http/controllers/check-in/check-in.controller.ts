import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function checkInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)

  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  const checkInService = makeCheckInService()

  const { checkIn } = await checkInService.service({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    checkIn,
  })
}
