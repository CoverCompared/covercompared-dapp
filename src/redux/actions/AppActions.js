/* eslint-disable import/prefer-default-export */
import {
  TOGGLE_SIDEBAR,
  TOGGLE_FILTERS,
  SET_CURRENT_PRODUCT,
  SET_PENDING_TRANSACTION,
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

export const setPendingTransaction = (payload) => {
  return {
    type: SET_PENDING_TRANSACTION,
    payload,
  };
};
