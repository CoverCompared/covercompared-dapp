import {
  SET_GET_LOGIN_DETAILS_LOADER,
  GET_LOGIN_DETAILS_SUCCESS,
  SET_PROFILE_DETAILS_LOADER,
  SET_PROFILE_DETAILS_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  userDetailsModalOpen: false,
  email: null,
  token: null,
  is_verified: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOGIN_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        ...action.payload,
        userDetailsModalOpen: action.payload.email === null,
      };
    }
    case SET_GET_LOGIN_DETAILS_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_PROFILE_DETAILS_SUCCESS: {
      console.log('redux called');
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        ...action.payload,
        userDetailsModalOpen: false,
      };
    }
    case SET_PROFILE_DETAILS_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
