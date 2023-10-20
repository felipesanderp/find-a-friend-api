import { app } from '@/app'
import request from 'supertest'

const authenticateOrg = async (): Promise<{
  token: string
}> => {
  const response = await request(app.server).post('/orgs/sessions').send({
    email: 'test@gmail.com',
    password: '123456',
  })

  return response.body
}

export default authenticateOrg
