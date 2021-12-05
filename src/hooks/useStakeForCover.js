import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useNexusMutualContract, useInsureAceContract } from './useContract';
import nexus from '../utils/calls/nexus';
import insure from '../utils/calls/insure';

const useStakeForCover = () => {
  const { library, account } = useActiveWeb3React();
  const nexusContract = useNexusMutualContract();
  const insuraceContract = useInsureAceContract();
  const handleNexusMutualStake = useCallback(
    async (param) => {
      const maxPriceWithFee = await nexus.getProductPrice(nexusContract, param);
      // const result = await nexus.buyCoverByETH(nexusContract, { ...param, maxPriceWithFee });
      const result = await nexus.buyCoverByToken(nexusContract, { ...param, maxPriceWithFee });
      return { ...result };
    },
    [library, nexusContract, account],
  );
  const handleInsureAceStake = useCallback(
    async (param) => {
      const result = await insure.buyCoverByToken(insuraceContract, param);
      return { ...result };
    },
    [library, insuraceContract, account],
  );
  return {
    onNMStake: handleNexusMutualStake,
    onIAStake: handleInsureAceStake,
  };
};

export default useStakeForCover;
