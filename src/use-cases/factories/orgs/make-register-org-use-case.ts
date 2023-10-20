import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '@/use-cases/orgs/register-org-use-case'

export function makeRegisterOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return registerOrgUseCase
}
