import {
  SET_AUTH_LOADER,
  GET_LOGIN_DETAILS_SUCCESS,
  SET_PROFILE_DETAILS_SUCCESS,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  VERIFY_OTP_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_MODAL_VISIBLE,
  REGISTER_MODAL_VISIBLE,
  LOGOUT_USER,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: null,
  loader: false,
  isFailed: false,

  email: null,
  token: null,
  is_verified: null,
  wallet_addresses: [],

  showVerified: false,
  showOTPScreen: false,
  loginModalVisible: false,
  registerModalVisible: false,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_LOGIN_DETAILS_SUCCESS: {
      return {
        ...state,
        message: null,
        loader: false,
        isFailed: false,
        ...payload,
        wallet_addresses: payload.wallet_address
          ? [payload.wallet_address, ...state.wallet_addresses]
          : [...state.wallet_addresses],
        wallet_address: null,
      };
    }
    case SET_AUTH_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SET_PROFILE_DETAILS_SUCCESS: {
      return {
        ...state,
        message: null,
        loader: false,
        isFailed: false,
        showOTPScreen: true,
      };
    }
    case RESEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        message: null,
        loader: false,
        isFailed: false,
        showOTPScreen: true,
      };
    }
    case VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        message: null,
        loader: false,
        isFailed: false,
        showVerified: true,
        showOTPScreen: false,
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        message: null,
        loader: false,
        isFailed: false,
        ...payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,

        email: null,
        token: null,
        is_verified: null,
        wallet_addresses: [],

        showVerified: false,
        showOTPScreen: false,
        loginModalVisible: false,
        registerModalVisible: false,
      };
    }
    case LOGIN_MODAL_VISIBLE: {
      return {
        ...state,
        loginModalVisible: payload,
      };
    }
    case REGISTER_MODAL_VISIBLE: {
      return {
        ...state,
        message: null,
        isFailed: false,
        showVerified: false,
        showOTPScreen: false,
        registerModalVisible: payload,
      };
    }
    default:
      return state;
  }
};
