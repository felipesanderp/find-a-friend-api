import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import createPet from '@/utils/tests/create-pet'

describe('Get pet by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by his ID', async () => {
    const {
      pet: { id },
    } = await createPet()

    const response = await request(app.server).get(`/pets/${id}`)

    expect(response.statusCode).toEqual(200)
  })
})
