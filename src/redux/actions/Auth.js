import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,
  SET_AUTH_LOADER,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SEND_RESET_PASSWORD_LINK,
  SEND_RESET_PASSWORD_LINK_SUCCESS,
  SEND_RESET_PASSWORD_LINK_FAILURE,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_FAILURE,
  RESET_USER_PASSWORD_SUCCESS,
  SIGNOUT_USER_FAILED,
} from '../constants/ActionTypes';

export const signinUser = (payload) => {
  return {
    type: SIGNIN_USER,
    payload,
  };
};
export const signinUserSuccess = (payload) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload,
  };
};
export const signinUserFailed = (payload) => {
  return {
    type: SIGNIN_USER_FAILED,
    payload,
  };
};
export const setAuthLoader = (payload) => {
  return {
    type: SET_AUTH_LOADER,
    payload,
  };
};
export const signoutUser = () => {
  return {
    type: SIGNOUT_USER,
  };
};

export const signoutUserSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};

export const signoutUserFailed = () => {
  return {
    type: SIGNOUT_USER_FAILED,
  };
};

export const sendResetPasswordLink = (payload) => {
  return {
    type: SEND_RESET_PASSWORD_LINK,
    payload,
  };
};

export const sendResetPasswordLinkSuccess = (payload) => {
  return {
    type: SEND_RESET_PASSWORD_LINK_SUCCESS,
    payload,
  };
};

export const sendResetPasswordLinkFailure = (payload) => {
  return {
    type: SEND_RESET_PASSWORD_LINK_FAILURE,
    payload,
  };
};

export const resetUserPassword = (payload) => {
  return {
    type: RESET_USER_PASSWORD,
    payload,
  };
};

export const resetUserPasswordSuccess = (payload) => {
  return {
    type: RESET_USER_PASSWORD_SUCCESS,
    payload,
  };
};

export const resetUserPasswordFailure = (payload) => {
  return {
    type: RESET_USER_PASSWORD_FAILURE,
    payload,
  };
};
