import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  levelOfIndependence: 'MEDIUM' | 'LOW' | 'HIGH'
  levelOfEnergy: number
  environment: 'SMALL' | 'MEDIUM' | 'BIG'
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
