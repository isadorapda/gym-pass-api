import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { test, describe, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch nearby gyms service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  test('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      gym_name: 'Closer Gym',
      latitude: 51.492473,
      longitude: -0.1038607,
    })
    await gymsRepository.create({
      gym_name: 'Further Gym',
      latitude: 51.5975408,
      longitude: -0.3104922,
    })

    const { gyms } = await sut.service({
      userLatitude: 51.4913278,
      userLongitude: -0.0692663,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ gym_name: 'Closer Gym' })])
  })
})
