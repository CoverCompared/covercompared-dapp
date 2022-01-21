import { ethers } from 'ethers';
import { metaCall } from '../biconomy';
import msoAbi from '../../config/abi/mso.json';
import { callWithEstimateGas, callWithEstimateGasPayable } from './estimateGas';
import { PRODUCT_CHAIN } from '../../config';

const buyProductByTokenForMSO = async (contractA, contractB, param, signer, account) => {
  const { policyId, value, period, token, conciergePrice, sig } = param;
  const funParam = [policyId, value, period, token, conciergePrice, sig];

  const contractInterface = new ethers.utils.Interface(msoAbi);
  let tx;
  try {
    tx = await metaCall(contractB, contractInterface, account, signer, PRODUCT_CHAIN.mso, {
      name: 'buyProductByToken',
      params: funParam,
    });
  } catch (error) {
    if (error.code === 151 || error.code === 150) {
      tx = await callWithEstimateGas(contractA, 'buyProductByToken', funParam);
    }
  }
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
