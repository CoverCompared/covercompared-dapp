import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useDistributorContract, useClaimContract, useClaimRewardContract } from './useContract';
import distributor from '../utils/calls/distributor';
import claims from '../utils/calls/claims';
import claimsReward from '../utils/calls/claimsReward';

const useClaimForCover = () => {
  const { library, account } = useActiveWeb3React();
  const distributorContract = useDistributorContract();
  const claimContract = useClaimContract();
  const claimRewardContract = useClaimRewardContract();

  const handleClaimForNexus = useCallback(
    async (tokenId, data) => {
      const result = await distributor.submitClaim(distributorContract, { tokenId, data });
      return { ...result };
    },
    [library, distributorContract, account],
  );

  const handleRedeemForNexus = useCallback(
    async (tokenId, claimId) => {
      const result = await distributor.submitRedeem(distributorContract, { tokenId, claimId });
      return { ...result };
    },
    [library, distributorContract, account],
  );

  const handleGetPayoutOutcome = useCallback(
    async (claimId) => {
      const result = await distributor.getPayoutOutcome(distributorContract, { claimId });
      return { ...result };
    },
    [library, distributorContract, account],
  );

  const handleSubmitCAVote = useCallback(
    async (claimId) => {
      const result = await claims.submitCAVote(claimContract, { claimId });
      return { ...result };
    },
    [library, claimContract, account],
  );

  const handleGetCheckVoteClosing = useCallback(
    async (claimId) => {
      const result = await claims.checkVoteClosing(claimContract, { claimId });
      return result;
    },
    [library, claimContract, account],
  );

  const handleCloseClaim = useCallback(
    async (claimId) => {
      const result = await claimsReward.closeClaim(claimRewardContract, { claimId });
      return result;
    },
    [library, claimRewardContract, account],
  );

  return {
    onNMClaim: handleClaimForNexus,
    onNMRedeemClaim: handleRedeemForNexus,
    onSubmitCAVote: handleSubmitCAVote,
    getCheckVoteClosing: handleGetCheckVoteClosing,
    getPayoutOutcome: handleGetPayoutOutcome,
    onCloseClaim: handleCloseClaim,
  };
};

export default useClaimForCover;
