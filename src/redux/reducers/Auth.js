import {
  SET_AUTH_LOADER,
  GET_LOGIN_DETAILS_SUCCESS,
  SET_PROFILE_DETAILS_SUCCESS,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  VERIFY_OTP_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  email: null,
  token: null,
  isOTPPending: false,
  userDetailsModalOpen: false,
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
    case SET_AUTH_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_PROFILE_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        isOTPPending: true,
      };
    }
    case RESEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        isOTPPending: true,
      };
    }
    case VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        isOTPPending: false,
        userDetailsModalOpen: false,
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
