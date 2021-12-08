import { useEffect, useState } from 'react';
import { getBalanceNumberByDecimal } from '../utils/getAssetPrice';
import { usePriceFeedContract } from './useContract';

const useAssetsUsdPrice = (assetSymbol) => {
  const [assetPrice, setAssetPrice] = useState(0);
  const priceFeedContract = usePriceFeedContract(assetSymbol);

  useEffect(() => {
    const getPrice = async () => {
      const res = await priceFeedContract.latestRoundData();
      setAssetPrice(res ? getBalanceNumberByDecimal(res.answer) : 0);
    };
    getPrice();
  }, [assetSymbol]);

  return assetPrice;
};

export default useAssetsUsdPrice;
