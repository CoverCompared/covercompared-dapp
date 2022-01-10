import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import { useP4LContract as useP4LContractA } from './useContract';
import { useP4LContract as useP4LContractB } from './useContractForBiconomy';
import p4l from '../utils/calls/p4l';
// import getSignMessage from '../utils/getSignMessage';
// import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';
import { setPendingTransaction } from '../redux/actions';
import { BASE_SCAN_URLS } from '../config';

const useStakeForDevice = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const p4lContract = useP4LContractA();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param, ethAmt, signature) => {
      if (signature) {
        let tx = await p4l.buyProductByEth(p4lContract, param, signature, ethAmt);
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
        dispatch(setPendingTransaction(tx));
        const receipt = await tx.wait();
        return {
          status: receipt.status,
          txn_hash: tx.hash,
        };
      }
      return {
        status: false,
        txn_hash: null,
      };
    },
    [library, p4lContract, account],
  );

  return {
    onStake: handleStake,
  };
};

export const useStakeForDeviceByToken = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const p4lContract = useP4LContractB();
  const { getCvrAddress } = useAddress();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param, signature) => {
      if (param.discount_amount > 0 && signature) {
        let tx = await p4l.buyProductByToken(
          p4lContract,
          { ...param, token: await getCvrAddress() },
          library.getSigner(),
          account,
          signature,
        );
        tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
        dispatch(setPendingTransaction(tx));
        const receipt = await tx.wait();
        return {
          status: receipt.status,
          txn_hash: tx.hash,
        };
      }
      return {
        status: true,
        txn_hash: null,
      };
    },
    [library, p4lContract, account],
  );

  return {
    onStakeByToken: handleStake,
  };
};

export default useStakeForDevice;
