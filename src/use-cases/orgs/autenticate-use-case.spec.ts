import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'seucaopanheiro@email.com',
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'seucaopanheiro@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => {
      return sut.execute({
        email: 'seucaopanheiro@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'seucaopanheiro@email.com',
      address: 'rua do meio',
      phone: '81 91234.5678',
      zipcode: '12345-000',
      password_hash: await hash('123456', 6),
    })

    expect(() => {
      return sut.execute({
        email: 'seucaopanheiro@email.com',
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
