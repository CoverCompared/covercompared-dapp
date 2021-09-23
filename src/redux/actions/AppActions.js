/* eslint-disable import/prefer-default-export */
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

export const setMailModalVisible = (payload) => {
  return {
    type: MAIL_MODAL_VISIBLE,
    payload,
  };
};

export const addItemToCart = (payload) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
};

export const updateCartItem = (payload) => {
  return {
    type: UPDATE_CART_ITEM,
    payload,
  };
};

export const removeItemToCart = (payload) => {
  return {
    type: REMOVE_ITEM_TO_CART,
    payload,
  };
};

export const emptyCart = (payload) => {
  return {
    type: EMPTY_CART,
    payload,
  };
};
