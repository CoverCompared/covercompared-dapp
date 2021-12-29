import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import msoAbi from '../../config/abi/mso.json';
import { callWithEstimateGasPayable } from './estimateGas';

const buyProductByTokenForMSO = async (contract, param, signer, account) => {
  const { policyId, value, period, token, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, token, conciergePrice, sig];

  const contractInterface = new ethers.utils.Interface(msoAbi);
  const { receipt, tx } = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyProductByToken',
    params: funParam,
  });
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
