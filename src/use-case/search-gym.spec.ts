import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { SearchGymUseCase } from './search-gym'

let gymRepository: InMemoryGym

let sut: SearchGymUseCase

describe('Check-In History in Use case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGym()
    sut = new SearchGymUseCase(gymRepository)
  })

  it('should be able to check in', async () => {
    await gymRepository.create({
      title: 'java Gym',
      description: null,
      phone: null,
      latitude: -9.6149654,
      longitude: -35.7309573,
    })
    await gymRepository.create({
      title: 'type Gym',
      description: null,
      phone: null,
      latitude: -9.6149654,
      longitude: -35.7309573,
    })
    const { gyms } = await sut.execute({
      query: 'java Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'java Gym' })])
  })

  it('should be able recive paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `java${i}`,
        description: null,
        phone: null,
        latitude: -9.6149654,
        longitude: -35.7309573,
      })
    }

    const { gyms } = await sut.execute({
      query: 'java',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'java21' }),
      expect.objectContaining({ title: 'java22' }),
    ])
  })
})
