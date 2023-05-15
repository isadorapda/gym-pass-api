import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Fetch nearby gyms Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('User should be able to find nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_name: 'Pure TypeScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.3757059,
        longitude: 0.0952871,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_name: 'Pure JavaScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.5975408,
        longitude: -0.3104922,
      })

    const gyms = await request(app.server)
      .get('/gyms/nearby-gyms')
      .query({
        latitude: 51.3757059,
        longitude: 0.0952871,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(gyms.statusCode).toEqual(200)
    expect(gyms.body.gyms).toHaveLength(1)
    expect(gyms.body.gyms).toEqual([
      expect.objectContaining({
        gym_name: 'Pure TypeScript Gym',
      }),
    ])
  })
})
