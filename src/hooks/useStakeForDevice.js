import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import { useP4LContract as useP4LContractA } from './useContract';
import { useP4LContract as useP4LContractB } from './useContractForBiconomy';
import p4l from '../utils/calls/p4l';
// import getSignMessage from '../utils/getSignMessage';
// import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';
import { setTransactionState } from '../redux/actions';

const useStakeForDevice = () => {
  const { library, account } = useActiveWeb3React();
  const p4lContract = useP4LContractA();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param, ethAmt, signature) => {
      if (signature) {
        const txHash = await p4l.buyProductByEth(p4lContract, param, signature, ethAmt);
        return {
          ...txHash,
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
  const { library, account } = useActiveWeb3React();
  const p4lContract = useP4LContractB();
  const { getCrvAddress } = useAddress();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param, signature) => {
      if (param.discount_amount > 0 && signature) {
        const txHashForToken = await p4l.buyProductByToken(
          p4lContract,
          { ...param, token: await getCrvAddress() },
          library.getSigner(),
          account,
          signature,
        );
        return {
          ...txHashForToken,
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
