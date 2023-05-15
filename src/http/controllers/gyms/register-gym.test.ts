import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

describe('Register Gym Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to register a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_name: 'Pure TypeScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.3768971,
        longitude: -0.2031183,
      })
    expect(gym.statusCode).toEqual(201)
  })
})
