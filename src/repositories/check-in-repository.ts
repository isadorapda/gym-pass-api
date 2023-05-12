import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
