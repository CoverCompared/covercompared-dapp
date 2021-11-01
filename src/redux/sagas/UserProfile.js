/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import { GET_USER_POLICIES } from '../constants/ActionTypes';
import { setGetUserPoliciesLoader, getUserPoliciesSuccess } from '../actions/UserProfile';
import { axiosGet, axiosPost } from '../constants/apicall';
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
      yield put(getUserPoliciesSuccess(res.data.data.policies));
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

export default all([takeLatest(GET_USER_POLICIES, searchSingleBlog)]);
