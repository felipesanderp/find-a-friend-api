import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '@/use-cases/orgs/authenticate-use-case'

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository)

  return authenticateUseCase
}
