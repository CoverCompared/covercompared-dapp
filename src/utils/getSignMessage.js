import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { MSO_PLAN_TYPE } from '../config';

const getHexStrFromStr = (str) => {
  const strBytes = ethers.utils.toUtf8Bytes(str);
  return ethers.utils.hexlify(strBytes);
};

const getPaddedHexStrFromBN = (bn) => {
  // const hexStr = ethers.utils.hexlify(bn);
  return ethers.utils.hexZeroPad(`0x${bn.toString(16)}`, 32);
};

const getPaddedHexStrFromINT = (bn) => {
  const hexStr = ethers.utils.hexlify(bn);
  return ethers.utils.hexZeroPad(hexStr, 32);
};

const getSignMessage = (param, isUseCrv = false) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18); // should be the decimals of USDC token

  const policyId = param.id === undefined ? 'first-test' : param.id;
  // const brand = param.brand === '' ? 'ACER' : param.brand;
  // const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;

  const hexDeviceStr = getHexStrFromStr(policyId);
  // const hexBrandStr = getHexStrFromStr(brand);
  const paddedValueHexStr = getPaddedHexStrFromBN(value);
  // const paddedPurchMonthHexStr = getPaddedHexStrFromINT(purchMonth);
  const paddedDurPlanHexStr = getPaddedHexStrFromINT(durPlan);

  return hexDeviceStr + paddedValueHexStr.slice(2) + paddedDurPlanHexStr.slice(2);
};

export const getSignMessageForMSO = (param, isUseCrv = false) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18); // should be the decimals of USDC token

  const productName = param.plan_name ? param.plan_name : '';
  const period = MSO_PLAN_TYPE[`${param.plan_type}`];
  const addonServicePrice = new BigNumber(param.mso_addon_service).multipliedBy(10 ** 18); // should be the decimals of USDC token

  const hexProductName = getHexStrFromStr(productName);
  const paddedValueHexStr = getPaddedHexStrFromBN(value);
  const paddedPeriod = getPaddedHexStrFromINT(period);
  const paddedAddonServicePrice = getPaddedHexStrFromBN(addonServicePrice);

  return (
    hexProductName +
    paddedValueHexStr.slice(2) +
    paddedPeriod.slice(2) +
    paddedAddonServicePrice.slice(2)
  );
};

export default getSignMessage;
