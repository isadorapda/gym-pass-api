import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { CheckInService } from './check-in.service'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check ins services', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 0, 0))

    await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })

    await expect(() =>
      sut.service({
        gymId: 'gym-id-01',
        userId: 'user-id-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('should be able to check in in different days', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 0, 0))

    await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })
    vi.setSystemTime(new Date(2023, 1, 2, 10, 0, 0))

    const { checkIn } = await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
