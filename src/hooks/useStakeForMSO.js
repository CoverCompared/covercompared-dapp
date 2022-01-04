import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import { useMSOContract } from './useContract';
import mso from '../utils/calls/mso';
import { getSignMessageForMSO } from '../utils/getSignMessage';
import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';
import { setTransactionState } from '../redux/actions';

const useStakeForMSO = () => {
  const { library, account } = useActiveWeb3React();
  const msoContract = useMSOContract();
  const dispatch = useDispatch();
  const setTxState = (tx) => {
    dispatch(setTransactionState(tx));
  };
  const handleStake = useCallback(
    async (param, ethAmt) => {
      const txHash = await mso.buyProductByEthForMSO(msoContract, param, ethAmt, setTxState);
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
  const dispatch = useDispatch();
  const setTxState = (tx) => {
    dispatch(setTransactionState(tx));
  };
  const handleStake = useCallback(
    async (param) => {
      const txHashForToken = await mso.buyProductByTokenForMSO(
        msoContract,
        { ...param, token: getCrvAddress() },
        account,
        setTxState,
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
