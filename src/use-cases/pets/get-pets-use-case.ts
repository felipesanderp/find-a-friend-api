import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetsUseCaseRequest {
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  levelOfIndependence?: 'MEDIUM' | 'LOW' | 'HIGH'
  levelOfEnergy?: number
  environment?: 'SMALL' | 'MEDIUM' | 'BIG'
  org_id?: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    size,
    levelOfIndependence,
    levelOfEnergy,
    environment,
    org_id,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.getPets({
      age,
      size,
      levelOfIndependence,
      levelOfEnergy,
      environment,
      org_id,
    })

    return {
      pets,
    }
  }
}
