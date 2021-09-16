<<<<<<< HEAD
=======
import { uniqueId } from 'lodash';
>>>>>>> 3692c639f5c9d3d996433c50ff5b8b9839f30397
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
<<<<<<< HEAD
  MODAL_VISIBLE,
=======
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_TO_CART,
>>>>>>> 3692c639f5c9d3d996433c50ff5b8b9839f30397
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
<<<<<<< HEAD
  modalVisible: false,
=======
  cart: [],
>>>>>>> 3692c639f5c9d3d996433c50ff5b8b9839f30397
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
