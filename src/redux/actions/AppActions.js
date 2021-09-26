/* eslint-disable import/prefer-default-export */
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  LOGIN_MODAL_VISIBLE,
  SET_APP_LOADER,
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_SUCCESS,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_SUCCESS,
  EMPTY_CART,
  EMPTY_CART_SUCCESS,
  SYNC_CART,
  SYNC_CART_SUCCESS,
} from '../constants/ActionTypes';

export const toggleSidebar = (payload) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload,
  };
};

export const toggleFilters = (payload) => {
  return {
    type: TOGGLE_FILTERS,
    payload,
  };
};

export const setCurrentProduct = (payload) => {
  return {
    type: SET_CURRENT_PRODUCT,
    payload,
  };
};

export const setLoginModalVisible = (payload) => {
  return {
    type: LOGIN_MODAL_VISIBLE,
    payload,
  };
};

export const setAppLoader = (payload) => {
  return {
    type: SET_APP_LOADER,
    payload,
  };
};

export const addItemToCart = (payload) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
};

export const addItemToCartSuccess = (payload) => {
  return {
    type: ADD_ITEM_TO_CART_SUCCESS,
    payload,
  };
};

export const updateCartItem = (payload) => {
  return {
    type: UPDATE_CART_ITEM,
    payload,
  };
};

export const updateCartItemSuccess = (payload) => {
  return {
    type: UPDATE_CART_ITEM_SUCCESS,
    payload,
  };
};

export const removeCartItem = (payload) => {
  return {
    type: REMOVE_CART_ITEM,
    payload,
  };
};

export const removeCartItemSuccess = (payload) => {
  return {
    type: REMOVE_CART_ITEM_SUCCESS,
    payload,
  };
};

export const emptyCart = (payload) => {
  return {
    type: EMPTY_CART,
    payload,
  };
};

export const emptyCartSuccess = (payload) => {
  return {
    type: EMPTY_CART_SUCCESS,
    payload,
  };
};

export const syncCart = (payload) => {
  return {
    type: SYNC_CART,
    payload,
  };
};

export const syncCartSuccess = (payload) => {
  return {
    type: SYNC_CART_SUCCESS,
    payload,
  };
};
