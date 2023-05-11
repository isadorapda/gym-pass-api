import { test, expect, describe } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register services', () => {
  test(`User should be able to register`, async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.service({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: 'abcd12',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test(`User's password should be hashed upon registration`, async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.service({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'john_doe@email.com'

    await registerService.service({
      name: 'John Doe',
      email,
      password: 'abcd12',
    })

    await expect(() =>
      registerService.service({
        name: 'John Doe',
        email,
        password: 'abcd12',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
