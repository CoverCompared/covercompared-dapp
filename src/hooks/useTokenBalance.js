import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from './useActiveWeb3React';
import { BIG_ZERO } from '../utils/bigNumber';
import ethSimpleProvider from '../utils/providers';
import { getErc20Contract } from '../utils/contractHelpers';
import useLastUpdated from './useLastUpdated';

export const FetchStatus = {
  NOT_FETCHED: 'not-fetched',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const useTokenBalance = (tokenAddress) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account, library } = useActiveWeb3React();
  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getErc20Contract(tokenAddress, library);
      try {
        const res = await contract.balanceOf(account);
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS });
      } catch (e) {
        console.error(e);
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, SUCCESS, FAILED]);

  return balanceState;
};

export const useGetEthBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [balance, setBalance] = useState(ethers.BigNumber.from(0));
  const { account, chainId, library } = useActiveWeb3React();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await library.getBalance(account);
        setBalance(walletBalance);
        setFetchStatus(FetchStatus.SUCCESS);
      } catch {
        setFetchStatus(FetchStatus.FAILED);
      }
    };
    if (account) {
      fetchBalance();
    }
  }, [account, chainId, library, lastUpdated, setBalance, setFetchStatus]);

  return { balance, fetchStatus, refresh: setLastUpdated };
};

export default useTokenBalance;
