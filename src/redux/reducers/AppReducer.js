import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_TO_CART,
} from '../constants/ActionTypes';

const INIT_STATE = {
  sidebarOpen: false,
  filtersOpen: false,
  currentProduct: null,
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
      let cart;
      if (state.cart.find((f) => f?.address === payload?.address)) {
        cart = state.cart.map((m) =>
          m.address === payload?.address ? { ...m, qty: m.qty + 1 } : m,
        );
      } else {
        cart = [...state.cart, { ...payload, qty: 1 }];
      }
      return {
        ...state,
        cart,
      };
    }
    case REMOVE_ITEM_TO_CART: {
      return {
        ...state,
        cart: state.cart.filter((f) => f.address !== payload),
      };
    }
    default:
      return state;
  }
};
