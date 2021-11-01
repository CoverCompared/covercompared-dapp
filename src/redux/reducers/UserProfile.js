import { SET_GET_USER_POLICIES_LOADER, GET_USER_POLICIES_SUCCESS } from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,
  policies: [],
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SET_GET_USER_POLICIES_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_USER_POLICIES_SUCCESS: {
      return {
        ...state,
        policies: payload,
      };
    }
    default:
      return state;
  }
};
