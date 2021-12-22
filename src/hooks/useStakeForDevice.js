import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useP4LContract } from './useContract';
import p4l from '../utils/calls/p4l';
// import getSignMessage from '../utils/getSignMessage';
// import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';

const useStakeForDevice = () => {
  const { library, account } = useActiveWeb3React();
  const p4lContract = useP4LContract();

  const handleStake = useCallback(
    async (param, ethAmt, signature) => {
      // const msg = await getSignMessage(param);
      // const sig = await signMessage(library, account, msg);
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
  const p4lContract = useP4LContract();
  const { getCrvAddress } = useAddress();

  const handleStake = useCallback(
    async (param, signature) => {
      // const sigForToken = await signMessage(library, account, signature);
      if (param.discount_amount > 0 && signature) {
        const txHashForToken = await p4l.buyProductByToken(
          p4lContract,
          { ...param, token: getCrvAddress() },
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
