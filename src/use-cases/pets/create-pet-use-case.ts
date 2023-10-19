import { OrgsRepository } from '@/repositories/orgs-repository'
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
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    levelOfIndependence,
    levelOfEnergy,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new Error()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      levelOfIndependence,
      levelOfEnergy,
      environment,
      org_id,
    })

    return {
      pet,
    }
  }
}
