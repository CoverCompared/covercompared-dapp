import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useP4LContract } from './useContract';
import p4l from '../utils/calls/p4l';
import getSignMessage from '../utils/getSignMessage';
import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';

const useStakeForDevice = () => {
  const { library, account } = useActiveWeb3React();
  const p4lContract = useP4LContract();
  const { getCrvAddress } = useAddress();

  const handleStake = useCallback(
    async (param, ethAmt) => {
      const message = await getSignMessage(param);
      const sig = await signMessage(library, account, message);

      if (sig && param.discount_amount > 0) {
        const messageForToken = await getSignMessage(param, true);
        const sigForToken = await signMessage(library, account, messageForToken);

        if (!sigForToken) {
          return false;
        }

        const txHashForToken = await p4l.buyProductByToken(
          p4lContract,
          { ...param, token: getCrvAddress() },
          account,
          sigForToken,
        );
        const txHash = await p4l.buyProductByEth(p4lContract, param, sig, ethAmt);
        return {
          status: txHashForToken.status && txHash.status,
          txn_hash: txHash.txn_hash,
          token_txn_hash: txHashForToken.txn_hash,
        };
      }
      if (sig) {
        const txHash = await p4l.buyProductByEth(p4lContract, param, sig, ethAmt);
        return {
          ...txHash,
          token_txn_hash: null,
        };
      }
      return {
        status: false,
        txn_hash: null,
        token_txn_hash: null,
      };
    },
    [library, p4lContract, account],
  );

  return {
    onStake: handleStake,
  };
};

export default useStakeForDevice;
