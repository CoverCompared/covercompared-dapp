import {
  BUY_DEVICE_INSURANCE,
  BUY_DEVICE_INSURANCE_SUCCESS,
  SET_BUY_DEVICE_INSURANCE_LOADER,
  GET_DEVICE_DETAILS,
  GET_DEVICE_DETAILS_SUCCESS,
  SET_GET_DEVICE_DETAILS_LOADER,
  GET_DEVICE_PLAN_DETAILS,
  GET_DEVICE_PLAN_DETAILS_SUCCESS,
  SET_GET_DEVICE_PLAN_DETAILS_LOADER,
  GET_DEVICE_MODEL_DETAILS,
  GET_DEVICE_MODEL_DETAILS_SUCCESS,
  SET_GET_DEVICE_MODEL_DETAILS_LOADER,
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

export const getDeviceDetails = (payload) => {
  return {
    type: GET_DEVICE_DETAILS,
    payload,
  };
};

export const getDeviceDetailsSuccess = (payload) => {
  return {
    type: GET_DEVICE_DETAILS_SUCCESS,
    payload,
  };
};

export const setGetDeviceDetailsLoader = (payload) => {
  return {
    type: SET_GET_DEVICE_DETAILS_LOADER,
    payload,
  };
};

export const getDevicePlanDetails = (payload) => {
  return {
    type: GET_DEVICE_PLAN_DETAILS,
    payload,
  };
};

export const getDevicePlanDetailsSuccess = (payload) => {
  return {
    type: GET_DEVICE_PLAN_DETAILS_SUCCESS,
    payload,
  };
};

export const setGetDevicePlanDetailsLoader = (payload) => {
  return {
    type: SET_GET_DEVICE_PLAN_DETAILS_LOADER,
    payload,
  };
};

export const getDeviceModelDetails = (payload) => {
  return {
    type: GET_DEVICE_MODEL_DETAILS,
    payload,
  };
};

export const getDeviceModelDetailsSuccess = (payload) => {
  return {
    type: GET_DEVICE_MODEL_DETAILS_SUCCESS,
    payload,
  };
};

export const setGetDeviceModelDetailsLoader = (payload) => {
  return {
    type: SET_GET_DEVICE_MODEL_DETAILS_LOADER,
    payload,
  };
};
