import { uniqueId } from 'lodash';
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  LOGIN_MODAL_VISIBLE,
  SET_APP_LOADER,
  ADD_ITEM_TO_CART_SUCCESS,
  UPDATE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_SUCCESS,
  EMPTY_CART_SUCCESS,
  SYNC_CART_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  isFailed: false,

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
    case SET_APP_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case ADD_ITEM_TO_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
      };
    }
    case UPDATE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        cart: payload,
      };
    }
    case REMOVE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        cart: payload,
      };
    }
    case EMPTY_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
      };
    }
    case SYNC_CART_SUCCESS: {
      return {
        ...state,
        cart: payload,
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
