import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ValidateCheckInService } from './validate-check-in.service'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { ExpiredCheckInValidationError } from './errors/expired-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('Validate check in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('Should be able to validate user check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.service({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  test('Should not be able to validate nonexistent check in', async () => {
    await expect(() =>
      sut.service({
        checkInId: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  test('Should not be able to validate check in after expired time', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const HALF_HOUR_IN_MILISECONDS = 1000 * 60 * 30

    vi.advanceTimersByTime(HALF_HOUR_IN_MILISECONDS)

    await expect(() =>
      sut.service({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(ExpiredCheckInValidationError)
  })
})
