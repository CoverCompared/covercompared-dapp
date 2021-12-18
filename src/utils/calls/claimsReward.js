const closeClaim = async (contract, param) => {
  const { claimId } = param;
  const result = await contract.closeClaim(claimId.toString());
  const res = await result.wait();
  return res;
};

export default {
  closeClaim,
};
