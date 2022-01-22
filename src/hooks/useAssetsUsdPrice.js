import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { getBalanceNumberByDecimal } from '../utils/getAssetPrice';
import useAddress from './useAddress';
import { useTokenContract, usePriceFeedContract } from './useContract';
import { getDecimalAmount, getBalanceNumber } from '../utils/formatBalance';
import { tokenDecimals } from '../config';

const useAssetsUsdPrice = (assetSymbol) => {
  const [assetPrice, setAssetPrice] = useState(0);
  const priceFeedContract = usePriceFeedContract(assetSymbol);
  const { getTokenAddress } = useAddress();
  const tokenAddress = getTokenAddress(assetSymbol);
  const tokenContract = useTokenContract(tokenAddress);
  useEffect(() => {
    const getPrice = async () => {
      const tokenDecimal = await tokenContract.decimals();
      const oneInWei = getDecimalAmount(1, tokenDecimal).toFixed();
      const res = await priceFeedContract.consult(tokenAddress, oneInWei);
      setAssetPrice(res ? getBalanceNumber(res.toString(), tokenDecimals.usdc) : 0);
    };
    getPrice();
  }, [assetSymbol]);

  return assetPrice;
};

export default useAssetsUsdPrice;
