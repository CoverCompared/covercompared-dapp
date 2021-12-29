import {
  SET_AUTH_LOADER,
  GET_LOGIN_DETAILS,
  GET_LOGIN_DETAILS_SUCCESS,
  SET_PROFILE_DETAILS,
  SET_PROFILE_DETAILS_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_USER,
  LOGIN_MODAL_VISIBLE,
  REGISTER_MODAL_VISIBLE,
} from '../constants/ActionTypes';

export const setAuthLoader = (payload) => {
  return {
    type: SET_AUTH_LOADER,
    payload,
  };
};

export const getLoginDetails = (payload) => {
  return {
    type: GET_LOGIN_DETAILS,
    payload,
  };
};

export const getLoginDetailsSuccess = (payload) => {
  return {
    type: GET_LOGIN_DETAILS_SUCCESS,
    payload,
  };
};

export const setProfileDetails = (payload) => {
  return {
    type: SET_PROFILE_DETAILS,
    payload,
  };
};

export const setProfileDetailsSuccess = (payload) => {
  return {
    type: SET_PROFILE_DETAILS_SUCCESS,
    payload,
  };
};

export const verifyOTP = (payload) => {
  return {
    type: VERIFY_OTP,
    payload,
  };
};

export const verifyOTPSuccess = (payload) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload,
  };
};

export const resendVerificationEmail = (payload) => {
  return {
    type: RESEND_VERIFICATION_EMAIL,
    payload,
  };
};

export const resendVerificationEmailSuccess = (payload) => {
  return {
    type: RESEND_VERIFICATION_EMAIL_SUCCESS,
    payload,
  };
};

export const getUserProfile = (payload) => {
  return {
    type: GET_USER_PROFILE,
    payload,
  };
};

export const getUserProfileSuccess = (payload) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload,
  };
};

export const logoutUser = (payload) => {
  return {
    type: LOGOUT_USER,
    payload,
  };
};

export const setLoginModalVisible = (payload) => {
  return {
    type: LOGIN_MODAL_VISIBLE,
    payload,
  };
};

export const setRegisterModalVisible = (payload) => {
  return {
    type: REGISTER_MODAL_VISIBLE,
    payload,
  };
};
