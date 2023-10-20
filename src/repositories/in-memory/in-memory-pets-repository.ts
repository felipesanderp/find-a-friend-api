import { Pet, Prisma } from '@prisma/client'
import { GetPetsQuery, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import paginate from '@/utils/paginate'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async getPets(query: GetPetsQuery, page = 1) {
    const petsFiltered = this.items.filter((item) => {
      if (query.age && query.age !== item.age) {
        return false
      }

      if (query.size && query.size !== item.size) {
        return false
      }

      if (query.levelOfEnergy && query.levelOfEnergy !== item.levelOfEnergy) {
        return false
      }

      if (
        query.levelOfIndependence &&
        query.levelOfIndependence !== item.levelOfIndependence
      ) {
        return false
      }

      if (query.environment && query.environment !== item.environment) {
        return false
      }

      if (query.org_id && query.org_id !== item.org_id) {
        return false
      }

      return true
    })

    return paginate<Pet>(petsFiltered, page)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      levelOfIndependence: data.levelOfIndependence,
      levelOfEnergy: data.levelOfEnergy,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
