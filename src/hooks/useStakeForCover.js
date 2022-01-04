import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import { useNexusMutualContract, useInsureAceContract } from './useContract';
import nexus from '../utils/calls/nexus';
import insure from '../utils/calls/insure';
import useAddress from './useAddress';
import { setTransactionState } from '../redux/actions';

const useStakeForCover = () => {
  const { library, account } = useActiveWeb3React();
  const { getCrvAddress } = useAddress();
  const nexusContract = useNexusMutualContract();
  const insuraceContract = useInsureAceContract();
  const dispatch = useDispatch();
  const setTxState = (tx) => {
    dispatch(setTransactionState(tx));
  };
  const handleNexusMutualStake = useCallback(
    async (param, applyDiscount) => {
      const maxPriceWithFee = await nexus.getProductPrice(nexusContract, param);
      let result = null;
      if (applyDiscount) {
        result = await nexus.buyCoverByToken(
          nexusContract,
          {
            ...param,
            maxPriceWithFee,
            token: getCrvAddress(),
          },
          setTxState,
        );
      } else {
        result = await nexus.buyCoverByETH(
          nexusContract,
          { ...param, maxPriceWithFee },
          setTxState,
        );
      }
      return { ...result };
    },
    [library, nexusContract, account],
  );

  const handleInsureAceStake = useCallback(
    async (param, applyDiscount) => {
      let result = null;
      if (applyDiscount) {
        result = await insure.buyCoverByToken(
          insuraceContract,
          {
            ...param,
            token: getCrvAddress(),
          },
          setTxState,
        );
      } else {
        result = await insure.buyCoverByETH(insuraceContract, param, setTxState);
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
