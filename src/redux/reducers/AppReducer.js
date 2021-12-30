import { uniqueId } from 'lodash';
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  SET_PENDING_TRANSACTION,
  SET_PENDING_TRANSACTION_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
  pendingTx: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: payload,
      };
    }
    case TOGGLE_FILTERS: {
      return {
        ...state,
        filtersOpen: payload,
      };
    }
    case SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: payload,
      };
    }
    case SET_PENDING_TRANSACTION_SUCCESS: {
      return {
        ...state,
        pendingTx: payload,
      };
    }
    default:
      return state;
  }
};
