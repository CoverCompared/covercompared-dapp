/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { SUBMIT_USER_COUNTRY } from '../constants/ActionTypes';
import {
  setSubmitUserCountryLoader,
  submitUserCountrySuccess,
} from '../actions/EligibilityChecker';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* searchSingleBlog({ payload }) {
  try {
    yield put(
      setSubmitUserCountryLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/policy-request`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.data) {
      yield put(submitUserCountrySuccess(res?.data?.data));
    }

    return yield put(
      setSubmitUserCountryLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSubmitUserCountryLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([takeLatest(SUBMIT_USER_COUNTRY, searchSingleBlog)]);
