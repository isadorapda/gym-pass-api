import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'

describe('Authenticate Controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('Should be able to authenticate user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
