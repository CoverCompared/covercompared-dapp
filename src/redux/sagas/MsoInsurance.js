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

    console.log('object :>>');

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

function* searchMSOList({ payload }) {
  try {
    yield put(
      setSearchMSOListLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/mso-list${payload || ''}`;
    const coverList = yield call(axiosGet, url);

    if (coverList?.data?.data) {
      yield put(
        searchMSOListSuccess({
          query: payload,
          coverList: coverList.data.data,
        }),
      );
    }

    return yield put(
      setSearchMSOListLoader({
        loader: false,
        isFailed: true,
        query: null,
        msoList: null,
        message: coverList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSearchMSOListLoader({
        loader: false,
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
