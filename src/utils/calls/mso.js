import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT, MSO_PLAN_TYPE } from '../../config';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};

const buyProductByTokenForMSO = async (contract, param, account, sig) => {
  const value = new BigNumber(param.discount_amount).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const productName = param.plan_name;
  const period = MSO_PLAN_TYPE[`${param.plan_type}`];
  const { token } = param;
  const conciergePrice = new BigNumber(param.mso_addon_service).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const tx = await contract.buyProductByToken(
    productName,
    value,
    period,
    token,
    account,
    conciergePrice,
    sig,
    options,
  );
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyProductByEthForMSO = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const productName = param.plan_name;
  const period = MSO_PLAN_TYPE[`${param.plan_type}`];
  const conciergePrice = new BigNumber(param.mso_addon_service).multipliedBy(10 ** 18).toString();

  const option = {
    gasLimit: DEFAULT_GAS_LIMIT,
    value: ethAmt,
  };
  const tx = await contract.buyProductByETH(
    productName,
    value,
    period,
    conciergePrice,
    sig,
    option,
  );

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
