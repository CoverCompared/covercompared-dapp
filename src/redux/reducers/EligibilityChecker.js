import {
  SET_SUBMIT_USER_COUNTRY_LOADER,
  SUBMIT_USER_COUNTRY_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SET_SUBMIT_USER_COUNTRY_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SUBMIT_USER_COUNTRY_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};
