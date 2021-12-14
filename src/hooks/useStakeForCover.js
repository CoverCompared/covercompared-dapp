import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useNexusMutualContract, useInsureAceContract } from './useContract';
import nexus from '../utils/calls/nexus';
import insure from '../utils/calls/insure';
import useAddress from './useAddress';

const useStakeForCover = () => {
  const { library, account } = useActiveWeb3React();
  const { getCrvAddress } = useAddress();
  const nexusContract = useNexusMutualContract();
  const insuraceContract = useInsureAceContract();

  const handleNexusMutualStake = useCallback(
    async (param, applyDiscount) => {
      const maxPriceWithFee = await nexus.getProductPrice(nexusContract, param);
      let result = null;
      if (applyDiscount) {
        result = await nexus.buyCoverByToken(nexusContract, {
          ...param,
          maxPriceWithFee,
          token: getCrvAddress(),
        });
      } else {
        result = await nexus.buyCoverByETH(nexusContract, { ...param, maxPriceWithFee });
      }
      return { ...result };
    },
    [library, nexusContract, account],
  );

  const handleInsureAceStake = useCallback(
    async (param, applyDiscount) => {
      let result = null;
      if (applyDiscount) {
        result = await insure.buyCoverByToken(insuraceContract, param);
      } else {
        result = await insure.buyCoverByETH(insuraceContract, param);
      }
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
