import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

describe('Search gym controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('User should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_name: 'Pure TypeScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.3768971,
        longitude: -0.2031183,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gym_name: 'Pure JavaScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.3768971,
        longitude: -0.2031183,
      })

    const gyms = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'TypeScript' })
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
