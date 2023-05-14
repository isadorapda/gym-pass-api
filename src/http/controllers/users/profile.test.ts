import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Profile Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('User should be able to access their profile', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@email.com',
      }),
    )
  })
})
