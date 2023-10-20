import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import registerOrg from '@/utils/tests/register-org'
import authenticateOrg from '@/utils/tests/authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
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
  })
})
