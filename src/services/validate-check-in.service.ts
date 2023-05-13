import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { ExpiredCheckInValidationError } from './errors/expired-check-in-validation-error'

interface ValidateCheckInRequest {
  checkInId: string
}
interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async service({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (differenceInMinutesFromCheckInCreation > 20) {
      throw new ExpiredCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
