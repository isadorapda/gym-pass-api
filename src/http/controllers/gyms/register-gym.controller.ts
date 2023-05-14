import { makeCreateGymsService } from '@/services/factories/make-create-gym-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerGymBodySchema = z.object({
    gym_name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gym_name, description, phone, latitude, longitude } =
    registerGymBodySchema.parse(request.body)

  const registerGymService = makeCreateGymsService()

  await registerGymService.service({
    gym_name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
