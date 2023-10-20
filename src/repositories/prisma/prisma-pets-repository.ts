import { Prisma } from '@prisma/client'
import { GetPetsQuery, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async getPets(query: GetPetsQuery, page?: number | undefined) {
    const pets = await prisma.pet.findMany({
      where: {
        type: query.type,
        age: query.age,
        size: query.size,
        levelOfEnergy: query.levelOfEnergy,
        levelOfIndependence: query.levelOfIndependence,
        environment: query.environment,
        org_id: query.org_id,
        city: query.city,
      },
      skip: page ? (page - 1) * 10 : undefined,
      take: 10,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
