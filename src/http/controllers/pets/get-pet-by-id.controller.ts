import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/pets/make-get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const getPetByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetByIdParamsSchema.parse(request.params)

  try {
    const getPetByIdUseCase = makeGetPetByIdUseCase()

    const pet = await getPetByIdUseCase.execute({
      id,
    })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }
}
