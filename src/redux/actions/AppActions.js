/* eslint-disable import/prefer-default-export */
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

<<<<<<< HEAD
export const setModalVisible = (payload) => {
  return {
    type: MODAL_VISIBLE,
=======
export const addItemToCart = (payload) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload,
  };
};

export const removeItemToCart = (payload) => {
  return {
    type: REMOVE_ITEM_TO_CART,
>>>>>>> 3692c639f5c9d3d996433c50ff5b8b9839f30397
    payload,
  };
};
