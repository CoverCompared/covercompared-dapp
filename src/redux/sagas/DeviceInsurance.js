/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { BUY_DEVICE_INSURANCE } from '../constants/ActionTypes';
import { setBuyDeviceInsuranceLoader, buyDeviceInsuranceSuccess } from '../actions/DeviceInsurance';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* searchSingleBlog({ payload }) {
  try {
    yield put(
      setBuyDeviceInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-device-insurance`;
    const res = yield call(axiosPost, url, payload, yield select(selector.token));

    if (res?.data?.data) {
      yield put(buyDeviceInsuranceSuccess(res?.data?.data));
    }

    return yield put(
      setBuyDeviceInsuranceLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setBuyDeviceInsuranceLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([takeLatest(BUY_DEVICE_INSURANCE, searchSingleBlog)]);
