import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { test, describe, beforeEach, expect } from 'vitest'
import { SearchGymService } from './search-gym.service'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })

  test('Should be able to search gym', async () => {
    await gymsRepository.create({
      gym_name: 'JavaScript Gym',
      latitude: 51.504425,
      longitude: -0.1291608,
    })
    await gymsRepository.create({
      gym_name: 'TypeScript Gym',
      latitude: 51.4672102,
      longitude: -0.1045797,
    })

    const { gyms } = await sut.service({
      query: 'TypeScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        gym_name: 'TypeScript Gym',
      }),
    ])
  })

  test('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        gym_name: `JavaScript Gym ${i}`,
        latitude: 51.504425,
        longitude: -0.1291608,
      })
    }
    const { gyms } = await sut.service({
      query: 'JavaScript',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        gym_name: 'JavaScript Gym 21',
      }),
      expect.objectContaining({
        gym_name: 'JavaScript Gym 22',
      }),
    ])
  })
})
