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
import { setPendingTransaction } from '../redux/actions';

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
      let tx;
      if (applyDiscount) {
        tx = await nexus.buyCoverByToken(nexusContractB, account, library.getSigner(), {
          ...param,
          maxPriceWithFee,
          token: await getCrvAddress(),
        });
      } else {
        tx = await nexus.buyCoverByETH(nexusContractA, { ...param, maxPriceWithFee });
      }
      dispatch(setPendingTransaction(tx.hash));
      const receipt = await tx.wait();
      let events = null;
      let buyNMEvent = null;
      let pId = null;

      if (receipt.status) {
        events = receipt.events;
        buyNMEvent = events?.filter((_e) => _e.event === 'BuyNexusMutual')[0];
        pId = buyNMEvent?.args?.pid.toString();
      }

      return {
        status: receipt.status,
        txn_hash: tx.hash,
        token_id: pId,
      };
    },
    [library, account],
  );

  const handleInsureAceStake = useCallback(
    async (param, applyDiscount) => {
      let tx;
      if (applyDiscount) {
        tx = await insure.buyCoverByToken(insuraceContractB, account, library.getSigner(), {
          ...param,
          token: await getCrvAddress(),
        });
      } else {
        tx = await insure.buyCoverByETH(insuraceContractA, param);
      }
      dispatch(setPendingTransaction(tx.hash));
      const receipt = await tx.wait();

      return {
        status: receipt.status,
        txn_hash: tx.hash,
      };
    },
    [library, account],
  );
  return {
    onNMStake: handleNexusMutualStake,
    onIAStake: handleInsureAceStake,
  };
};

export default useStakeForCover;
