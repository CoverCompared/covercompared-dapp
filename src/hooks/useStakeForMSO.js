import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useMSOContract } from './useContract';
import { buyProductByTokenForMSO, buyProductByEthForMSO } from '../utils/calls';
import { getSignMessageForMSO } from '../utils/getSignMessage';
import { signMessage } from '../utils/getLibrary';

const useStakeForMSO = () => {
  const { library, account } = useActiveWeb3React();
  const msoContract = useMSOContract();

  const handleStake = useCallback(
    async (param, ethAmt) => {
      const message = await getSignMessageForMSO(param);
      const sig = await signMessage(library, account, message);
      if (sig && param.discount_amount > 0) {
        const messageForToken = await getSignMessageForMSO(param, true);
        const sigForToken = await signMessage(library, account, messageForToken);

        if (!sigForToken) {
          return false;
        }

        const txHashForToken = await buyProductByTokenForMSO(
          msoContract,
          param,
          account,
          sigForToken,
        );

        const txHash = await buyProductByEthForMSO(msoContract, param, sig, ethAmt);
        return {
          status: txHashForToken.status && txHash.status,
          txn_hash: txHash.txn_hash,
          token_txn_hash: txHashForToken.txn_hash,
        };
      }
      if (sig) {
        const txHash = await buyProductByEthForMSO(msoContract, param, sig, ethAmt);
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
    [library, msoContract, account],
  );

  return {
    onStake: handleStake,
  };
};

export default useStakeForMSO;
