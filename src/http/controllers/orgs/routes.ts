import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
}
