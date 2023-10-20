import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate.controller'
import { register } from './register.controller'
import { refresh } from './refresh.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs/register', register)
  app.post('/orgs/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
