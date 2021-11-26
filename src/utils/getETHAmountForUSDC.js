import BigNumber from 'bignumber.js';
import { getExchangeAgentContract } from './contractHelpers';
import { BIG_ZERO } from './bigNumber';

const getETHAmountForUSDC = async (desiredAmount) => {
  let ethAmount = BIG_ZERO;
  const exchangeAgentContract = await getExchangeAgentContract();
  const big_desiredAmount = new BigNumber(desiredAmount).multipliedBy(10 ** 18).toString();
  ethAmount = await exchangeAgentContract.getETHAmountForUSDC(big_desiredAmount);

  return new BigNumber(ethAmount.toString());
};

export const getTokenAmountForUSDC = async (token, desiredAmount) => {
  let tokenAmount = BIG_ZERO;
  const exchangeAgentContract = await getExchangeAgentContract();
  const big_desiredAmount = new BigNumber(desiredAmount).multipliedBy(10 ** 18).toString();
  tokenAmount = await exchangeAgentContract.getTokenAmountForUSDC(token, big_desiredAmount);

  return new BigNumber(tokenAmount.toString());
};

export default getETHAmountForUSDC;
