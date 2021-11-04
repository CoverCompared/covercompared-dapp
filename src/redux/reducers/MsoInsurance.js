import {
  SET_BUY_MSO_INSURANCE_LOADER,
  BUY_MSO_INSURANCE_SUCCESS,
  SET_SEARCH_MSO_LIST_LOADER,
  SEARCH_MSO_LIST_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  paginationLoader: false,
  isFailed: false,
  quote: null,
  query: null,
  coverList: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
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
      };
    }
    case SEARCH_MSO_LIST_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        query: payload.query,
        coverList: payload.coverList.list,
        page: payload.coverList.current_page,
        totalPages: payload.coverList.total_page,
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
