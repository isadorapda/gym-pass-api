import { CheckInRepository } from '@/repositories/check-in-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}
interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async service({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    const checkInOnSameDate = await this.checkInRepository.findUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
