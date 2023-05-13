import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { test, describe, beforeEach, expect } from 'vitest'
import { GetCheckInFrequencyService } from './get-check-in-frequency.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetCheckInFrequencyService

describe('Get check in frequency service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetCheckInFrequencyService(checkInsRepository)
  })

  test('User should be able to access their total number of check ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { totalCheckIns } = await sut.service({
      userId: 'user-01',
    })

    expect(totalCheckIns).toEqual(2)
  })
})
