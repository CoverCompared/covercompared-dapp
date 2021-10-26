import {
  BUY_DEVICE_INSURANCE,
  BUY_DEVICE_INSURANCE_SUCCESS,
  SET_BUY_DEVICE_INSURANCE_LOADER,
} from '../constants/ActionTypes';

export const buyDeviceInsurance = (payload) => {
  return {
    type: BUY_DEVICE_INSURANCE,
    payload,
  };
};

export const buyDeviceInsuranceSuccess = (payload) => {
  return {
    type: BUY_DEVICE_INSURANCE_SUCCESS,
    payload,
  };
};

export const setBuyDeviceInsuranceLoader = (payload) => {
  return {
    type: SET_BUY_DEVICE_INSURANCE_LOADER,
    payload,
  };
};
