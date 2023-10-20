import { OrgDoesNotExistsError } from '@/use-cases/errors/org-does-not-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/pets/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const createPetBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    description: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']),
    levelOfEnergy: z.number().min(1).max(5),
    environment: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    levelOfIndependence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
  })
  const pet = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const petCreated = await createPetUseCase.execute({
      ...pet,
      org_id: request.user.sub,
    })

    return reply.status(201).send(petCreated)
  } catch (err) {
    if (err instanceof OrgDoesNotExistsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
