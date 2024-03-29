import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from './useActiveWeb3React';
import { getCvrAddressByChainId } from '../utils/addressHelpers';
import { BIG_ZERO } from '../utils/bigNumber';
import { getErc20Contract } from '../utils/contractHelpers';
import useLastUpdated from './useLastUpdated';
import useAddress from './useAddress';

export const FetchStatus = {
  NOT_FETCHED: 'not-fetched',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const useTokenBalance = (tokenSymbol = 'cvr') => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState({
    balance: BIG_ZERO,
    decimals: 18,
    fetchStatus: NOT_FETCHED,
  });
  const { account, library, chainId } = useActiveWeb3React();
  const { getTokenAddress } = useAddress();
  // const tokenAddress = getCvrAddressByChainId(chainId || 4);
  const tokenAddress = getTokenAddress(tokenSymbol);
  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getErc20Contract(tokenAddress, library);
      try {
        const decimals = await contract.decimals();
        const res = await contract.balanceOf(account);
        setBalanceState({ balance: new BigNumber(res.toString()), decimals, fetchStatus: SUCCESS });
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
        setBalance(walletBalance.toString());
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
