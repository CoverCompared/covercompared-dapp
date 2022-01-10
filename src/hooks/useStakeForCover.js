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
import { BASE_SCAN_URLS, ETH_ADDRESS } from '../config';

const useStakeForCover = () => {
  const { library, account, chainId } = useActiveWeb3React();
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
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      } else {
        tx = await nexus.buyCoverByETH(nexusContractA, { ...param, maxPriceWithFee });
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      }
      dispatch(setPendingTransaction(tx));
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
      const currency = param.data[3]; // cover currency
      const isETHCover = currency.toLowerCase() === ETH_ADDRESS.toLowerCase();
      let tx;
      if (applyDiscount) {
        if (isETHCover) {
          tx = await insure.buyETHCoverByToken(insuraceContractB, account, library.getSigner(), {
            ...param,
            token: await getCrvAddress(),
          });
        } else {
          tx = await insure.buyTokenCoverByToken(insuraceContractB, account, library.getSigner(), {
            ...param,
            token: await getCrvAddress(),
          });
        }
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      } else if (isETHCover) {
        tx = await insure.buyETHCoverByETH(insuraceContractA, param);
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      } else {
        tx = null;
      }

      if (tx) {
        dispatch(setPendingTransaction(tx));
        const receipt = await tx.wait();

        return {
          status: receipt.status,
          txn_hash: tx.hash,
        };
      }
      return null;
    },
    [library, account],
  );
  return {
    onNMStake: handleNexusMutualStake,
    onIAStake: handleInsureAceStake,
  };
};

export default useStakeForCover;
