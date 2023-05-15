import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check in controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('User should be able to check in in a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        gym_name: 'Pure TypeScript Gym',
        description: '',
        phone: '0000000',
        latitude: 51.3757059,
        longitude: 0.0952871,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 51.3757059,
        longitude: 0.0952871,
      })
    expect(response.statusCode).toEqual(201)
  })
})
