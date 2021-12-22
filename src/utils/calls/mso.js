import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';

const buyProductByTokenForMSO = async (contract, param, account) => {
  const { policyId, value, period, token, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, token, conciergePrice, sig];

  const tx = await callWithEstimateGas(contract, 'buyProductByToken', funParam);
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyProductByEthForMSO = async (contract, param, ethAmt) => {
  const { policyId, value, period, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, conciergePrice, sig];

  const tx = await callWithEstimateGasPayable(contract, 'buyProductByETH', ethAmt, funParam);
  const receipt = await tx.wait();
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  buyProductByTokenForMSO,
  buyProductByEthForMSO,
};
