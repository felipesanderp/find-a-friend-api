import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgDoesNotExistsError } from '../errors/org-does-not-exists-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  images: string[]
  requisites: string[]
  city: string
  type: 'DOG' | 'CAT' | 'OTHER'
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  levelOfIndependence: 'MEDIUM' | 'LOW' | 'HIGH'
  levelOfEnergy: number
  environment: 'SMALL' | 'MEDIUM' | 'BIG'
  org_id: string
}

export interface CreatePetUseCaseResponse {
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
    images,
    requisites,
    city,
    type,
    age,
    size,
    levelOfIndependence,
    levelOfEnergy,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgDoesNotExistsError()
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
      images: {
        set: images,
      },
      requisites: {
        set: requisites,
      },
      city,
      type,
    })

    return {
      pet,
    }
  }
}
