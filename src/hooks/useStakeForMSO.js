import { useCallback } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useMSOContract } from './useContract';
import mso from '../utils/calls/mso';
import { getSignMessageForMSO } from '../utils/getSignMessage';
import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';

const useStakeForMSO = () => {
  const { library, account } = useActiveWeb3React();
  const msoContract = useMSOContract();

  const handleStake = useCallback(
    async (param, ethAmt) => {
      // const message = await getSignMessageForMSO(param);
      // const sig = await signMessage(library, account, message);

      // if (sig) {
      //   const txHash = await mso.buyProductByEthForMSO(msoContract, param, sig, ethAmt);
      //   return {
      //     ...txHash,
      //   };
      // }

      // return {
      //   status: false,
      //   txn_hash: null,
      // };
      const txHash = await mso.buyProductByEthForMSO(msoContract, param, ethAmt);
      return {
        ...txHash,
      };
    },
    [library, msoContract, account],
  );

  return {
    onStake: handleStake,
  };
};

export const useStakeForMSOByToken = () => {
  const { library, account } = useActiveWeb3React();
  const msoContract = useMSOContract();
  const { getCrvAddress } = useAddress();

  const handleStake = useCallback(
    async (param) => {
      // const messageForToken = await getSignMessageForMSO(param, true);
      // const sigForToken = await signMessage(library, account, messageForToken);

      // if (!sigForToken) {
      //   return false;
      // }
      // const txHashForToken = await mso.buyProductByTokenForMSO(
      //   msoContract,
      //   { ...param, token: getCrvAddress() },
      //   account,
      //   sigForToken,
      // );
      const txHashForToken = await mso.buyProductByTokenForMSO(
        msoContract,
        { ...param, token: getCrvAddress() },
        account,
      );
      return {
        ...txHashForToken,
      };
    },
    [library, msoContract, account],
  );

  return {
    onStakeByToken: handleStake,
  };
};

export default useStakeForMSO;
