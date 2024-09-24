import { prisma } from '../../../src/connection';
import { createProposal } from '../../../src/use-cases/proposals/create';

describe('#createProposal', () => {
  beforeEach(async () => {
    await prisma.proposal.deleteMany({})
    await prisma.user.deleteMany({})
  })

  it('creates a proposal', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'foo@proviver.com',
        username: 'Foo Bar',
        birthDate: new Date('1990-01-01'),
      }
    })

    const proposal = {
      title: 'A new proposal',
      body: 'This is a new proposal',
      authorId: user.id
    }

    const result = await createProposal(proposal)
    expect(result).toMatchObject(proposal)
  })
})
