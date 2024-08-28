import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckIn } from '@/repositories/in-memory/in-memory-check-in'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFound } from './errors/resource-not-found'
import { LateCheckInValidate } from './errors/late-check-in-validation'

let CheckInRepository: InMemoryCheckIn
let sut: ValidateCheckInUseCase

describe('Validate check in in Use case', () => {
  beforeEach(async () => {
    CheckInRepository = new InMemoryCheckIn()

    sut = new ValidateCheckInUseCase(CheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to validate the check in', async () => {
    const createdCheckIn = await CheckInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(CheckInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent check in id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
  it('should not be able to validate the check-in afther 20 minutes of its cretions', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await CheckInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const twentyOneMinutes = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutes)

    expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidate)
  })
})
