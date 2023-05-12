import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: string
}
interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfile {
  constructor(public usersRepository: UsersRepository) {}
  async service({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }
    return { user }
  }
}
