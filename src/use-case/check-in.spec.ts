import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckIn } from '@/repositories/in-memory/in-memory-check-in'
import { InMemoryGym } from '@/repositories/in-memory/in-memory-gym'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckIn } from './errors/max-number-check-in'
import { MaxDistance } from './errors/max-distance'

let userRepository: InMemoryCheckIn
let gymsRepository: InMemoryGym
let sut: CheckInUseCase

describe('Check in Use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryCheckIn()
    gymsRepository = new InMemoryGym()
    sut = new CheckInUseCase(userRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'ts gym',
      description: ' ',
      phone: ' ',
      latitude: -9.6149654,
      longitude: -35.7309573,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.6149654,
      userLongitude: -35.7309573,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not  be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.6149654,
      userLongitude: -35.7309573,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -9.6149654,
        userLongitude: -35.7309573,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIn)
  })
  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.6149654,
      userLongitude: -35.7309573,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.6149654,
      userLongitude: -35.7309573,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distance gym', async () => {
    gymsRepository.items.push({
      id: 'gym-id2',
      title: 'ts gym',
      description: ' ',
      phone: ' ',
      latitude: new Decimal(-9.581881),
      longitude: new Decimal(-35.8031189),
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-id2',
        userId: 'user-id',
        userLatitude: -9.6149654,
        userLongitude: -35.7309573,
      }),
    ).rejects.toBeInstanceOf(MaxDistance)
  })
})
