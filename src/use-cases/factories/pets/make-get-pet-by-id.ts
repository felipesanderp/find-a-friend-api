import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '@/use-cases/pets/get-pet-by-id-use-case'

export function makeGetPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(prismaPetsRepository)

  return getPetByIdUseCase
}
