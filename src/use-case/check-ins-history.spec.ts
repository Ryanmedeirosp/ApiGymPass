import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInHistoryUseCase } from './check-ins-history'
import { InMemoryCheckIn } from '@/repositories/in-memory/in-memory-check-in'

let checkInRepository: InMemoryCheckIn

let sut: CheckInHistoryUseCase

describe('Check-In History in Use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckIn()
    sut = new CheckInHistoryUseCase(checkInRepository)
  })

  it('should be able to recive the history check in', async () => {
    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able recive the history of check-ins in page', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
