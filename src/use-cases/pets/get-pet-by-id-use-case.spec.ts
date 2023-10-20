import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from './get-pet-by-id-use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id Use Case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const createdPet = await petsRepository.create({
      name: 'Cachorrinho fofinho',
      description: 'destrói tudo que vê pela frente',
      age: 'BABY',
      levelOfEnergy: 3,
      size: 'SMALL',
      levelOfIndependence: 'MEDIUM',
      environment: 'MEDIUM',
      org_id: '',
      type: 'DOG',
      images: [],
      requisites: ['Espaço amplo'],
      city: 'Curitiba',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
  })

  it('should not be able to get a pet by a non existing id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
