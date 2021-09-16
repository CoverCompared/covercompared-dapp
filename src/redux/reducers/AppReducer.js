import { uniqueId } from 'lodash';
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  LOGIN_MODAL_VISIBLE,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_TO_CART,
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
  loginModalVisible: false,
  cart: [],
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
    case ADD_ITEM_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, { ...payload, uuid: uniqueId() }],
      };
    }
    case REMOVE_ITEM_TO_CART: {
      return {
        ...state,
        cart: state.cart.filter((f) => f.uuid !== payload),
      };
    }
    case LOGIN_MODAL_VISIBLE: {
      return {
        ...state,
        loginModalVisible: payload,
      };
    }
    default:
      return state;
  }
};
