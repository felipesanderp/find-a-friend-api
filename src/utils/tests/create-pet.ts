import { app } from '@/app'
import registerOrg from './register-org'
import request from 'supertest'
import { expect } from 'vitest'
import { CreatePetUseCaseResponse } from '@/use-cases/pets/create-pet-use-case'
import authenticateOrg from './authenticate-org'

const createPet = async (): Promise<CreatePetUseCaseResponse> => {
  const {
    org: { id },
  } = await registerOrg()

  const { token } = await authenticateOrg()

  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Cachorrinho fofinho',
      description: 'destrói tudo que vê pela frente',
      age: 'BABY',
      levelOfEnergy: 3,
      size: 'SMALL',
      levelOfIndependence: 'MEDIUM',
      environment: 'MEDIUM',
      org_id: id,
      type: 'DOG',
      images: [],
      requisites: ['Espaço amplo'],
      city: 'Curitiba',
    })

  expect(response.statusCode).toBe(201)

  return response.body
}

export default createPet
