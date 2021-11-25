import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT } from '../../config';
import { getCrvAddress } from '../addressHelpers';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT
};

export const buyProductByToken = async (contract, param, account, sig) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const device = param.device_type;
  const brand = param.brand;
  const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === "Less than 12 months" ? 1 : 2;
  const token = await getCrvAddress();
  
  const tx = await contract.buyProductByToken(device, brand, value, purchMonth, durPlan, token, account, sig, options);
  const receipt = await tx.wait();

  return receipt.status;
}

export const buyProductByEth = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const device = param.device_type;
  const brand = param.brand === '' ? 'ACER' : param.brand;
  const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === "Less than 12 months" ? 1 : 2;
  
  const option = {
    gasLimit: DEFAULT_GAS_LIMIT,
    value: ethAmt
  }
  const tx = await contract.buyProductByETH(device, brand, value, purchMonth, durPlan, sig, option);
  const receipt = await tx.wait();

  return receipt.status;
}
