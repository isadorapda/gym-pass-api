import { test, expect, describe, beforeEach } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  test(`User should be able to register`, async () => {
    const { user } = await sut.service({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: 'abcd12',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test(`User's password should be hashed upon registration`, async () => {
    const { user } = await sut.service({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: 'abcd12',
    })

    const isPasswordCorrectlyHashed = await compare(
      'abcd12',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test(`User should not be able to register an email that have already been registered`, async () => {
    const email = 'john_doe@email.com'

    await sut.service({
      name: 'John Doe',
      email,
      password: 'abcd12',
    })

    await expect(() =>
      sut.service({
        name: 'John Doe',
        email,
        password: 'abcd12',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
