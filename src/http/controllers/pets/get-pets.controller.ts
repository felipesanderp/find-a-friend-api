import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetsUseCase } from '@/use-cases/factories/pets/make-get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetsQuerySchema = z.object({
    city: z.string().optional(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    levelOfEnergy: z.number().min(1).max(5).optional(),
    environment: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    levelOfIndependence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    type: z.enum(['DOG', 'CAT', 'OTHER']).optional(),
  })

  const params = getPetsQuerySchema.parse(request.query)

  try {
    const getPetsUseCase = makeGetPetsUseCase()

    const data = await getPetsUseCase.execute(params)

    return reply.status(200).send(data)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
