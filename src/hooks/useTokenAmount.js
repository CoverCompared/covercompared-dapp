import { useCallback } from 'react';
import BigNumber from 'bignumber.js';
import useActiveWeb3React from './useActiveWeb3React';
import { useExchangeAgentContract } from './useContract';
import { BIG_ZERO } from '../utils/bigNumber';
import { getCvrAddressByChainId } from '../utils/addressHelpers';
import { getErc20Contract } from '../utils/contractHelpers';
import useAddress from './useAddress';
import { getBalanceNumber } from '../utils/formatBalance';
import { tokenDecimals } from '../config';

const useTokenAmount = () => {
  const { library, account, chainId } = useActiveWeb3React();
  const exchangeAgentContract = useExchangeAgentContract();
  const cvrAddr = getCvrAddressByChainId(chainId || 4);

  const getNeededTokenAmount = useCallback(
    async (token0, token1, desiredAmount) => {
      if (!token0 || !token1 || !desiredAmount) {
        return BIG_ZERO;
      }
      const token0Contract = getErc20Contract(token0, library);
      const token1Contract = getErc20Contract(token1, library);
      const decimals0 = await token0Contract.decimals();
      const decimals1 = await token1Contract.decimals();
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** decimals1)
        .toFixed(0)
        .toString();
      const tokenAmount = await exchangeAgentContract.getNeededTokenAmount(
        token0,
        token1,
        big_desiredAmount,
      );
      // return new BigNumber(tokenAmount.toString());
      return {
        parsedVal: getBalanceNumber(new BigNumber(tokenAmount.toString()), decimals0),
        weiVal: new BigNumber(tokenAmount.toString()),
      };
    },
    [library, account],
  );
  const getETHAmountForUSDC = useCallback(
    async (desiredAmount) => {
      let ethAmount = BIG_ZERO;
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** tokenDecimals.usdc)
        .toFixed(0)
        .toString();
      ethAmount = await exchangeAgentContract.getETHAmountForUSDC(big_desiredAmount);

      // return new BigNumber(ethAmount.toString());
      return {
        parsedVal: getBalanceNumber(new BigNumber(ethAmount.toString())),
        weiVal: new BigNumber(ethAmount.toString()),
      };
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForUSDC = useCallback(
    async (desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const tokenContract = getErc20Contract(cvrAddr, library);
      const decimals = await tokenContract.decimals();
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** tokenDecimals.usdc)
        .toFixed(0)
        .toString();

      tokenAmount = await exchangeAgentContract.getTokenAmountForUSDC(cvrAddr, big_desiredAmount);

      // return new BigNumber(tokenAmount.toString());
      return {
        parsedVal: getBalanceNumber(new BigNumber(tokenAmount.toString()), decimals),
        weiVal: new BigNumber(tokenAmount.toString()),
      };
    },
    [library, account, exchangeAgentContract],
  );
  const getTokenAmountForETH = useCallback(
    async (token, desiredAmount) => {
      let tokenAmount = BIG_ZERO;
      const tokenContract = getErc20Contract(token, library);
      const decimals = await tokenContract.decimals();
      const big_desiredAmount = new BigNumber(desiredAmount)
        .multipliedBy(10 ** 18)
        .toFixed(0)
        .toString();
      tokenAmount = await exchangeAgentContract.getTokenAmountForETH(token, big_desiredAmount);

      return {
        parsedVal: getBalanceNumber(new BigNumber(tokenAmount.toString()), decimals),
        weiVal: new BigNumber(tokenAmount.toString()),
      };
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
