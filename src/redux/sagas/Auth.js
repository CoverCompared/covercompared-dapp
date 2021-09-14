import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { fallbackMessage } from '../constants/constants';
import { API_BASE_URL } from '../constants/config';
import {
  SIGNIN_USER,
  SEND_RESET_PASSWORD_LINK,
  RESET_USER_PASSWORD,
  SIGNOUT_USER,
} from '../constants/ActionTypes';
import {
  signinUserSuccess,
  signinUserFailed,
  setAuthLoader,
  sendResetPasswordLinkFailure,
  sendResetPasswordLinkSuccess,
  resetUserPasswordSuccess,
  resetUserPasswordFailure,
  signoutUserSuccess,
  signoutUserFailed,
} from '../actions/Auth';
import * as selector from '../constants/selectors';
import { axiosPost } from '../constants/apicall'; // pass url to get,and (url,object) to post ,patch

function* signInUserWithEmailPassword({ payload }) {
  try {
    yield put(setAuthLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}login`;
    const resp = yield call(axiosPost, url, payload);
    if (resp.status === 200) {
      const signInUser = resp.data;
      yield put(signinUserSuccess(signInUser));
    } else {
      yield put(
        signinUserFailed({
          isFailed: true,
          message: resp.data.message,
          loader: false,
        }),
      );
    }
  } catch (error) {
    yield put(
      signinUserFailed({
        isFailed: true,
        message: error.message || fallbackMessage,
        loader: false,
      }),
    );
  }
}

function* resetPasswordLink({ payload }) {
  try {
    yield put(setAuthLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}profile/password/forgot`;
    const resp = yield call(axiosPost, url, payload);

    if (resp.status !== 200) {
      yield put(
        sendResetPasswordLinkFailure({
          message: resp.data.message || fallbackMessage,
        }),
      );
    } else {
      yield put(sendResetPasswordLinkSuccess({ message: resp.data.message }));
    }
  } catch (error) {
    yield put(
      sendResetPasswordLinkFailure({
        isFailed: true,
        message: error.message || fallbackMessage,
        loader: false,
      }),
    );
  }
}

function* resetUserPassword({ payload }) {
  try {
    yield put(setAuthLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}profile/password/confirm/${payload.code}`;
    const resp = yield call(axiosPost, url, payload);

    if (resp.status !== 200) {
      yield put(
        resetUserPasswordFailure({
          message: resp.data.message || fallbackMessage,
        }),
      );
    } else {
      yield put(
        resetUserPasswordSuccess({
          message: `Password has been reset succcessfully.`,
        }),
      );
    }
  } catch (error) {
    yield put(
      resetUserPasswordFailure({
        message: error.message || fallbackMessage,
      }),
    );
  }
}

function* signoutUser() {
  try {
    yield put(setAuthLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}logout`;
    const resp = yield call(axiosPost, url, {}, yield select(selector.token));

    if (resp.status !== 200) {
      yield put(
        signoutUserFailed({
          message: resp.data.message || fallbackMessage,
        }),
      );
    } else {
      yield put(
        signoutUserSuccess({
          message: `Password has been reset succcessfully.`,
        }),
      );
    }
  } catch (error) {
    yield put(signoutUserFailed({ message: error.message || fallbackMessage }));
  }
}

export default all([
  takeLatest(SIGNIN_USER, signInUserWithEmailPassword),
  takeLatest(SEND_RESET_PASSWORD_LINK, resetPasswordLink),
  takeLatest(RESET_USER_PASSWORD, resetUserPassword),
  takeLatest(SIGNOUT_USER, signoutUser),
]);
