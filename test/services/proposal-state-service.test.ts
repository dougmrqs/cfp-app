import { Proposal } from '@prisma/client';
import { prisma } from '../../src/connection';
import { ProposalState, ProposalStateService } from '../../src/services/proposal-state-service';

function createProposal({ state }: { state: ProposalState }) {
  return {
    id: 'proposal-id',
    state,
  } as unknown as Proposal;
}

vitest.mock('../../src/connection', () => ({
  prisma: {
    proposal: {
      update: vitest.fn(({ where, data }: { where: { id: string }, data: { state: ProposalState }}) => {
        return Promise.resolve({ id: where.id, state: ProposalState.SUBMITTED });
      }),
    },
  },
}));

describe('ProposalStateService', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  })

  describe('#submit', () => {
    describe('a DRAFT proposal', () => {
      it('can be submitted', async () => { 
        const proposal = await new ProposalStateService(createProposal({ state: ProposalState.DRAFT })).submit();

        expect(prisma.proposal.update).toHaveBeenCalledWith({
          where: { id: proposal.id },
          data: { state: 'SUBMITTED' },
        });
      });
    });

    describe('a SUBMITTED proposal', () => {
      it('cannot be submitted', async () => {
        try {
          await new ProposalStateService(createProposal({ state: ProposalState.SUBMITTED })).submit();
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot submit a SUBMITTED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('an APPROVED proposal', () => {
      it('cannot be submitted', async () => {
        try {
          await new ProposalStateService(createProposal({ state: ProposalState.APPROVED })).submit();
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot submit a APPROVED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('a REJECTED proposal', () => {
      it('cannot be submitted', async () => {
        try {
          await new ProposalStateService(createProposal({ state: ProposalState.REJECTED })).submit();
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot submit a REJECTED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('#approve', () => {
    describe('a DRAFT proposal', () => {
      it('cannot be approved', async () => {
        try {
          ProposalStateService.approve(createProposal({ status: 'DRAFT' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot approve a DRAFT proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('a SUBMITTED proposal', () => {
      it('can be approved', async () => {
        const proposal = ProposalStateService.approve(createProposal({ status: 'SUBMITTED' }));

        expect(proposal.status).toBe('APPROVED');
        expect(prisma.proposal.update).toHaveBeenCalledWith({
          where: { id: proposal.id },
          data: { status: 'APPROVED' },
        });
      });
    });

    describe('an APPROVED proposal', () => {
      it('cannot be approved', async () => {
        try {
          ProposalStateService.approve(createProposal({ status: 'APPROVED' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot approve a APPROVED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('a REJECTED proposal', () => {
      it('cannot be approved', async () => {
        try {
          ProposalStateService.approve(createProposal({ status: 'REJECTED' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot approve a REJECTED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('#reject', () => {
    describe('a DRAFT proposal', () => {
      it('cannot be rejected', async () => {
        try {
          ProposalStateService.reject(createProposal({ status: 'DRAFT' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot reject a DRAFT proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('a SUBMITTED proposal', () => {
      it('can be rejected', async () => {
        const proposal = ProposalStateService.reject(createProposal({ status: 'SUBMITTED' }));

        expect(proposal.status).toBe('REJECTED');
        expect(prisma.proposal.update).toHaveBeenCalledWith({
          where: { id: proposal.id },
          data: { status: 'REJECTED' },
        });
      });
    });

    describe('an APPROVED proposal', () => {
      it('cannot be rejected', async () => {
        try {
          ProposalStateService.reject(createProposal({ status: 'APPROVED' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot reject a APPROVED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('a REJECTED proposal', () => {
      it('cannot be rejected', async () => {
        try {
          ProposalStateService.reject(createProposal({ status: 'REJECTED' }));
        } catch (err) {
          if (!(err instanceof Error)) throw err;

          expect(err.message).toBe('Cannot reject a REJECTED proposal');
          expect(prisma.proposal.update).not.toHaveBeenCalled();
        }
      });
    });
  });
});
