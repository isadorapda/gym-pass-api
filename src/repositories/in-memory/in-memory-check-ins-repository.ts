import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async findUserIdOnDate(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDate) && checkInDate.isBefore(endOfDate)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }
    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(checkInId: string) {
    const checkIn = this.checkIns.find((checkin) => checkin.id === checkInId)

    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkin) => checkin.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (checkin) => checkin.id === checkIn.id,
    )
    if (checkInIndex > 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}
