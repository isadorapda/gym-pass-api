import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { test, describe, expect, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym.service'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  test('Should be able to register a gym', async () => {
    const { gym } = await sut.service({
      gym_name: 'Gym-1',
      description: '',
      phone: '',
      latitude: 51.4813308,
      longitude: -0.0508409,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
