import { useEffect, useState } from 'react';
import getAssetPriceBySymbol from '../utils/getAssetPrice';

const useAssetsUsdPrice = (assetSymbol) => {
  const [assetPrice, setAssetPrice] = useState(0);

  useEffect(() => {
    const getPrice = async () => {
      const res = await getAssetPriceBySymbol(assetSymbol);
      if (res) {
        setAssetPrice(res);
      }
    };
    getPrice();
  }, [assetSymbol]);

  return assetPrice;
};

export default useAssetsUsdPrice;
