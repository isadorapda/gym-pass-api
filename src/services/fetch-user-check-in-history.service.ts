import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface CheckInHistoryRequest {
  userId: string
  page: number
}
interface CheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async service({
    userId,
    page,
  }: CheckInHistoryRequest): Promise<CheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
