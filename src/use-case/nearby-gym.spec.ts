import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { NearbyGymsmUseCase } from './nearby-gyms'

let gymRepository: InMemoryGym

let sut: NearbyGymsmUseCase

describe('Fetch Nearby gyms use case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGym()
    sut = new NearbyGymsmUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'java Gym',
      description: null,
      phone: null,
      latitude: -9.4019354,
      longitude: -36.1129833,
    })
    await gymRepository.create({
      title: 'type Gym',
      description: null,
      phone: null,
      latitude: -9.6149654,
      longitude: -35.7309573,
    })
    const { gyms } = await sut.execute({
      userLatitude: -9.6149654,
      userLongitude: -35.7309573,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'type Gym' })])
  })
})
