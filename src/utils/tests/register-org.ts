import request from 'supertest'
import { app } from '@/app'
import { AuthenticateUseCaseResponse } from '@/use-cases/orgs/authenticate-use-case'

const registerOrg = async (): Promise<AuthenticateUseCaseResponse> => {
  const response = await request(app.server).post('/orgs/register').send({
    email: 'test@gmail.com',
    password: '123456',
    address: 'Juscelino Kubitschek',
    name: 'Adopt Org',
    phone: '51914723123',
    zipcode: '06472310',
  })

  return response.body
}

export default registerOrg
