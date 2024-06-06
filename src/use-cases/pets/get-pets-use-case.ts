import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { CityQueryParamIsRequiredError } from '../errors/city-query-param-is-required-error'

interface GetPetsUseCaseRequest {
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  levelOfIndependence?: 'MEDIUM' | 'LOW' | 'HIGH'
  levelOfEnergy?: number
  environment?: 'SMALL' | 'MEDIUM' | 'BIG'
  type?: 'DOG' | 'CAT' | 'OTHER'
  // org_id?: string
  city?: string
  page: number
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
    // org_id,
    type,
    city,
    page,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    if (!city) {
      throw new CityQueryParamIsRequiredError()
    }

    const pets = await this.petsRepository.getPets(
      {
        age,
        size,
        levelOfIndependence,
        levelOfEnergy,
        environment,
        // org_id,
        city,
        type,
      },
      page,
    )

    return {
      pets,
    }
  }
}
