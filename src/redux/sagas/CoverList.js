/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  SEARCH_COVER_LIST,
  SEARCH_MSO_LIST,
  GET_QUOTE,
  FETCH_MORE_COVERS,
  GET_DEVICE_DETAILS,
  GET_DEVICE_PLAN_DETAILS,
  GET_LOGIN_DETAILS,
  SET_PROFILE_DETAILS,
} from '../constants/ActionTypes';
import {
  searchCoverListSuccess,
  setSearchCoverListLoader,
  searchMSOListSuccess,
  setSearchMSOListLoader,
  setProfileDetailsSuccess,
  setProfileDetailsLoader,
  getLoginDetailsSuccess,
  getLoginDetailsLoader,
  fetchMoreCoversSuccess,
  setFetchMoreCoversLoader,
  fetchCoversWithAmountSuccess,
  getQuoteSuccess,
  setGetQuoteLoader,
  getDeviceDetailsSuccess,
  setGetDeviceDetailsLoader,
  getDevicePlanDetailsSuccess,
  setGetDevicePlanDetailsLoader,
} from '../actions/CoverList';
import { axiosGet, axiosPost, post_with_token } from '../constants/apicall';

function* searchAllCoverList({ payload }) {
  try {
    yield put(
      setSearchCoverListLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/cover-list${payload || ''}`;
    const coverList = yield call(axiosGet, url);

    if (coverList?.data?.data) {
      yield put(
        searchCoverListSuccess({
          query: payload,
          coverList: coverList.data.data,
        }),
      );
    }

    const urlWithAmount = `${API_BASE_URL}/cover-list${payload ? `${payload}&` : '?'}get_quote=1`;
    const coverListWithAmount = yield call(axiosGet, urlWithAmount);

    if (coverListWithAmount?.data?.data) {
      return yield put(
        fetchCoversWithAmountSuccess({
          coverList: coverListWithAmount.data.data,
        }),
      );
    }

    return yield put(
      setSearchCoverListLoader({
        loader: false,
        isFailed: true,
        query: null,
        coverList: null,
        message: coverList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSearchCoverListLoader({
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

function* setProfileData({ payload }) {
  try {
    yield put(
      setProfileDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/add-profile-details`;
    const res = yield call(
      post_with_token,
      url,
      payload,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…gzN30.35om2Jbn_DesVYhRWOOTilSpK5I2jY6hQVKI3S1sHRM',
    );

    if (res?.data?.data) {
      console.log(res);
      yield put(
        setProfileDetailsSuccess({
          query: payload,
          profileDetailsRes: res.data.data,
        }),
      );
    }
    return yield put(
      setProfileDetailsLoader({
        loader: false,
        isFailed: true,
        query: null,
        msoList: null,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setProfileDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* getAccountToken({ payload }) {
  try {
    yield put(
      getLoginDetailsLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/login`;
    const loginRes = yield call(axiosPost, url, payload);

    if (loginRes?.data?.data) {
      yield put(
        getLoginDetailsSuccess({
          query: payload,
          loginDetails: loginRes.data.data,
        }),
      );
    }

    return yield put(
      getLoginDetailsLoader({
        loader: false,
        isFailed: true,
        query: null,
        msoList: null,
        message: loginRes.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      getLoginDetailsLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* fetchMoreCoverLists({ payload }) {
  try {
    yield put(
      setFetchMoreCoversLoader({
        message: '',
        paginationLoader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/cover-list${payload || ''}`;
    const coverList = yield call(axiosGet, url);

    if (coverList?.data?.data) {
      yield put(
        fetchMoreCoversSuccess({
          coverList: coverList.data.data,
        }),
      );
    }

    const urlWithAmount = `${API_BASE_URL}/cover-list${payload ? `${payload}&` : '?'}get_quote=1`;
    const coverListWithAmount = yield call(axiosGet, urlWithAmount);

    if (coverListWithAmount?.data?.data) {
      return yield put(
        fetchCoversWithAmountSuccess({
          coverList: coverListWithAmount.data.data,
        }),
      );
    }

    return yield put(
      setFetchMoreCoversLoader({
        isFailed: true,
        paginationLoader: false,
        message: coverList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setFetchMoreCoversLoader({
        isFailed: true,
        paginationLoader: false,
        message: error.message,
      }),
    );
  }
}

function* getQuote({ payload }) {
  try {
    yield put(
      setGetQuoteLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/cover-min-quote`;
    const quote = yield call(axiosPost, url, payload);

    if (quote?.data?.data || quote?.data?.quote) {
      yield put(getQuoteSuccess(quote?.data?.data || quote?.data?.quote));
    } else {
      yield put(
        setGetQuoteLoader({
          loader: false,
          isFailed: true,
          quote: null,
          message: quote.errors,
        }),
      );
    }
  } catch (error) {
    yield put(
      setGetQuoteLoader({
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
      yield put(getDeviceDetailsSuccess(deviceDetail?.data?.data));
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
      yield put(getDevicePlanDetailsSuccess(devicePlanDetail?.data?.data));
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

export default all([
  takeLatest(SEARCH_COVER_LIST, searchAllCoverList),
  takeLatest(SEARCH_MSO_LIST, searchMSOList),
  takeLatest(FETCH_MORE_COVERS, fetchMoreCoverLists),
  takeLatest(GET_QUOTE, getQuote),
  takeLatest(GET_DEVICE_DETAILS, getDeviceDetail),
  takeLatest(GET_DEVICE_PLAN_DETAILS, getDevicePlanDetail),
  takeLatest(GET_LOGIN_DETAILS, getAccountToken),
  takeLatest(SET_PROFILE_DETAILS, setProfileData),
]);
