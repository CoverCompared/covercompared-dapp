import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { GET_LOGIN_DETAILS, SET_PROFILE_DETAILS } from '../constants/ActionTypes';
import {
  setProfileDetailsSuccess,
  setProfileDetailsLoader,
  getLoginDetailsSuccess,
  getLoginDetailsLoader,
} from '../actions/Auth';
import * as selector from '../constants/selectors';
import { axiosPost } from '../constants/apicall';

function* setProfileData({ payload }) {
  try {
    yield put(
      setProfileDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/add-profile-details`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.data) {
      yield put(setProfileDetailsSuccess(res.data.data));
    }
    return yield put(
      setProfileDetailsLoader({
        loader: false,
        isFailed: true,
        query: null,
        msoList: null,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setProfileDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getAccountToken({ payload }) {
  try {
    yield put(
      getLoginDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/login`;
    const loginRes = yield call(axiosPost, url, payload);

    if (loginRes?.data?.data) {
      yield put(getLoginDetailsSuccess(loginRes.data.data));
    }

    return yield put(
      getLoginDetailsLoader({
        loader: false,
        isFailed: true,
        query: null,
        msoList: null,
        message: loginRes.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      getLoginDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(GET_LOGIN_DETAILS, getAccountToken),
  takeLatest(SET_PROFILE_DETAILS, setProfileData),
]);
