/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  BUY_MSO_INSURANCE,
  CONFIRM_BUY_MSO_INSURANCE,
  SEARCH_MSO_LIST,
} from '../constants/ActionTypes';
import {
  setBuyMsoInsuranceLoader,
  buyMsoInsuranceSuccess,
  setConfirmBuyMsoInsuranceLoader,
  confirmBuyMsoInsuranceSuccess,
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

    const url = `${API_BASE_URL}/user/policies-mso`;
    // const res = yield call(axiosPost, url, payload, yield select(selector.token));
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );

    if (res?.data?.success && res?.data?.data?._id) {
      const confirmUrl = `${API_BASE_URL}/user/policies-mso/${res.data.data._id}/confirm-payment`;
      const dummyPayload = {
        payment_status: 'paid',
        blockchain: 'ethereum',
        block_timestamp: '1634829441',
        txn_type: 'onchain',
        payment_hash: 'ASFAS654321ASDF',
        currency: 'USD',
        wallet_address: payload.wallet_address,
        paid_amount: payload.total_amount,
      };
      // const confirmRes = yield call(
      //   axiosPost,
      //   confirmUrl,
      //   dummyPayload,
      //   yield select(selector.token),
      // );
      const confirmRes = yield call(
        axiosPost,
        confirmUrl,
        dummyPayload,
        yield select(selector.token),
        yield select(selector.wallet_address),
      );

      if (confirmRes?.data?.success)
        return yield put(confirmBuyMsoInsuranceSuccess(confirmRes.data.data));
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

function* confirmBuyMsoInsurance({ payload }) {
  try {
    yield put(
      setConfirmBuyMsoInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-mso/${payload._id}/confirm-payment`;
    // const res = yield call(axiosPost, url, payload, yield select(selector.token));
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );

    if (res?.data?.success) {
      return yield put(confirmBuyMsoInsuranceSuccess(res?.data?.data));
    }

    return yield put(
      setConfirmBuyMsoInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setConfirmBuyMsoInsuranceLoader({
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
  takeLatest(CONFIRM_BUY_MSO_INSURANCE, confirmBuyMsoInsurance),
  takeLatest(SEARCH_MSO_LIST, searchMSOList),
]);
