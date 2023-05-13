import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInHistoryService } from '../fetch-user-check-in-history.service'

export function makeFetchCheckInHistoryService() {
  const checkInRepository = new PrismaCheckInRepository()
  const service = new FetchUserCheckInHistoryService(checkInRepository)

  return service
}
