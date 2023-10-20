import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsUseCase } from '@/use-cases/pets/get-pets-use-case'

export function makeGetPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetsUseCase = new GetPetsUseCase(prismaPetsRepository)

  return getPetsUseCase
}
