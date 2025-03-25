import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Proposal, ProposalState } from '../../src/domain/proposal.ts';

describe('Proposal', () => {
  const mockData = {
    id: 42,
    title: 'Proposal Title',
    body: 'Proposal Body',
    authorId: 42,
  }

  describe('when in DRAFT state', () => {
    it('can be SUBMITTED', () => {
      const proposal = new Proposal({ state: ProposalState.DRAFT, ...mockData });
      proposal.submit();

      assert.equal(proposal.state, 'SUBMITTED')
    });

    it('cannot be APPROVED', () => {
      const proposal = new Proposal({ state: ProposalState.DRAFT, ...mockData });

      assert.throws(() => proposal.approve(), /Cannot transition from DRAFT to APPROVED/)
    });
  });
});
