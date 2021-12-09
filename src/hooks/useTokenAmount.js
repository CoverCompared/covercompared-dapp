import { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from './useActiveWeb3React';
import { useExchangeAgentContract } from './useContract';
import { BIG_ZERO } from '../utils/bigNumber';

const useTokenAmount = () => {
  const { library, account } = useActiveWeb3React();
  const exchangeAgentContract = useExchangeAgentContract();

  const getETHAmountForUSDC = useCallback(
    async (desiredAmount) => {
      let ethAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount).multipliedBy(10 ** 18).toString();
      ethAmount = await exchangeAgentContract.getETHAmountForUSDC(big_desiredAmount);

      return new BigNumber(ethAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForUSDC = useCallback(
    async (token, desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount).multipliedBy(10 ** 18).toString();
      tokenAmount = await exchangeAgentContract.getTokenAmountForUSDC(token, big_desiredAmount);

      return new BigNumber(tokenAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForETH = useCallback(
    async (token, desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount).multipliedBy(10 ** 18).toString();
      tokenAmount = await exchangeAgentContract.getTokenAmountForETH(token, big_desiredAmount);

      return new BigNumber(tokenAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  return {
    getETHAmountForUSDC,
    getTokenAmountForUSDC,
    getTokenAmountForETH,
  };
};

export default useTokenAmount;