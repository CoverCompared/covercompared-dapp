import { getPriceFeedAddressBySymbol } from './addressHelpers';
import { getPriceFeedContract } from './contractHelpers';

const getAssetPriceBySymbol = (symbol) => {
  const priceFeedAddress = getPriceFeedAddressBySymbol(symbol);
  const priceFeedContract = getPriceFeedContract(priceFeedAddress);

  priceFeedContract.methods
    .latestRoundData()
    .call()
    .then((roundData) => {
      console.log('Latest Round Data', roundData);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default getAssetPriceBySymbol;
