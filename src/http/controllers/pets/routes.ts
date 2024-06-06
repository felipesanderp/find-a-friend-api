import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { create } from './create.controller'
import { getPetById } from './get-pet-by-id.controller'
import { getPets } from './get-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets/:id',
    {
      schema: {
        tags: ['Pet'],
        summary: 'Get pet by id',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            images: z.array(z.string()),
            requisites: z.array(z.string()),
            type: z.union([
              z.literal('DOG'),
              z.literal('CAT'),
              z.literal('OTHER'),
            ]),
            age: z.union([
              z.literal('BABY'),
              z.literal('YOUNG'),
              z.literal('ADULT'),
              z.literal('SENIOR'),
            ]),
            size: z.union([
              z.literal('SMALL'),
              z.literal('MEDIUM'),
              z.literal('BIG'),
            ]),
            levelOfEnergy: z.number(),
            levelOfIndependence: z.union([
              z.literal('LOW'),
              z.literal('MEDIUM'),
              z.literal('HIGH'),
            ]),
            environment: z.union([
              z.literal('SMALL'),
              z.literal('MEDIUM'),
              z.literal('BIG'),
            ]),
            city: z.string(),
            org_id: z.string().uuid(),
            created_at: z.date(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getPetById,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets',
    {
      schema: {
        tags: ['Pet'],
        summary: 'Get pets',
        querystring: z.object({
          city: z.string().optional(),
          age: z
            .union([
              z.literal('BABY'),
              z.literal('YOUNG'),
              z.literal('ADULT'),
              z.literal('SENIOR'),
            ])
            .optional(),
          levelOfEnergy: z.number().min(1).max(5).optional(),
          environment: z
            .union([z.literal('SMALL'), z.literal('MEDIUM'), z.literal('BIG')])
            .optional(),
          levelOfIndependence: z
            .union([z.literal('LOW'), z.literal('MEDIUM'), z.literal('HIGH')])
            .optional(),
          size: z
            .union([z.literal('SMALL'), z.literal('MEDIUM'), z.literal('BIG')])
            .optional(),
          type: z
            .union([z.literal('DOG'), z.literal('CAT'), z.literal('OTHER')])
            .optional(),
        }),
        response: {
          200: z.object({
            pets: z
              .object({
                id: z.string().uuid(),
                name: z.string(),
                description: z.string(),
                images: z.array(z.string()),
                requisites: z.array(z.string()),
                type: z.union([
                  z.literal('DOG'),
                  z.literal('CAT'),
                  z.literal('OTHER'),
                ]),
                age: z.union([
                  z.literal('BABY'),
                  z.literal('YOUNG'),
                  z.literal('ADULT'),
                  z.literal('SENIOR'),
                ]),
                size: z.union([
                  z.literal('SMALL'),
                  z.literal('MEDIUM'),
                  z.literal('BIG'),
                ]),
                levelOfEnergy: z.number().min(1).max(5),
                levelOfIndependence: z.union([
                  z.literal('LOW'),
                  z.literal('MEDIUM'),
                  z.literal('HIGH'),
                ]),
                environment: z.union([
                  z.literal('SMALL'),
                  z.literal('MEDIUM'),
                  z.literal('BIG'),
                ]),
                city: z.string(),
                org_id: z.string().uuid(),
                created_at: z.date(),
              })
              .array(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getPets,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/pets',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Pet'],
        summary: 'Create Pet (Only ORGs)',
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string(),
          description: z.string(),
          images: z.array(z.string()),
          requisites: z.array(z.string()),
          type: z.union([
            z.literal('DOG'),
            z.literal('CAT'),
            z.literal('OTHER'),
          ]),
          age: z.union([
            z.literal('BABY'),
            z.literal('YOUNG'),
            z.literal('ADULT'),
            z.literal('SENIOR'),
          ]),
          size: z.union([
            z.literal('SMALL'),
            z.literal('MEDIUM'),
            z.literal('BIG'),
          ]),
          levelOfEnergy: z.number(),
          levelOfIndependence: z.union([
            z.literal('LOW'),
            z.literal('MEDIUM'),
            z.literal('HIGH'),
          ]),
          environment: z.union([
            z.literal('SMALL'),
            z.literal('MEDIUM'),
            z.literal('BIG'),
          ]),
          city: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            images: z.array(z.string()),
            requisites: z.array(z.string()),
            type: z.union([
              z.literal('DOG'),
              z.literal('CAT'),
              z.literal('OTHER'),
            ]),
            age: z.union([
              z.literal('BABY'),
              z.literal('YOUNG'),
              z.literal('ADULT'),
              z.literal('SENIOR'),
            ]),
            size: z.union([
              z.literal('SMALL'),
              z.literal('MEDIUM'),
              z.literal('BIG'),
            ]),
            levelOfEnergy: z.number().min(1).max(5),
            levelOfIndependence: z.union([
              z.literal('LOW'),
              z.literal('MEDIUM'),
              z.literal('HIGH'),
            ]),
            environment: z.union([
              z.literal('SMALL'),
              z.literal('MEDIUM'),
              z.literal('BIG'),
            ]),
            city: z.string(),
            org_id: z.string().uuid(),
            created_at: z.date(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    create,
  )
}
