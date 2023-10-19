import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Cachorrinho fofinho',
      description: 'destrói tudo que vê pela frente',
      age: 'CUB',
      levelOfEnergy: 3,
      size: 'SMALL',
      levelOfIndependence: 'MODERATE',
      environment: 'WIDE',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
