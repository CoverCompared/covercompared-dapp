import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useDistributorContract } from './useContract';
import distributor from '../utils/calls/distributor';
import useAddress from './useAddress';

const useClaimForCover = () => {
  const { library, account } = useActiveWeb3React();
  const distributorContract = useDistributorContract();

  const handleClaimForNexus = useCallback(
    async (tokenId, data) => {
      const result = await distributor.submitClaim(distributorContract, {tokenId, data});
      return { ...result };
    },
    [library, distributorContract, account],
  );

  const handleRedeemForNexus = useCallback(
    async (tokenId, claimId) => {
      const result = await distributor.submitRedeem(distributorContract, {tokenId, claimId});
      return { ...result };
    },
    [library, distributorContract, account],
  );

  return {
    onNMClaim: handleClaimForNexus,
    onNMRedeemClaim: handleRedeemForNexus,
  };
};

export default useClaimForCover;
