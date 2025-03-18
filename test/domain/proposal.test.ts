import { Proposal, ProposalState } from '../../src/domain/proposal';

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
      expect(proposal.state).toBe('SUBMITTED');
    });

    it('cannot be APPROVED', () => {
      const proposal = new Proposal({ state: ProposalState.DRAFT, ...mockData });
      expect(() => proposal.approve()).toThrowError('Cannot transition from DRAFT to APPROVED')
    });
  });

  describe('when in SUBMITTED state', () => {
    it('can be APPROVED', () => {
      const proposal = new Proposal({ state: ProposalState.SUBMITTED, ...mockData });
      proposal.approve();
      expect(proposal.state).toBe('APPROVED');
    });

    it('can be REJECTED', () => {
      const proposal = new Proposal({ state: ProposalState.SUBMITTED, ...mockData });
      proposal.reject();
      expect(proposal.state).toBe('REJECTED');
    });

    it('cannot be SUBMITTED', () => {
      const proposal = new Proposal({ state: 'SUBMITTED', ...mockData });
      expect(() => proposal.submit()).toThrow('Cannot transition from SUBMITTED to SUBMITTED');
    });

    it('cannot be DRAFT', () => {
      const proposal = new Proposal({ state: 'SUBMITTED', ...mockData });
      expect(() => proposal.draft()).toThrow('Cannot transition from SUBMITTED to DRAFT');
    });
  });

  describe('when in REJECTED state', () => {
    it('cannot be SUBMITTED', () => {
      const proposal = new Proposal({ state: ProposalState.REJECTED, ...mockData });
      expect(() => proposal.submit()).toThrow('Cannot transition from REJECTED to SUBMITTED');
    });

    it('can be DRAFT', () => {
      const proposal = new Proposal({ state: ProposalState.REJECTED, ...mockData });
      proposal.draft();
      expect(proposal.state).toBe('DRAFT');
    });
  });
});
