import { CheckInRepository } from '@/repositories/check-in-repository'

interface GetCheckInFrequencyRequest {
  userId: string
}
interface GetCheckInFrequencyResponse {
  totalCheckIns: number
}

export class GetCheckInFrequencyService {
  constructor(private chekInRepository: CheckInRepository) {}

  async service({
    userId,
  }: GetCheckInFrequencyRequest): Promise<GetCheckInFrequencyResponse> {
    const totalCheckIns = await this.chekInRepository.countByUserId(userId)

    return { totalCheckIns }
  }
}
