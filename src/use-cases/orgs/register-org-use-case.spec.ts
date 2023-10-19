import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register-org-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'name@email.com.br',
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'name@email.com.br',
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a org with same email twice', async () => {
    const email = 'name@email.com.br'

    await sut.execute({
      name: 'Seu Cãopanheiro',
      email,
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Seu Cãopanheiro',
        email,
        address: 'rua do meio',
        phone: '81 91234.5678',
        zipcode: '12345-000',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
