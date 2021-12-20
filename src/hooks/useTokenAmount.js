import { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from './useActiveWeb3React';
import { useExchangeAgentContract } from './useContract';
import { BIG_ZERO } from '../utils/bigNumber';
import { getCrvAddressByChainId } from '../utils/addressHelpers';

const useTokenAmount = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const exchangeAgentContract = useExchangeAgentContract();
  const cvrAddr = getCrvAddressByChainId(chainId || 4);

  const getNeededTokenAmount = useCallback(async (token0, token1, desiredAmount) => {
    const big_desiredAmount = new BigNumber(desiredAmount)
      .multipliedBy(10 ** 18)
      .toFixed(0)
      .toString();
    const tokenAmount = await exchangeAgentContract.getNeededTokenAmount(
      token0,
      token1,
      big_desiredAmount,
    );
    return new BigNumber(tokenAmount.toString());
  });
  const getETHAmountForUSDC = useCallback(
    async (desiredAmount) => {
      let ethAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** 18)
        .toFixed(0)
        .toString();
      ethAmount = await exchangeAgentContract.getETHAmountForUSDC(big_desiredAmount);

      return new BigNumber(ethAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForUSDC = useCallback(
    async (desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** 18)
        .toFixed(0)
        .toString();

      tokenAmount = await exchangeAgentContract.getTokenAmountForUSDC(cvrAddr, big_desiredAmount);

      return new BigNumber(tokenAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForETH = useCallback(
    async (token, desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** 18)
        .toFixed(0)
        .toString();
      tokenAmount = await exchangeAgentContract.getTokenAmountForETH(token, big_desiredAmount);

      return new BigNumber(tokenAmount.toString());
    },
    [library, account, exchangeAgentContract],
  );
  return {
    getNeededTokenAmount,
    getETHAmountForUSDC,
    getTokenAmountForUSDC,
    getTokenAmountForETH,
  };
};

export default useTokenAmount;
