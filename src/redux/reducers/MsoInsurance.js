import {
  RESET_MSO_INSURANCE,
  SET_BUY_MSO_INSURANCE_LOADER,
  BUY_MSO_INSURANCE_SUCCESS,
  SET_SEARCH_MSO_LIST_LOADER,
  SEARCH_MSO_LIST_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  listLoader: false,
  isFailed: false,
  quote: null,
  msoList: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case RESET_MSO_INSURANCE: {
      return {
        message: '',
        loader: false,
        listLoader: false,
        isFailed: false,
        quote: null,
        msoList: null,
      };
    }
    case SET_BUY_MSO_INSURANCE_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case BUY_MSO_INSURANCE_SUCCESS: {
      return {
        ...state,
        ...payload,
        loader: false,
        isFailed: false,
      };
    }
    case SEARCH_MSO_LIST_SUCCESS: {
      return {
        ...state,
        message: '',
        listLoader: false,
        isFailed: false,
        msoList: payload.list,
        page: payload.current_page,
        totalPages: payload.total_page,
      };
    }
    case SET_SEARCH_MSO_LIST_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
};
