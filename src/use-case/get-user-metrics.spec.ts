import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckIn } from '@/repositories/in-memory/in-memory-check-in'
import { GetUserMetricsUseCaseUseCase } from './get-user-metrics'

let metricsRepository: InMemoryCheckIn

let sut: GetUserMetricsUseCaseUseCase

describe('Get user Metrics in Use case', () => {
  beforeEach(async () => {
    metricsRepository = new InMemoryCheckIn()
    sut = new GetUserMetricsUseCaseUseCase(metricsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await metricsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    await metricsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
