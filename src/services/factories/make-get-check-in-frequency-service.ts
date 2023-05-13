import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetCheckInFrequencyService } from '../get-check-in-frequency.service'

export function makeGetCheckInFrequencyService() {
  const checkInRepository = new PrismaCheckInRepository()
  const service = new GetCheckInFrequencyService(checkInRepository)

  return service
}
