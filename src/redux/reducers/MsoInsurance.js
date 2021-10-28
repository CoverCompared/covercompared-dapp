import { SET_BUY_MSO_INSURANCE_LOADER, BUY_MSO_INSURANCE_SUCCESS } from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SET_BUY_MSO_INSURANCE_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case BUY_MSO_INSURANCE_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};
