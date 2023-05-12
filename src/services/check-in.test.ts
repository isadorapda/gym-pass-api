import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { test, expect, describe, beforeEach } from 'vitest'
import { CheckInService } from './check-in.service'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check ins services', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInRepository)
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.service({
      gymId: 'gym-id-01',
      userId: 'user-id-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
