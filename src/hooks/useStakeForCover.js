import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import {
  useNexusMutualContract as useNexusMutualContractA,
  useInsureAceContract as useInsureAceContractA,
} from './useContract';
import {
  useNexusMutualContract as useNexusMutualContractB,
  useInsureAceContract as useInsureAceContractB,
} from './useContractForBiconomy';
import nexus from '../utils/calls/nexus';
import insure from '../utils/calls/insure';
import useAddress from './useAddress';
import { setTransactionState } from '../redux/actions';

const useStakeForCover = () => {
  const { library, account } = useActiveWeb3React();
  const { getCrvAddress } = useAddress();
  const nexusContractA = useNexusMutualContractA();
  const insuraceContractA = useInsureAceContractA();
  const nexusContractB = useNexusMutualContractB();
  const insuraceContractB = useInsureAceContractB();
  const dispatch = useDispatch();
  const handleNexusMutualStake = useCallback(
    async (param, applyDiscount) => {
      const maxPriceWithFee = await nexus.getProductPrice(nexusContractA, param);
      let result = null;
      if (applyDiscount) {
        result = await nexus.buyCoverByToken(nexusContractB, account, library.getSigner(), {
          ...param,
          maxPriceWithFee,
          token: await getCrvAddress(),
        });
      } else {
        result = await nexus.buyCoverByETH(nexusContractA, { ...param, maxPriceWithFee });
      }
      return { ...result };
    },
    [library, account],
  );

  const handleInsureAceStake = useCallback(
    async (param, applyDiscount) => {
      let result = null;
      if (applyDiscount) {
        result = await insure.buyCoverByToken(insuraceContractB, account, library.getSigner(), {
          ...param,
          token: await getCrvAddress(),
        });
      } else {
        result = await insure.buyCoverByETH(insuraceContractA, param);
      }
      return { ...result };
    },
    [library, account],
  );
  return {
    onNMStake: handleNexusMutualStake,
    onIAStake: handleInsureAceStake,
  };
};

export default useStakeForCover;
