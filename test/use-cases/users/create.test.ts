import { prisma } from '../../../src/connection';
import { createUser } from '../../../src/use-cases/users/create';

describe('#createUser', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })

  it('creates a user', async () => {
    const createUserProps = {
      username: 'foo',
      email: 'foo@provider.com',
      birthDate: new Date('1990-01-01'),
    }

    const user = await createUser(createUserProps)

    expect(user).toMatchObject({
      id: expect.any(Number),
      username: 'foo',
      email: 'foo@provider.com',
      birthDate: new Date('1990-01-01'),
    })
  })
})
