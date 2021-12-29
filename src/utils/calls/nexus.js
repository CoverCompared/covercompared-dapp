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
  const receipt = await tx.wait();

  let events = null;
  let buyNMEvent = null;
  let pId = null;

  if (receipt.status) {
    events = receipt.events;
    buyNMEvent = events?.filter((_e) => _e.event === 'BuyNexusMutual')[0];
    pId = buyNMEvent?.args?.pid.toString();
  }

  return {
    status: receipt.status,
    txn_hash: tx.hash,
    token_id: pId,
  };
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
  const { receipt, tx } = await metaCall(contract, contractInterface, account, signer, 42, {
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
  let events = null;
  let buyNMEvent = null;
  let pId = null;
  if (receipt.status) {
    events = receipt.events;
    buyNMEvent = events?.filter((_e) => _e.event === 'BuyNexusMutual')[0];
    pId = buyNMEvent?.args?.pid.toString();
  }

  return {
    status: receipt.status,
    txn_hash: tx.hash,
    token_id: pId,
  };
};

export default {
  getProductPrice,
  buyCoverByETH,
  buyCoverByToken,
};
