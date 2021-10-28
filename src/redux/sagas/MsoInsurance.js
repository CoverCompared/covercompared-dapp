/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { BUY_MSO_INSURANCE } from '../constants/ActionTypes';
import { setBuyMsoInsuranceLoader, buyMsoInsuranceSuccess } from '../actions/MsoInsurance';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* searchSingleBlog({ payload }) {
  try {
    yield put(
      setBuyMsoInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-mso`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.data) {
      yield put(buyMsoInsuranceSuccess(res?.data?.data));
    }

    return yield put(
      setBuyMsoInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setBuyMsoInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([takeLatest(BUY_MSO_INSURANCE, searchSingleBlog)]);
