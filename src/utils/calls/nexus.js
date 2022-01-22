import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import nexusMutualAbi from '../../config/abi/nexusMutualAbi.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';
import { PRODUCT_CHAIN } from '../../config';

const getProductPrice = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, data } = param;
  const funParam = [contractAddress, coverAsset, sumAssured, coverPeriod, coverType, data];
  try {
    const result = await callWithEstimateGas(contract, 'getProductPrice', funParam);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const buyCoverByETH = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, maxPriceWithFee, data } =
    param;
  const funParam = [
    contractAddress,
    coverAsset,
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
  ];
  const tx = await callWithEstimateGasPayable(contract, 'buyCoverByETH', maxPriceWithFee, funParam);
  return tx;
};

const buyCoverByToken = async (contractA, contractB, account, signer, param) => {
  const {
    contractAddress,
    coverAsset,
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    token,
    data,
  } = param;
  const contractInterface = new ethers.utils.Interface(nexusMutualAbi);
  const funParam = [
    [token, contractAddress, coverAsset],
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
  ];
  let tx;
  try {
    tx = await metaCall(contractB, contractInterface, account, signer, PRODUCT_CHAIN.nexus, {
      name: 'buyCoverByToken',
      params: funParam,
    });
  } catch (error) {
    if (error.code === 151 || error.code === 150) {
      tx = await callWithEstimateGas(contractA, 'buyCoverByToken', funParam);
    }
  }
  return tx;
};

export default {
  getProductPrice,
  buyCoverByETH,
  buyCoverByToken,
};
