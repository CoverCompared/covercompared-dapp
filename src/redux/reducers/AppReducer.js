import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  MODAL_VISIBLE,
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
  modalVisible: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    }
    case TOGGLE_FILTERS: {
      return {
        ...state,
        filtersOpen: action.payload,
      };
    }
    case SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case MODAL_VISIBLE: {
      return {
        ...state,
        modalVisible: action.payload,
      };
    }
    default:
      return state;
  }
};
