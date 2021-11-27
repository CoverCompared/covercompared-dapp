/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  BUY_DEVICE_INSURANCE,
  CONFIRM_BUY_DEVICE_INSURANCE,
  GET_DEVICE_DETAILS,
  GET_DEVICE_PLAN_DETAILS,
  GET_DEVICE_MODEL_DETAILS,
} from '../constants/ActionTypes';
import {
  setBuyDeviceInsuranceLoader,
  buyDeviceInsuranceSuccess,
  setConfirmBuyDeviceInsuranceLoader,
  confirmBuyDeviceInsuranceSuccess,
  getDeviceDetailsSuccess,
  setGetDeviceDetailsLoader,
  getDevicePlanDetailsSuccess,
  setGetDevicePlanDetailsLoader,
  getDeviceModelDetailsSuccess,
  setGetDeviceModelDetailsLoader,
} from '../actions/DeviceInsurance';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* buyDeviceInsurance({ payload }) {
  try {
    yield put(
      setBuyDeviceInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-device-insurance`;
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );

    if (res?.data?.success && res?.data?.data?._id) {
      const confirmUrl = `${API_BASE_URL}/user/policies-device-insurance/${res.data.data._id}/confirm-payment`;
      const timestamp = new Date().getTime();
      const dummyPayload = {
        payment_status: 'paid',
        blockchain: 'ethereum',
        block_timestamp: timestamp.toString(),
        txn_type: 'onchain',
        payment_hash: payload.txn_hash,
        currency: 'USD',
        wallet_address: payload.wallet_address,
        paid_amount: payload.total_amount,
      };
      
      const confirmRes = yield call(
        axiosPost,
        confirmUrl,
        dummyPayload,
        yield select(selector.token),
        yield select(selector.wallet_address),
      );

      if (confirmRes?.data?.success)
        return yield put(confirmBuyDeviceInsuranceSuccess(confirmRes.data.data));
    }

    return yield put(
      setBuyDeviceInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setBuyDeviceInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* confirmBuyDeviceInsurance({ payload }) {
  try {
    yield put(
      setConfirmBuyDeviceInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-device-insurance/${payload._id}/confirm-payment`;
    // const res = yield call(axiosPost, url, payload, yield select(selector.token));
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );

    if (res?.data?.success) {
      return yield put(confirmBuyDeviceInsuranceSuccess(res.data.data));
    }

    return yield put(
      setConfirmBuyDeviceInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setConfirmBuyDeviceInsuranceLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getDeviceDetail({ payload }) {
  try {
    yield put(
      setGetDeviceDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/p4l-forward`;
    const deviceDetail = yield call(axiosPost, url, payload);

    if (deviceDetail?.data?.data) {
      yield put(getDeviceDetailsSuccess(deviceDetail.data.data));
    } else if (deviceDetail === undefined) {
      yield put(
        setGetDeviceDetailsLoader({
          isFailed: false,
          loader: true,
        }),
      );
    } else {
      yield put(
        setGetDeviceDetailsLoader({
          loader: false,
          isFailed: true,
          deviceDetails: null,
          message: deviceDetail.errors,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetDeviceDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getDevicePlanDetail({ payload }) {
  try {
    yield put(
      setGetDevicePlanDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/p4l-forward`;
    const devicePlanDetail = yield call(axiosPost, url, payload);

    if (devicePlanDetail?.data?.data) {
      yield put(getDevicePlanDetailsSuccess(devicePlanDetail.data.data));
    } else {
      yield put(
        setGetDevicePlanDetailsLoader({
          loader: false,
          isFailed: true,
          devicePlanDetails: null,
          message: devicePlanDetail.errors,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetDevicePlanDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getDeviceModelDetail({ payload }) {
  try {
    yield put(
      setGetDeviceModelDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/p4l-forward`;
    const res = yield call(axiosPost, url, payload);

    if (!res?.data?.error_message) {
      yield put(getDeviceModelDetailsSuccess(res.data.data));
    } else {
      yield put(
        setGetDeviceModelDetailsLoader({
          loader: false,
          isFailed: true,
          deviceModelDetails: null,
          message: res.data.error_message,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetDeviceModelDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(BUY_DEVICE_INSURANCE, buyDeviceInsurance),
  takeLatest(CONFIRM_BUY_DEVICE_INSURANCE, confirmBuyDeviceInsurance),
  takeLatest(GET_DEVICE_DETAILS, getDeviceDetail),
  takeLatest(GET_DEVICE_PLAN_DETAILS, getDevicePlanDetail),
  takeLatest(GET_DEVICE_MODEL_DETAILS, getDeviceModelDetail),
]);
