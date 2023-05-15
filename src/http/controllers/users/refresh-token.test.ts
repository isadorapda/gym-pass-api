import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('Should be able to refresh token when expired', async () => {
    await request(app.server).post('/users').send({
      name: 'Lucca',
      email: 'lucca@email.com',
      password: 'abcde12',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'lucca@email.com',
      password: 'abcde12',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
