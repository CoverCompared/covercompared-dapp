/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  BUY_DEVICE_INSURANCE_FIRST,
  BUY_DEVICE_INSURANCE,
  CONFIRM_BUY_DEVICE_INSURANCE,
  GET_DEVICE_DETAILS,
  GET_DEVICE_PLAN_DETAILS,
  GET_DEVICE_MODEL_DETAILS,
  CREATE_DEVICE_INSURANCE_POLICY,
} from '../constants/ActionTypes';
import {
  setBuyDeviceInsuranceLoader,
  buyDeviceInsuranceSuccess,
  buyDeviceInsuranceFirstSuccess,
  setConfirmBuyDeviceInsuranceLoader,
  confirmBuyDeviceInsuranceSuccess,
  getDeviceDetailsSuccess,
  setGetDeviceDetailsLoader,
  getDevicePlanDetailsSuccess,
  setGetDevicePlanDetailsLoader,
  getDeviceModelDetailsSuccess,
  setGetDeviceModelDetailsLoader,
  createDeviceInsurancePolicySuccess,
  setCreateDeviceInsurancePolicyLoader,
} from '../actions/DeviceInsurance';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* buyDeviceInsuranceFirst({ payload }) {
  try {
    const url = `${API_BASE_URL}/user/policies-device-insurance`;
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      null,
      yield select(selector.wallet_address),
    );

    if (res?.data?.success && res?.data?.data?._id) {
      return yield put(
        buyDeviceInsuranceFirstSuccess({
          policyId: res.data.data._id,
          signature: res.data.data.signature,
          txn_hash: res.data.data.txn_hash,
        }),
      );
    }
    return yield put(
      buyDeviceInsuranceFirstSuccess({
        policyId: null,
        signature: null,
        txn_hash: null,
        isFailed: true,
        message: 'Failed to get signature!',
      }),
    );
  } catch (error) {
    return yield put(
      buyDeviceInsuranceFirstSuccess({
        policyId: null,
        signature: null,
        txn_hash: null,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* buyDeviceInsurance({ payload }) {
  try {
    yield put(
      setBuyDeviceInsuranceLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    if (payload.productId !== null) {
      const confirmUrl = `${API_BASE_URL}/user/policies-device-insurance/${payload.productId}/confirm-payment`;
      const timestamp = new Date().getTime();
      const dummyPayload = {
        payment_status: 'paid',
        blockchain: 'ethereum',
        block_timestamp: timestamp.toString(),
        txn_type: 'onchain',
        payment_hash: payload.txn_hash,
        currency: payload.currency,
        wallet_address: payload.wallet_address,
        paid_amount: payload.total_amount,

        // create-policy-api params
        first_name: payload.first_name,
        last_name: payload.last_name,
        mobile: payload.mobile,
        email: payload.email,
        model_code: payload.model_code,
        custom_device_name: payload.custom_device_name,
        imei_or_serial_number: payload.imei_or_serial_number,
        tran_id: payload.tran_id,
        purchase_date: payload.purchase_date,
        partner_code: payload.partner_code,
      };

      const confirmRes = yield call(
        axiosPost,
        confirmUrl,
        dummyPayload,
        yield select(selector.token),
        null,
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
        message: '',
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

// function* confirmBuyDeviceInsurance({ payload }) {
//   try {
//     yield put(
//       setConfirmBuyDeviceInsuranceLoader({
//         message: '',
//         loader: true,
//         isFailed: false,
//       }),
//     );

//     const url = `${API_BASE_URL}/user/policies-device-insurance/${payload._id}/confirm-payment`;
//     // const res = yield call(axiosPost, url, payload, yield select(selector.token));
//     const res = yield call(
//       axiosPost,
//       url,
//       payload,
//       yield select(selector.token),
//       null,
//       yield select(selector.wallet_address),
//     );

//     if (res?.data?.success) {
//       return yield put(confirmBuyDeviceInsuranceSuccess(res.data.data));
//     }

//     return yield put(
//       setConfirmBuyDeviceInsuranceLoader({
//         _id: null,
//         txn_hash: null,
//         loader: false,
//         isFailed: true,
//         message: res.data.message,
//       }),
//     );
//   } catch (error) {
//     return yield put(
//       setConfirmBuyDeviceInsuranceLoader({
//         _id: null,
//         txn_hash: null,
//         loader: false,
//         isFailed: true,
//         message: error.message,
//       }),
//     );
//   }
// }

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
          message: deviceDetail.data.error_message,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetDeviceDetailsLoader({
        loader: false,
        isFailed: true,
        deviceDetails: null,
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
          message: devicePlanDetail.data.error_message,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetDevicePlanDetailsLoader({
        loader: false,
        isFailed: true,
        devicePlanDetails: null,
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
        deviceModelDetails: null,
        message: error.message,
      }),
    );
  }
}

function* createDeviceInsurancePolicy({ payload }) {
  try {
    yield put(
      setCreateDeviceInsurancePolicyLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/p4l-forward`;
    const res = yield call(axiosPost, url, payload);

    if (!res?.data?.error_message) {
      yield put(createDeviceInsurancePolicySuccess(res.data.data));
    } else {
      yield put(
        setCreateDeviceInsurancePolicyLoader({
          loader: false,
          isFailed: true,
          devicePolicy: null,
          message: res.data.error_message,
        }),
      );
    }
  } catch (error) {
    yield put(
      setCreateDeviceInsurancePolicyLoader({
        loader: false,
        isFailed: true,
        devicePolicy: null,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(BUY_DEVICE_INSURANCE_FIRST, buyDeviceInsuranceFirst),
  takeLatest(BUY_DEVICE_INSURANCE, buyDeviceInsurance),
  // takeLatest(CONFIRM_BUY_DEVICE_INSURANCE, confirmBuyDeviceInsurance),
  takeLatest(GET_DEVICE_DETAILS, getDeviceDetail),
  takeLatest(GET_DEVICE_PLAN_DETAILS, getDevicePlanDetail),
  takeLatest(GET_DEVICE_MODEL_DETAILS, getDeviceModelDetail),
  takeLatest(CREATE_DEVICE_INSURANCE_POLICY, createDeviceInsurancePolicy),
]);
