import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/use-cases/pets/create-pet-use-case'

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const createPetUseCase = new CreatePetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return createPetUseCase
}
