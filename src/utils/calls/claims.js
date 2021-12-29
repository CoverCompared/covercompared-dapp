const submitCAVote = async (contract, param) => {
  const { claimId } = param;
  const result = await contract.submitCAVote(claimId.toString(), '1');
  const res = await result.wait();
  return res;
};

const checkVoteClosing = async (contract, param) => {
  const { claimId } = param;
  const result = await contract.checkVoteClosing(claimId.toString());
  return result;
};

export default {
  submitCAVote,
  checkVoteClosing,
};
