import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import msoAbi from '../../config/abi/mso.json';
import { callWithEstimateGasPayable } from './estimateGas';

const buyProductByTokenForMSO = async (contract, param, signer, account) => {
  const { policyId, value, period, token, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, token, conciergePrice, sig];

  const contractInterface = new ethers.utils.Interface(msoAbi);
  const tx = await metaCall(contract, contractInterface, account, signer, 4, {
    name: 'buyProductByToken',
    params: funParam,
  });
  return tx;
};

const buyProductByEthForMSO = async (contract, param, ethAmt) => {
  const { policyId, value, period, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, conciergePrice, sig];

  const tx = await callWithEstimateGasPayable(contract, 'buyProductByETH', ethAmt, funParam);
  return tx;
};

export default {
  buyProductByTokenForMSO,
  buyProductByEthForMSO,
};
