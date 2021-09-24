import {
  GET_LOGIN_DETAILS,
  GET_LOGIN_DETAILS_SUCCESS,
  SET_GET_LOGIN_DETAILS_LOADER,
  SET_PROFILE_DETAILS,
  SET_PROFILE_DETAILS_SUCCESS,
  SET_PROFILE_DETAILS_LOADER,
} from '../constants/ActionTypes';

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

export const getLoginDetailsLoader = (payload) => {
  return {
    type: SET_GET_LOGIN_DETAILS_LOADER,
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

export const setProfileDetailsLoader = (payload) => {
  return {
    type: SET_PROFILE_DETAILS_LOADER,
    payload,
  };
};
