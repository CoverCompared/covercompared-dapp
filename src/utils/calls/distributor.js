const submitClaim = async (contract, param) => {
  const { tokenId, data } = param;
  const result = await contract.submitClaim(tokenId.toString(), data);
  const res = await result.wait();
  return res;
};

const submitRedeem = async (contract, param) => {
  const { tokenId, claimId } = param;
  const result = await contract.redeemClaim(tokenId.toString(), claimId.toString());
  const res = await result.wait();
  return res;
};

const getPayoutOutcome = async (contract, param) => {
  const { claimId } = param;
  const result = await contract.getPayoutOutcome();
  return result;
};

export default {
  submitClaim,
  submitRedeem,
  getPayoutOutcome,
};
