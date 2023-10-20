import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create.controller'
import { getPetById } from './get-pet-by-id.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPetById)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
