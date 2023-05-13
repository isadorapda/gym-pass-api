import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { CheckInService } from '../check-in.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new CheckInService(checkInRepository, gymsRepository)

  return service
}
