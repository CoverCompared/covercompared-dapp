/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { tokenDecimals } from '../../config';
import { recoverDecimal } from '../../utils/formatBalance';
import { API_BASE_URL } from '../constants/config';
import {
  BUY_COVER,
  CONFIRM_BUY_COVER,
  GET_COVER_BY_ID,
  SEARCH_COVER_LIST,
  GET_QUOTE,
  FETCH_MORE_COVERS,
  // GET_DEVICE_DETAILS,
  // GET_DEVICE_PLAN_DETAILS,
  // GET_DEVICE_MODEL_DETAILS,
  SEARCH_BLOG_LIST,
  SEARCH_BLOG,
  FETCH_MORE_BLOGS,
} from '../constants/ActionTypes';
import {
  setBuyCoverLoader,
  confirmBuyCoverSuccess,
  setConfirmBuyCoverLoader,
  searchCoverListSuccess,
  setSearchCoverListLoader,
  getCoverByIdSuccess,
  setGetCoverByIdLoader,
  fetchMoreCoversSuccess,
  setFetchMoreCoversLoader,
  fetchCoversWithAmountSuccess,
  getQuoteSuccess,
  getQuoteDetailSuccess,
  setGetQuoteLoader,
  // getDeviceDetailsSuccess,
  // setGetDeviceDetailsLoader,
  // getDevicePlanDetailsSuccess,
  // setGetDevicePlanDetailsLoader,
  // getDeviceModelDetailsSuccess,
  // setGetDeviceModelDetailsLoader,
  searchBlogListSuccess,
  setSearchBlogListLoader,
  searchBlogSuccess,
  setSearchBlogLoader,
  fetchMoreBlogsSuccess,
  setFetchMoreBlogsLoader,
} from '../actions/CoverList';
import { axiosGet, axiosPost } from '../constants/apicall';
import * as selector from '../constants/selectors';

