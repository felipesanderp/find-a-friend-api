import { PetsRepository } from '@/repositories/pets-repository'
import {
  PET_AGE,
  PET_ENVIRONMENT,
  PET_INDEPENDENCE,
  PET_SIZE,
  Pet,
} from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: PET_AGE
  size: PET_SIZE
  levelOfIndependence: PET_INDEPENDENCE
  levelOfEnergy: number
  environment: PET_ENVIRONMENT
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    levelOfIndependence,
    levelOfEnergy,
    environment,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      levelOfIndependence,
      levelOfEnergy,
      environment,
    })

    return {
      pet,
    }
  }
}
