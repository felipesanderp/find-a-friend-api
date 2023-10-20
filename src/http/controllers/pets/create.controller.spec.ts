import { app } from '@/app'
import { afterAll, beforeAll, describe, it } from 'vitest'

import createPet from '@/utils/tests/create-pet'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    await createPet()
  })
})
