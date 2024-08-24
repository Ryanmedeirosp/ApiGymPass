import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGym
let sut: CreateGymUseCase

describe('Gym use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGym()
    sut = new CreateGymUseCase(gymRepository)
  })
  it('should hash Gym passwor upon registration', async () => {
    const { gym } = await sut.execute({
      title: 'java Gym',
      description: null,
      phone: null,
      latitude: -9.6149654,
      longitude: -35.7309573,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
