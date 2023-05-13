import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymRequest {
  query: string
  page: number
}
interface SearchGymResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async service({ query, page }: SearchGymRequest): Promise<SearchGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
