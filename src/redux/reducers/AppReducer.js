import { uniqueId } from 'lodash';
import { TOGGLE_SIDEBAR, TOGGLE_FILTERS, SET_CURRENT_PRODUCT } from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
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

    default:
      return state;
  }
};
