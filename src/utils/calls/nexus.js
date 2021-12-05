import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT, MSO_PLAN_TYPE } from '../../config';
import { getCrvAddress } from '../addressHelpers';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

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
  const receipt = await tx.wait();
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyCoverByToken = async (contract, param) => {
  const { contractAddress, coverAsset, sumAssured, coverPeriod, coverType, maxPriceWithFee, data } =
    param;
  const tx = await contract.buyCoverByToken(
    [getCrvAddress(), contractAddress, coverAsset],
    sumAssured,
    coverPeriod,
    coverType,
    maxPriceWithFee,
    data,
    options,
  );
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  getProductPrice,
  buyCoverByETH,
  buyCoverByToken,
};
