import BigNumber from 'bignumber.js';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';

const buyProductByToken = async (contract, param, account, sig) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const policyId = param.id === undefined ? 'first-test' : param.id;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;
  const { token } = param;

  const funParam =[
    policyId,
    value,
    durPlan,
    token,
    sig,
  ];

  const tx = await callWithEstimateGas(contract, 'buyProductByToken', funParam);
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyProductByEth = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const policyId = param.id === undefined ? 'first-test' : param.id;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;

  const funParam =[policyId, value, durPlan, sig];
  const tx = await callWithEstimateGasPayable(contract, 'buyProductByETH', ethAmt, funParam);
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  buyProductByToken,
  buyProductByEth,
};
