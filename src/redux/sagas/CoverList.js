/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
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
  searchCoverListSuccess,
  setSearchCoverListLoader,
  fetchMoreCoversSuccess,
  setFetchMoreCoversLoader,
  fetchCoversWithAmountSuccess,
  getQuoteSuccess,
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
      yield put(
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
      yield put(
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
      yield put(
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
  takeLatest(SEARCH_COVER_LIST, searchAllCoverList),
  takeLatest(FETCH_MORE_COVERS, fetchMoreCoverLists),
  takeLatest(GET_QUOTE, getQuote),
  takeLatest(SEARCH_BLOG_LIST, searchBlogList),
  takeLatest(SEARCH_BLOG, searchSingleBlog),
  takeLatest(FETCH_MORE_BLOGS, fetchMoreBlogLists),
]);
