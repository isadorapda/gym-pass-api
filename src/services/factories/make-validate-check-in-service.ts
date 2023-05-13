import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInService } from '../validate-check-in.service'

export function makeValidateCheckInService() {
  const checkInRepository = new PrismaCheckInRepository()
  const service = new ValidateCheckInService(checkInRepository)

  return service
}
