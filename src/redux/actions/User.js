import {
  CREATE_USER,
  CREATE_USER_SUCCESS,
  SET_USER_LOADER,
  LIST_USER,
  LIST_USER_SUCCESS,
  SET_LIST_USER_LOADER,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  ACTION_METHOD_FAILED,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
} from '../constants/ActionTypes';

export const actionMethodFailed = (payload) => {
  return {
    type: ACTION_METHOD_FAILED,
    payload,
  };
};

export const createUser = (payload) => {
  return {
    type: CREATE_USER,
    payload,
  };
};
export const createUserSuccess = (payload) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload,
  };
};
export const setUserLoader = (payload) => {
  return {
    type: SET_USER_LOADER,
    payload,
  };
};
export const listUsers = (payload) => {
  return {
    type: LIST_USER,
    payload,
  };
};
export const listUserSuccess = (payload) => {
  return {
    type: LIST_USER_SUCCESS,
    payload,
  };
};

export const getUserById = (payload) => {
  return {
    type: GET_USER_BY_ID,
    payload,
  };
};

export const getUserByIdSuccess = (payload) => {
  return {
    type: GET_USER_BY_ID_SUCCESS,
    payload,
  };
};

export const setListUserLoader = (payload) => {
  return {
    type: SET_LIST_USER_LOADER,
    payload,
  };
};

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const deleteUserSuccess = (payload) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload,
  };
};

export const deleteUserFailed = (payload) => {
  return {
    type: DELETE_USER_FAILED,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const updateUserSuccess = (payload) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFailed = (payload) => {
  return {
    type: UPDATE_USER_FAILED,
    payload,
  };
};
