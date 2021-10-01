import { getPriceFeedAddressBySymbol } from './addressHelpers';
import { getPriceFeedContract } from './contractHelpers';

const getAssetPriceBySymbol = async (symbol) => {
  const priceFeedAddress = getPriceFeedAddressBySymbol(symbol);
  const priceFeedContract = getPriceFeedContract(priceFeedAddress);
  const res = await priceFeedContract.latestRoundData();
  return getBalanceNumberByDecimal(res.answer);
};

export const getBalanceNumberByDecimal = (balance, decimals = 8) => {
  return balance ? parseInt(balance._hex, 16)/(10 ** decimals) : 0
}

export default getAssetPriceBySymbol;
