import {
  SET_GET_USER_POLICIES_LOADER,
  GET_USER_POLICIES_SUCCESS,
  SUBMIT_SUBSCRIBE_EMAIL_SUCCESS,
  SET_SUBMIT_SUBSCRIBE_EMAIL_LOADER,
  SUBMIT_CONTACT_DETAILS_SUCCESS,
  SET_SUBMIT_CONTACT_DETAILS_LOADER,
  SUBMIT_REVIEW_SUCCESS,
  SET_SUBMIT_REVIEW_LOADER,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,
  policies: [],
  subscribeData: null,
  contacUsData: null,
  reviewData: null,
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
        message: '',
        loader: false,
        isFailed: false,
      };
    }
    case SET_SUBMIT_SUBSCRIBE_EMAIL_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SUBMIT_SUBSCRIBE_EMAIL_SUCCESS: {
      return {
        ...state,
        subscribeData: payload,
      };
    }

    case SET_SUBMIT_CONTACT_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SUBMIT_CONTACT_DETAILS_SUCCESS: {
      return {
        ...state,
        contacUsData: payload,
      };
    }
    case SET_SUBMIT_REVIEW_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SUBMIT_REVIEW_SUCCESS: {
      return {
        ...state,
        reviewData: payload,
        message: '',
        loader: false,
        isFailed: false,
      };
    }
    default:
      return state;
  }
};
