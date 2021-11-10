/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  GET_USER_POLICIES,
  SUBMIT_SUBSCRIBE_EMAIL,
  SUBMIT_CONTACT_DETAILS,
  SUBMIT_REVIEW,
} from '../constants/ActionTypes';
import {
  setGetUserPoliciesLoader,
  getUserPoliciesSuccess,
  submitSubscribeEmailSuccess,
  setSubmitSubscribeEmailLoader,
  submitContactDetailsSuccess,
  setSubmitContactDetailsLoader,
  submitReviewSuccess,
  setSubmitReviewLoader,
} from '../actions/UserProfile';
import { axiosGet, axiosPost, post } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* searchSingleBlog({ payload }) {
  try {
    yield put(
      setGetUserPoliciesLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies`;
    const res = yield call(axiosGet, url, yield select(selector.token));

    if (res?.data?.data?.policies) {
      return yield put(getUserPoliciesSuccess(res.data.data.policies));
    }

    return yield put(
      setGetUserPoliciesLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setGetUserPoliciesLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* submitSubscribeEmail({ payload }) {
  try {
    yield put(
      setSubmitSubscribeEmailLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/landing-app-subscribe`;
    const res = yield call(axiosPost, url, payload);

    if (res?.data) {
      return yield put(submitSubscribeEmailSuccess(res.data));
    }

    return yield put(
      setSubmitSubscribeEmailLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSubmitSubscribeEmailLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* submitContactDetails({ payload }) {
  try {
    yield put(
      setSubmitContactDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/contact-us`;
    const res = yield call(axiosPost, url, payload);

    if (res?.data) {
      return yield put(submitContactDetailsSuccess(res.data));
    }

    return yield put(
      setSubmitContactDetailsLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSubmitContactDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* submitReview({ payload }) {
  try {
    yield put(
      setSubmitReviewLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/${payload.query}`;
    const res = yield call(axiosPost, url, payload.obj, yield select(selector.token));

    if (res?.data) {
      return yield put(submitReviewSuccess(res.data));
    }

    return yield put(
      setSubmitReviewLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSubmitReviewLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(GET_USER_POLICIES, searchSingleBlog),
  takeLatest(SUBMIT_SUBSCRIBE_EMAIL, submitSubscribeEmail),
  takeLatest(SUBMIT_CONTACT_DETAILS, submitContactDetails),
  takeLatest(SUBMIT_REVIEW, submitReview),
]);
