/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { BUY_MSO_INSURANCE, SEARCH_MSO_LIST } from '../constants/ActionTypes';
import {
  setBuyMsoInsuranceLoader,
  buyMsoInsuranceSuccess,
  searchMSOListSuccess,
  setSearchMSOListLoader,
} from '../actions/MsoInsurance';
import { logoutUser } from '../actions/Auth';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* buyMsoInsurance({ payload }) {
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

    console.log('res :>> ', res);

    if (res?.data?.success) {
      return yield put(buyMsoInsuranceSuccess(res?.data?.data));
    }

    if (!res?.data?.success && res?.data?.message === 'Unauthorized.') {
      return yield put(logoutUser());
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
    console.log('error :>> ', error);
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

function* searchMSOList({ payload }) {
  try {
    yield put(
      setSearchMSOListLoader({
        message: '',
        listLoader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/mso-list`;
    const msoList = yield call(axiosGet, url);

    if (msoList?.data?.data) {
      return yield put(searchMSOListSuccess(msoList.data.data));
    }

    return yield put(
      setSearchMSOListLoader({
        listLoader: false,
        isFailed: true,
        message: msoList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSearchMSOListLoader({
        listLoader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(BUY_MSO_INSURANCE, buyMsoInsurance),
  takeLatest(SEARCH_MSO_LIST, searchMSOList),
]);
