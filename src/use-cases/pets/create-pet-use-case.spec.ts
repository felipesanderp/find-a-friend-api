import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'name@email.com.br',
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      name: 'Cachorrinho fofinho',
      description: 'destrói tudo que vê pela frente',
      age: 'BABY',
      levelOfEnergy: 3,
      size: 'SMALL',
      levelOfIndependence: 'MEDIUM',
      environment: 'MEDIUM',
      org_id: org.id,
      type: 'DOG',
      images: [],
      requisites: ['Espaço amplo'],
      city: 'Curitiba',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
