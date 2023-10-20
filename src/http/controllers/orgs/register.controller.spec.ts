import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs/register').send({
      email: 'test@gmail.com',
      password: '123456',
      address: 'Juscelino Kubitschek',
      name: 'Adopt Org',
      phone: '51914723123',
      zipcode: '06472310',
    })

    expect(response.statusCode).toEqual(201)
  })
})
