import {
  RESET_DEVICE_INSURANCE,
  SET_BUY_DEVICE_INSURANCE_LOADER,
  BUY_DEVICE_INSURANCE_FIRST_SUCCESS,
  CREATE_DEVICE_INSURANCE_POLICY_SUCCESS,
  SET_CREATE_DEVICE_INSURANCE_POLICY_LOADER,
  BUY_DEVICE_INSURANCE_SUCCESS,
  SET_CONFIRM_BUY_DEVICE_INSURANCE_LOADER,
  CONFIRM_BUY_DEVICE_INSURANCE_SUCCESS,
  GET_DEVICE_DETAILS_SUCCESS,
  SET_GET_DEVICE_DETAILS_LOADER,
  GET_DEVICE_PLAN_DETAILS_SUCCESS,
  SET_GET_DEVICE_PLAN_DETAILS_LOADER,
  GET_DEVICE_MODEL_DETAILS_SUCCESS,
  SET_GET_DEVICE_MODEL_DETAILS_LOADER,
} from '../constants/ActionTypes';

const INIT_STATE = {
  policyId: null,
  signature: null,
  message: '',
  loader: false,
  isFailed: false,
  deviceDetails: null,
  devicePlanDetails: null,
  deviceModelDetails: null,
  devicePolicy: null,
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
    case SET_CONFIRM_BUY_DEVICE_INSURANCE_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case CONFIRM_BUY_DEVICE_INSURANCE_SUCCESS: {
      return {
        ...state,
        ...payload,
        message: '',
        loader: false,
        isFailed: false,
        policyId: null,
        signature: null,
      };
    }
    case BUY_DEVICE_INSURANCE_FIRST_SUCCESS: {
      return {
        ...state,
        ...payload,
        message: '',
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
    case SET_CREATE_DEVICE_INSURANCE_POLICY_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case CREATE_DEVICE_INSURANCE_POLICY_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        devicePolicy: payload,
      };
    }
    default:
      return state;
  }
};
