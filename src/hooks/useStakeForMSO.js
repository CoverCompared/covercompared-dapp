import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useActiveWeb3React from './useActiveWeb3React';
import { useMSOContract as useMSOContractA } from './useContract';
import { useMSOContract as useMSOContractB } from './useContractForBiconomy';
import mso from '../utils/calls/mso';
import { getSignMessageForMSO } from '../utils/getSignMessage';
import { signMessage } from '../utils/getLibrary';
import useAddress from './useAddress';
import { setPendingTransaction } from '../redux/actions';
import { BASE_SCAN_URLS } from '../config';

const useStakeForMSO = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const msoContract = useMSOContractA();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param, ethAmt) => {
      let tx = await mso.buyProductByEthForMSO(msoContract, param, ethAmt);
      tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      dispatch(setPendingTransaction(tx));
      const receipt = await tx.wait();
      return {
        status: receipt.status,
        txn_hash: tx.hash,
      };
    },
    [library, msoContract, account],
  );

  return {
    onStake: handleStake,
  };
};

export const useStakeForMSOByToken = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const msoContract = useMSOContractB();
  const { getCvrAddress } = useAddress();
  const dispatch = useDispatch();
  const handleStake = useCallback(
    async (param) => {
      let tx = await mso.buyProductByTokenForMSO(
        msoContract,
        { ...param, token: await getCvrAddress() },
        library.getSigner(),
        account,
      );
      tx = { ...tx, description: '', etherscan: BASE_SCAN_URLS[chainId] };
      dispatch(setPendingTransaction(tx));
      const receipt = await tx.wait();
      return {
        status: receipt.status,
        txn_hash: tx.hash,
      };
    },
    [library, msoContract, account],
  );

  return {
    onStakeByToken: handleStake,
  };
};

export default useStakeForMSO;