function* buyCover({ payload }) {
  try {
    yield put(
      setBuyCoverLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-smart-contract`;
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      null,
      yield select(selector.wallet_address),
    );
    if (res?.data?.success && res?.data?.data?._id) {
      const confirmUrl = `${API_BASE_URL}/user/policies-smart-contract/${res.data.data._id}/confirm-payment`;
      const timestamp = new Date().getTime();
      const dummyPayload = {
        payment_status: 'paid',
        blockchain: 'ethereum',
        block_timestamp: timestamp.toString(),
        txn_type: 'onchain',
        payment_hash: payload.txn_hash,
        token_id: payload.token_id,
        crypto_currency: payload.crypto_currency,
        crypto_amount: payload.crypto_amount,
        currency: 'USD',
        wallet_address: payload.wallet_address,
        paid_amount: payload.crypto_amount,
      };

      const confirmRes = yield call(
        axiosPost,
        confirmUrl,
        dummyPayload,
        yield select(selector.token),
        null,
        yield select(selector.wallet_address),
      );
      if (confirmRes?.data?.success) return yield put(confirmBuyCoverSuccess(confirmRes.data.data));
    }

    return yield put(
      setBuyCoverLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setBuyCoverLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* confirmBuyCover({ payload }) {
  try {
    yield put(
      setConfirmBuyCoverLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/user/policies-smart-contract/${payload._id}/confirm-payment`;
    // const res = yield call(axiosPost, url, payload, yield select(selector.token));
    const res = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      null,
      yield select(selector.wallet_address),
    );

    if (res?.data?.success) {
      return yield put(confirmBuyCoverSuccess(res.data.data));
    }

    return yield put(
      setConfirmBuyCoverLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setConfirmBuyCoverLoader({
        _id: null,
        txn_hash: null,
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

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
      return yield put(
        searchCoverListSuccess({
          query: payload,
          coverList: coverList.data.data,
        }),
      );
    }

    // const urlWithAmount = `${API_BASE_URL}/cover-list${payload ? `${payload}&` : '?'}get_quote=1`;
    // const coverListWithAmount = yield call(axiosGet, urlWithAmount);

    // if (coverListWithAmount?.data?.data) {
    //   return yield put(
    //     fetchCoversWithAmountSuccess({
    //       coverList: coverListWithAmount.data.data,
    //     }),
    //   );
    // }

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

function* getCoverById({ payload }) {
  try {
    yield put(
      setGetCoverByIdLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const { type, unique_id } = payload;
    const url = `${API_BASE_URL}/cover-details/${type}/${unique_id}`;
    const cover = yield call(axiosGet, url);

    if (cover?.data?.success) {
      return yield put(getCoverByIdSuccess(cover.data.data));
    }

    return yield put(
      setGetCoverByIdLoader({
        loader: false,
        isFailed: true,
        cover: null,
        message: cover.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setGetCoverByIdLoader({
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
      return yield put(
        fetchMoreCoversSuccess({
          coverList: coverList.data.data,
        }),
      );
    }

    // const urlWithAmount = `${API_BASE_URL}/cover-list${payload ? `${payload}&` : '?'}get_quote=1`;
    // const coverListWithAmount = yield call(axiosGet, urlWithAmount);

    // if (coverListWithAmount?.data?.data) {
    //   return yield put(
    //     fetchCoversWithAmountSuccess({
    //       coverList: coverListWithAmount.data.data,
    //     }),
    //   );
    // }

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
        quoteLoader: true,
        isFailed: false,
      }),
    );

    const miniQuoteUrl = `${API_BASE_URL}/cover-min-quote`;
    const quote = yield call(axiosPost, miniQuoteUrl, payload);
    if (quote?.data?.success) {
      const decimal = tokenDecimals[payload.currency.toLowerCase()];
      yield put(getQuoteSuccess(recoverDecimal(quote?.data?.data || quote?.data?.quote, decimal)));
    }

    const quoteUrl = `${API_BASE_URL}/user/cover-quote`;
    const quoteDetail = yield call(axiosPost, quoteUrl, payload, yield select(selector.token));
    if (quoteDetail?.data?.success) {
      yield put(getQuoteDetailSuccess(quoteDetail?.data?.data));
      return yield put(setGetQuoteLoader({ message: '', quoteLoader: false, isFailed: false }));
    }

    return yield put(
      setGetQuoteLoader({
        quoteLoader: false,
        isFailed: true,
        quote: null,
        message: quote?.data?.message || quoteDetail?.data?.message,
      }),
    );
  } catch (error) {
    return yield put(
      setGetQuoteLoader({
        quoteLoader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* searchBlogList({ payload }) {
  try {
    yield put(
      setSearchBlogListLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/blogs${payload || ''}`;
    const blogList = yield call(axiosGet, url);

    if (blogList?.data?.data) {
      return yield put(
        searchBlogListSuccess({
          query: payload,
          blogList: blogList.data.data,
          blogRange: blogList.data.range,
        }),
      );
    }

    return yield put(
      setSearchBlogListLoader({
        loader: false,
        isFailed: true,
        query: null,
        message: blogList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSearchBlogListLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* searchSingleBlog({ payload }) {
  try {
    yield put(
      setSearchBlogListLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/blogs/${payload || ''}`;
    const blog = yield call(axiosGet, url);

    if (blog?.data?.data) {
      return yield put(
        searchBlogSuccess({
          query: payload,
          blog: blog.data.data,
        }),
      );
    }

    return yield put(
      setSearchBlogLoader({
        loader: false,
        isFailed: true,
        query: null,
        message: blog.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setSearchBlogLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* fetchMoreBlogLists({ payload }) {
  try {
    yield put(
      setFetchMoreBlogsLoader({
        message: '',
        paginationLoader: true,
        isFailed: false,
      }),
    );

    const url = `${API_BASE_URL}/blogs${payload || ''}`;
    const blogList = yield call(axiosGet, url);

    if (blogList?.data?.data) {
      return yield put(
        fetchMoreBlogsSuccess({
          blogList: blogList.data.data,
          blogRange: blogList.data.range,
        }),
      );
    }

    return yield put(
      setFetchMoreBlogsLoader({
        isFailed: true,
        paginationLoader: false,
        message: blogList.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setFetchMoreBlogsLoader({
        isFailed: true,
        paginationLoader: false,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(BUY_COVER, buyCover),
  takeLatest(CONFIRM_BUY_COVER, confirmBuyCover),
  takeLatest(SEARCH_COVER_LIST, searchAllCoverList),
  takeLatest(GET_COVER_BY_ID, getCoverById),
  takeLatest(FETCH_MORE_COVERS, fetchMoreCoverLists),
  takeLatest(GET_QUOTE, getQuote),
  takeLatest(SEARCH_BLOG_LIST, searchBlogList),
  takeLatest(SEARCH_BLOG, searchSingleBlog),
  takeLatest(FETCH_MORE_BLOGS, fetchMoreBlogLists),
]);
