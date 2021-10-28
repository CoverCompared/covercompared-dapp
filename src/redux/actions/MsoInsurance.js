import {
  BUY_MSO_INSURANCE,
  BUY_MSO_INSURANCE_SUCCESS,
  SET_BUY_MSO_INSURANCE_LOADER,
} from '../constants/ActionTypes';

export const buyMsoInsurance = (payload) => {
  return {
    type: BUY_MSO_INSURANCE,
    payload,
  };
};

export const buyMsoInsuranceSuccess = (payload) => {
  return {
    type: BUY_MSO_INSURANCE_SUCCESS,
    payload,
  };
};

export const setBuyMsoInsuranceLoader = (payload) => {
  return {
    type: SET_BUY_MSO_INSURANCE_LOADER,
    payload,
  };
};
