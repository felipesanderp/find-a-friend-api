import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { authenticate } from './authenticate.controller'
import { register } from './register.controller'
import { refresh } from './refresh.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orgs/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Register as a Org',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
          address: z.string(),
          name: z.string(),
          phone: z.string(),
          zipcode: z.string(),
        }),
        response: {
          201: z.null(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    register,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/orgs/sessions',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authenticate,
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Refresh token',
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    refresh,
  )
}
