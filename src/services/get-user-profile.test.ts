import { test, describe, expect, beforeEach } from 'vitest'
import { GetUserProfile } from './get-user-profile.service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfile

describe('Get user profile service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfile(usersRepository)
  })

  test('User should be able to access profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@email.com',
      password_hash: await hash('abcd12', 6),
    })

    const { user } = await sut.service({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  test('User should not be able to access profile with wrong id', async () => {
    await expect(() =>
      sut.service({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
