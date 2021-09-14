import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  SIGNIN_USER_SUCCESS,
  SET_AUTH_LOADER,
  SIGNIN_USER_FAILED,
  SIGNOUT_USER,
  SEND_RESET_PASSWORD_LINK,
  SEND_RESET_PASSWORD_LINK_FAILURE,
  SEND_RESET_PASSWORD_LINK_SUCCESS,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_FAILURE,
  RESET_USER_PASSWORD_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED,
} from '../constants/ActionTypes';

const INIT_STATE = {
  loader: false,
  message: '',
  isFailed: false,
  authUser: null,
  token: null,
};

const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_LOADER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: '',
        isFailed: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_USER_FAILED: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: true,
      };
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        loader: true,
        isFailed: false,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        loader: false,
        isFailed: false,
      };
    }
    case SIGNOUT_USER_FAILED: {
      return {
        ...state,
        loader: false,
        isFailed: true,
        message: action.payload.message,
      };
    }
    case SEND_RESET_PASSWORD_LINK: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_RESET_PASSWORD_LINK_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: false,
      };
    }
    case SEND_RESET_PASSWORD_LINK_FAILURE: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: true,
      };
    }
    case RESET_USER_PASSWORD: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_USER_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        message: action.payload.message,
        isFailed: false,
      };
    }
    case RESET_USER_PASSWORD_FAILURE: {
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

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authUser'],
};

export default persistReducer(persistConfig, AuthReducer);
