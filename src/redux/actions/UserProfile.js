import {
  GET_USER_POLICIES,
  GET_USER_POLICIES_SUCCESS,
  SET_GET_USER_POLICIES_LOADER,
  SUBMIT_SUBSCRIBE_EMAIL,
  SUBMIT_SUBSCRIBE_EMAIL_SUCCESS,
  SET_SUBMIT_SUBSCRIBE_EMAIL_LOADER,
  SUBMIT_CONTACT_DETAILS,
  SUBMIT_CONTACT_DETAILS_SUCCESS,
  SET_SUBMIT_CONTACT_DETAILS_LOADER,
  SUBMIT_REVIEW,
  SUBMIT_REVIEW_SUCCESS,
  SET_SUBMIT_REVIEW_LOADER,
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

export const submitSubscribeEmail = (payload) => {
  return {
    type: SUBMIT_SUBSCRIBE_EMAIL,
    payload,
  };
};

export const submitSubscribeEmailSuccess = (payload) => {
  return {
    type: SUBMIT_SUBSCRIBE_EMAIL_SUCCESS,
    payload,
  };
};

export const setSubmitSubscribeEmailLoader = (payload) => {
  return {
    type: SET_SUBMIT_SUBSCRIBE_EMAIL_LOADER,
    payload,
  };
};

export const submitContactDetails = (payload) => {
  return {
    type: SUBMIT_CONTACT_DETAILS,
    payload,
  };
};

export const submitContactDetailsSuccess = (payload) => {
  return {
    type: SUBMIT_CONTACT_DETAILS_SUCCESS,
    payload,
  };
};

export const setSubmitContactDetailsLoader = (payload) => {
  return {
    type: SET_SUBMIT_CONTACT_DETAILS_LOADER,
    payload,
  };
};

export const submitReview = (payload) => {
  return {
    type: SUBMIT_REVIEW,
    payload,
  };
};

export const submitReviewSuccess = (payload) => {
  return {
    type: SUBMIT_REVIEW_SUCCESS,
    payload,
  };
};

export const setSubmitReviewLoader = (payload) => {
  return {
    type: SET_SUBMIT_REVIEW_LOADER,
    payload,
  };
};
