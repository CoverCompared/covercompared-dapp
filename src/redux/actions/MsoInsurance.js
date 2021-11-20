import {
  RESET_MSO_INSURANCE,
  BUY_MSO_INSURANCE,
  BUY_MSO_INSURANCE_SUCCESS,
  SET_BUY_MSO_INSURANCE_LOADER,
  SEARCH_MSO_LIST,
  SEARCH_MSO_LIST_SUCCESS,
  SET_SEARCH_MSO_LIST_LOADER,
} from '../constants/ActionTypes';

export const resetMsoInsurance = (payload) => {
  return {
    type: RESET_MSO_INSURANCE,
    payload,
  };
};

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

export const searchMSOList = (payload) => {
  return {
    type: SEARCH_MSO_LIST,
    payload,
  };
};
export const searchMSOListSuccess = (payload) => {
  return {
    type: SEARCH_MSO_LIST_SUCCESS,
    payload,
  };
};

export const setSearchMSOListLoader = (payload) => {
  return {
    type: SET_SEARCH_MSO_LIST_LOADER,
    payload,
  };
};
