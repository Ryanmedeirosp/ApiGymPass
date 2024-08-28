import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'

interface CheckInHistoryRequest {
  userId: string
  page: number
}

interface CheckInHistoryReply {
  checkIns: CheckIn[]
}

export class CheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: CheckInHistoryRequest): Promise<CheckInHistoryReply> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
