import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const getHexStrFromStr = (str) => {
  const strBytes = ethers.utils.toUtf8Bytes(str);
  return ethers.utils.hexlify(strBytes);
};

const getPaddedHexStrFromBN = (bn) => {
  return ethers.utils.hexZeroPad(`0x${bn.toString(16)}`, 32);
};

const getPaddedHexStrFromINT = (bn) => {
  const hexStr = ethers.utils.hexlify(bn);
  return ethers.utils.hexZeroPad(hexStr, 32);
};

const getSignMessage = (param, isUseCvr = false) => {
  const value = new BigNumber(param.total_amount).multipliedBy(10 ** 18); // should be the decimals of USDC token

  const policyId = param.policyId === undefined ? 'first-test' : param.policyId;
  const durPlan = param.purchase_month === 'Less than 12 months' ? 1 : 2;

  const hexDeviceStr = getHexStrFromStr(policyId);
  const paddedValueHexStr = getPaddedHexStrFromBN(value);
  const paddedDurPlanHexStr = getPaddedHexStrFromINT(durPlan);

  return hexDeviceStr + paddedValueHexStr.slice(2) + paddedDurPlanHexStr.slice(2);
};

export const getSignMessageForMSO = (param, isUseCvr = false) => {
  const { policyId, value, period, conciergePrice } = param;

  const hexProductName = getHexStrFromStr(policyId);
  const paddedValueHexStr = getPaddedHexStrFromBN(new BigNumber(value));
  const paddedPeriod = getPaddedHexStrFromINT(period);
  const paddedAddonServicePrice = getPaddedHexStrFromBN(new BigNumber(conciergePrice));

  return (
    hexProductName +
    paddedValueHexStr.slice(2) +
    paddedPeriod.slice(2) +
    paddedAddonServicePrice.slice(2)
  );
};

export default getSignMessage;
