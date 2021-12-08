import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  GET_LOGIN_DETAILS,
  SET_PROFILE_DETAILS,
  VERIFY_OTP,
  RESEND_VERIFICATION_EMAIL,
  GET_USER_PROFILE,
} from '../constants/ActionTypes';
import {
  setAuthLoader,
  setProfileDetailsSuccess,
  getLoginDetailsSuccess,
  verifyOTPSuccess,
  resendVerificationEmailSuccess,
  getUserProfile,
  getUserProfileSuccess,
} from '../actions/Auth';
import * as selector from '../constants/selectors';
import { axiosGet, axiosPost } from '../constants/apicall';

function* loginUser({ payload }) {
  try {
    yield put(
      setAuthLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/login`;
    const loginRes = yield call(axiosPost, url, payload);

    if (loginRes?.data?.data) {
      return yield put(
        getLoginDetailsSuccess({ ...loginRes.data.data, wallet_address: payload.wallet_address }),
      );
    }

    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: loginRes.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* setProfileData({ payload }) {
  try {
    yield put(
      setAuthLoader({
        message: '',
        loader: true,
        authLoader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/add-profile-details`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.success) {
      return yield put(setProfileDetailsSuccess(res.data.data));
    }

    return yield put(
      setAuthLoader({
        loader: false,
        authLoader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAuthLoader({
        loader: false,
        authLoader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* verifyOTP({ payload }) {
  try {
    yield put(
      setAuthLoader({
        message: '',
        loader: true,
        authLoader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/verify-otp`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.success) {
      yield put(verifyOTPSuccess());
      return yield put(getUserProfile());
    }

    return yield put(
      setAuthLoader({
        loader: false,
        authLoader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAuthLoader({
        loader: false,
        authLoader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* resendVerificationEmail({ payload }) {
  try {
    yield put(
      setAuthLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/resend-verification-email`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.data) {
      return yield put(resendVerificationEmailSuccess());
    }

    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getUserProfileSaga() {
  try {
    yield put(
      setAuthLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/profile`;
    const profile = yield call(axiosGet, url, yield select(selector.token));

    if (profile?.data?.data) {
      return yield put(getUserProfileSuccess(profile?.data?.data));
    }

    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: profile.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAuthLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(GET_LOGIN_DETAILS, loginUser),
  takeLatest(SET_PROFILE_DETAILS, setProfileData),
  takeLatest(VERIFY_OTP, verifyOTP),
  takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmail),
  takeLatest(GET_USER_PROFILE, getUserProfileSaga),
]);
