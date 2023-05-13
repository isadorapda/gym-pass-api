import { test, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInService } from './check-in.service'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxCheckInSameDayError } from './errors/check-in-same-day-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check ins services', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id-01',
      gym_name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 51.504425,
      longitude: -0.1291608,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 51.504425,
      userLongitude: -0.1291608,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 0, 0))

    await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 51.504425,
      userLongitude: -0.1291608,
    })

    await expect(() =>
      sut.service({
        gymId: 'gym-id-01',
        userId: 'user-id-01',
        userLatitude: 51.504425,
        userLongitude: -0.1291608,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInSameDayError)
  })

  test('should be able to check in in different days', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 0, 0))

    await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 51.504425,
      userLongitude: -0.1291608,
    })
    vi.setSystemTime(new Date(2023, 1, 2, 10, 0, 0))

    const { checkIn } = await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
      userLatitude: 51.504425,
      userLongitude: -0.1291608,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('User should not be able to check in when distant from the gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      description: '',
      gym_name: 'Node Gym',
      latitude: new Decimal(51.476214),
      longitude: new Decimal(-0.0565259),
      phone: '',
    })

    await expect(() =>
      sut.service({
        userId: 'user-id-01',
        gymId: 'gym-02',
        userLatitude: 51.504425,
        userLongitude: -0.1291608,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
