import {
  CREATE_USER_SUCCESS,
  SET_USER_LOADER,
  SET_LIST_USER_LOADER,
  LIST_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  ACTION_METHOD_FAILED,
} from '../constants/ActionTypes';

const INIT_STATE = {
  loader: false,
  message: '',
  isFailed: false,
  userSuccess: null,
  listUserSuccess: null,
  currentUser: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_METHOD_FAILED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_USER_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: false,
        userSuccess: action.payload,
      };
    }
    case SET_LIST_USER_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LIST_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: '',
        isFailed: false,
        listUserSuccess: action.payload,
      };
    }
    case GET_USER_BY_ID: {
      return {
        ...state,
        loader: true,
        message: '',
        isFailed: false,
      };
    }
    case GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        loader: false,
        isFailed: false,
        currentUser: action.payload.user,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        loader: true,
        message: '',
        isFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        currentUser: action.payload.user,
        isFailed: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: true,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        loader: true,
        message: '',
        isFailed: false,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: false,
      };
    }
    case DELETE_USER_FAILED: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: true,
      };
    }
    default:
      return state;
  }
};
