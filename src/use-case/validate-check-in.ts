import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { LateCheckInValidate } from './errors/late-check-in-validation'

interface ValidateCheckInRequest {
  checkInId: string
}

interface ValidateCheckIeReply {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckIeReply> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidate()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
