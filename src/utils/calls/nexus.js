import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import nexusMutualAbi from '../../config/abi/nexusMutualAbi.json';

const getProductPrice = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, data } = param;
  try {
    const result = await contract.getProductPrice(
      contractAddress,
      coverAsset,
      sumAssured,
      coverPeriod,
      coverType,
      data,
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const buyCoverByETH = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, maxPriceWithFee, data } =
    param;
  const tx = await contract.buyCoverByETH(
    contractAddress,
    coverAsset,
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
    { value: maxPriceWithFee },
  );
  return tx;
};

const buyCoverByToken = async (contract, account, signer, param) => {
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
  const tx = await metaCall(contract, contractInterface, account, signer, 42, {
    name: 'buyCoverByToken',
    params: [
      [token, contractAddress, coverAsset],
      sumAssured,
      coverPeriod,
      coverType,
      maxPriceWithFee,
      data,
    ],
  });
  return tx;
};

export default {
  getProductPrice,
  buyCoverByETH,
  buyCoverByToken,
};
