import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import p4lAbi from '../../config/abi/p4l.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';

const buyProductByToken = async (contract, param, signer, account, sig) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;
  const { token } = param;

  const funParam = [policyId, value, durPlan, token, sig];

  const contractInterface = new ethers.utils.Interface(p4lAbi);
  const tx = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyProductByToken',
    params: funParam,
  });
  return tx;
};

const buyProductByEth = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;

  const funParam = [policyId, value, durPlan, sig];
  const tx = await callWithEstimateGasPayable(contract, 'buyProductByETH', ethAmt, funParam);
  return tx;
};

export default {
  buyProductByToken,
  buyProductByEth,
};
