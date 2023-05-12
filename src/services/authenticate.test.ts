import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate.service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  test(`User should be able to authenticate`, async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password_hash: await hash('abcd12', 6),
    })

    const { user } = await sut.service({
      email: 'john_doe@email.com',
      password: 'abcd12',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test(`User should not be able to authenticate with a wrong email`, async () => {
    await expect(() =>
      sut.service({
        email: 'john_doe@email.com',
        password: 'abcd12',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test(`User should not be able to authenticate with a wrong password`, async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password_hash: await hash('abcd12', 6),
    })

    await expect(() =>
      sut.service({
        email: 'john_doe@email.com',
        password: 'abcd11',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
