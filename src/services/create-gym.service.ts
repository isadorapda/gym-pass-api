import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymServiceRequest {
  gym_name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(public gymsRepository: GymsRepository) {}

  async service({
    description,
    phone,
    gym_name,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      gym_name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
