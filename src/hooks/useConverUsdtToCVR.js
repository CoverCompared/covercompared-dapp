import { useEffect, useState } from 'react';
import getAssetPriceBySymbol from '../utils/getAssetPrice';

const useConverUsdtToCVR = (usdtAmount) => {
  const [cvrAmount, setCvrAmount] = useState(0);

  useEffect(() => {
    const handleConvert = async () => {
      try {
        const usdtUSD = await getAssetPriceBySymbol('usdt');
        const cvrUSD = await getAssetPriceBySymbol('cvr');
        const cvrTokenAmount = cvrUSD === 0 ? 0 : (usdtAmount * usdtUSD) / cvrUSD;
        setCvrAmount(cvrTokenAmount);
      } catch (error) {
        setCvrAmount(0);
      }
    };
    handleConvert();
  }, []);

  return cvrAmount;
};

export default useConverUsdtToCVR;
