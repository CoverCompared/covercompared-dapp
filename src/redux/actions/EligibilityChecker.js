import {
  SUBMIT_USER_COUNTRY,
  SUBMIT_USER_COUNTRY_SUCCESS,
  SET_SUBMIT_USER_COUNTRY_LOADER,
} from '../constants/ActionTypes';

export const submitUserCountry = (payload) => {
  return {
    type: SUBMIT_USER_COUNTRY,
    payload,
  };
};

export const submitUserCountrySuccess = (payload) => {
  return {
    type: SUBMIT_USER_COUNTRY_SUCCESS,
    payload,
  };
};

export const setSubmitUserCountryLoader = (payload) => {
  return {
    type: SET_SUBMIT_USER_COUNTRY_LOADER,
    payload,
  };
};
