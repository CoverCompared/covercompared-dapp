import { uniqueId } from 'lodash';
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  LOGIN_MODAL_VISIBLE,
  MAIL_MODAL_VISIBLE,
  ADD_ITEM_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_ITEM_TO_CART,
  EMPTY_CART,
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
  loginModalVisible: false,
  mailModalVisible: false,
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
    case UPDATE_CART_ITEM: {
      return {
        ...state,
        cart: state.cart.map((m) => (m.uuid === payload.uuid ? { ...m, ...payload } : m)),
      };
    }
    case REMOVE_ITEM_TO_CART: {
      return {
        ...state,
        cart: state.cart.filter((f) => f.uuid !== payload),
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    case LOGIN_MODAL_VISIBLE: {
      return {
        ...state,
        loginModalVisible: payload,
      };
    }
    case MAIL_MODAL_VISIBLE: {
      return {
        ...state,
        mailModalVisible: payload,
      };
    }
    default:
      return state;
  }
};
