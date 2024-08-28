import { GymRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface NearbyGymsmUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface NearbyGymsmUseCaseReply {
  gyms: Gym[]
}

export class NearbyGymsmUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyGymsmUseCaseRequest): Promise<NearbyGymsmUseCaseReply> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
