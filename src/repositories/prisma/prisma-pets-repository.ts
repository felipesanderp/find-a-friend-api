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
        type: query.type !== null ? query.type : undefined,
        age: query.age !== null ? query.age : undefined,
        size: query.size !== null ? query.size : undefined,
        levelOfEnergy:
          query.levelOfEnergy !== null ? query.levelOfEnergy : undefined,
        levelOfIndependence:
          query.levelOfIndependence !== null
            ? query.levelOfIndependence
            : undefined,
        environment: query.environment !== null ? query.environment : undefined,
        // org_id: query.org_id !== null ? query.org_id : undefined,
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
