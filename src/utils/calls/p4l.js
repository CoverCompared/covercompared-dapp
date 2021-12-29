import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import p4lAbi from '../../config/abi/p4l.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';

const buyProductByToken = async (contract, param, signer, account, sig, setTxState) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;
  const { token } = param;

  const funParam = [policyId, value, durPlan, token, sig];

  const contractInterface = new ethers.utils.Interface(p4lAbi);
  const { receipt, tx } = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyProductByToken',
    params: funParam,
  });
  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyProductByEth = async (contract, param, sig, ethAmt, setTxState) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;

  const funParam = [policyId, value, durPlan, sig];
  const tx = await callWithEstimateGasPayable(contract, 'buyProductByETH', ethAmt, funParam);
  setTxState({ state: 'pending', hash: tx.hash });
  const receipt = await tx.wait();
  setTxState({ state: 'confirmed', hash: tx.hash });

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

export default {
  buyProductByToken,
  buyProductByEth,
};
