import {
  GET_USER_POLICIES,
  GET_USER_POLICIES_SUCCESS,
  SET_GET_USER_POLICIES_LOADER,
} from '../constants/ActionTypes';

export const getUserPolicies = (payload) => {
  return {
    type: GET_USER_POLICIES,
    payload,
  };
};

export const getUserPoliciesSuccess = (payload) => {
  return {
    type: GET_USER_POLICIES_SUCCESS,
    payload,
  };
};

export const setGetUserPoliciesLoader = (payload) => {
  return {
    type: SET_GET_USER_POLICIES_LOADER,
    payload,
  };
};
