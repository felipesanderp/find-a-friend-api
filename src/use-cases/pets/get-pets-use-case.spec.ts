import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetsUseCase } from './get-pets-use-case'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able to get pets by query params', async () => {
    await petsRepository.create({
      name: 'Cachorrinho fofinho',
      description: 'destrói tudo que vê pela frente',
      age: 'BABY',
      levelOfEnergy: 3,
      size: 'SMALL',
      levelOfIndependence: 'MEDIUM',
      environment: 'MEDIUM',
      org_id: '',
    })

    await petsRepository.create({
      name: 'Gatinho fofinho',
      description: 'bem fofinhoo',
      age: 'YOUNG',
      levelOfEnergy: 2,
      size: 'MEDIUM',
      levelOfIndependence: 'LOW',
      environment: 'BIG',
      org_id: '',
    })

    const { pets } = await sut.execute({
      age: 'BABY',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Cachorrinho fofinho',
        age: 'BABY',
      }),
    ])
  })
})
