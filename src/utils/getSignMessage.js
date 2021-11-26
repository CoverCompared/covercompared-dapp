import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

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
  const value = isUseCrv
    ? new BigNumber(param.discount_amount).multipliedBy(10 ** 18)
    : new BigNumber(param.total_amount).multipliedBy(10 ** 18);

  const device = param.device_type;
  const brand = param.brand === '' ? 'ACER' : param.brand;
  const purchMonth = new Date().getMonth() + 1;
  const durPlan = param.puchase_month === 'Less than 12 months' ? 1 : 2;

  const hexDeviceStr = getHexStrFromStr(device);
  const hexBrandStr = getHexStrFromStr(brand);
  const paddedValueHexStr = getPaddedHexStrFromBN(value);
  const paddedPurchMonthHexStr = getPaddedHexStrFromINT(purchMonth);
  const paddedDurPlanHexStr = getPaddedHexStrFromINT(durPlan);

  return (
    hexDeviceStr +
    hexBrandStr.slice(2) +
    paddedValueHexStr.slice(2) +
    paddedPurchMonthHexStr.slice(2) +
    paddedDurPlanHexStr.slice(2)
  );
};

export default getSignMessage;
