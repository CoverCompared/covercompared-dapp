import BigNumber from 'bignumber.js';

const buyProductByToken = async (contract, param, account, sig) => {
  const value = new BigNumber(param.discount_amount).multipliedBy(10 ** 18).toString(); // should be the decimals of USDC token

  const device = param.device_type;
  const { brand } = param;
  const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;
  const { token } = param;

  const tx = await contract.buyProductByToken(
    device,
    brand,
    value,
    purchMonth,
    durPlan,
    token,
    account,
    sig,
  );
  const receipt = await tx.wait();

  return {
    status: receipt.status,
    txn_hash: tx.hash,
  };
};

const buyProductByEth = async (contract, param, sig, ethAmt) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18).toString();

  const device = param.device_type;
  const brand = param.brand === '' ? 'ACER' : param.brand;
  const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;

  const option = {
    value: ethAmt,
  };
  const tx = await contract.buyProductByETH(device, brand, value, purchMonth, durPlan, sig, option);
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
