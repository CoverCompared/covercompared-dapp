import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT } from '../../config';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

const submitClaim = async (contract, param) => {
  const { tokenId, data } = param;
  const result = await contract.submitClaim(tokenId.toString(), data);
  const res = await result.wait();
  return res;
};

const submitRedeem = async (contract, param) => {
  const { tokenId, claimId } = param;
  const result = await contract.redeemClaim(tokenId.toString(), claimId.toString(), options);
  const res = await result.wait();
  return res;
};

export default {
  submitClaim,
  submitRedeem,
};
