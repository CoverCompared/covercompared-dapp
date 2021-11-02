import { useEffect, useState } from 'react';
import getAssetPriceBySymbol from '../utils/getAssetPrice';

const useConverUsdtToCRV = (usdtAmount) => {
  const [crvAmount, setCrvAmount] = useState(0);

  useEffect(() => {
    const handleConvert = async () => {
      try {
        const usdtUSD = await getAssetPriceBySymbol('usdt');
        const crvUSD = await getAssetPriceBySymbol('crv');
        const crvTokenAmount = crvUSD === 0 ? 0 : (usdtAmount * usdtUSD) / crvUSD;
        setCrvAmount(crvTokenAmount);
      } catch (error) {
        setCrvAmount(0);
      }
    };
    handleConvert();
  }, []);

  return crvAmount;
};

export default useConverUsdtToCRV;
