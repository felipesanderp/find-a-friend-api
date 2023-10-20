import { Prisma, Pet } from '@prisma/client'

export interface GetPetsQuery {
  type?: Pet['type']
  age?: Pet['age']
  size?: Pet['size']
  levelOfEnergy?: Pet['levelOfEnergy']
  levelOfIndependence?: Pet['levelOfIndependence']
  environment?: Pet['environment']
  org_id?: Pet['org_id']
  city: Pet['city']
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  getPets(query: GetPetsQuery, page?: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
