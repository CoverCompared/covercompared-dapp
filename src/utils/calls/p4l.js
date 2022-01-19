import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import p4lAbi from '../../config/abi/p4l.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';
import { PRODUCT_CHAIN } from '../../config';

const buyProductByToken = async (contract, param, signer, account, sig) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 6).toString(); // should be the decimals of USDC token

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;
  const { token } = param;

  const funParam = [policyId, value, durPlan, token, sig];

  const contractInterface = new ethers.utils.Interface(p4lAbi);
  let tx;
  try {
    tx = await metaCall(contract, contractInterface, account, signer, PRODUCT_CHAIN.p4l, {
      name: 'buyProductByToken',
      params: funParam,
    });
  } catch (error) {
    if (error.code === 151 || error.code === 150) {
      tx = await callWithEstimateGas(contract, 'buyProductByToken', funParam);
    }
  }
  return tx;
};

const buyProductByEth = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 6).toString();

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
