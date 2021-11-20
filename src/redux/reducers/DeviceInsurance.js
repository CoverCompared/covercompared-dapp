import {
  RESET_DEVICE_INSURANCE,
  SET_BUY_DEVICE_INSURANCE_LOADER,
  BUY_DEVICE_INSURANCE_SUCCESS,
  GET_DEVICE_DETAILS_SUCCESS,
  SET_GET_DEVICE_DETAILS_LOADER,
  GET_DEVICE_PLAN_DETAILS_SUCCESS,
  SET_GET_DEVICE_PLAN_DETAILS_LOADER,
  GET_DEVICE_MODEL_DETAILS_SUCCESS,
  SET_GET_DEVICE_MODEL_DETAILS_LOADER,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,
  deviceDetails: null,
  devicePlanDetails: null,
  deviceModelDetails: null,
  txn_hash: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case RESET_DEVICE_INSURANCE: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        deviceDetails: null,
        devicePlanDetails: null,
        deviceModelDetails: null,
        txn_hash: null,
      };
    }
    case SET_BUY_DEVICE_INSURANCE_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case BUY_DEVICE_INSURANCE_SUCCESS: {
      return {
        ...state,
        ...payload,
        message: '',
        loader: false,
        isFailed: false,
      };
    }
    case SET_GET_DEVICE_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_DEVICE_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        deviceDetails: payload,
      };
    }
    case SET_GET_DEVICE_PLAN_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_DEVICE_PLAN_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        devicePlanDetails: payload,
      };
    }
    case SET_GET_DEVICE_MODEL_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_DEVICE_MODEL_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        deviceModelDetails: payload,
      };
    }
    default:
      return state;
  }
};
