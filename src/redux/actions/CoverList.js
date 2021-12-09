import {
  ACTION_METHOD_FAILED,
  BUY_COVER,
  BUY_COVER_SUCCESS,
  SET_BUY_COVER_LOADER,
  CONFIRM_BUY_COVER,
  CONFIRM_BUY_COVER_SUCCESS,
  SET_CONFIRM_BUY_COVER_LOADER,
  SEARCH_COVER_LIST,
  SEARCH_COVER_LIST_SUCCESS,
  SET_SEARCH_COVER_LIST_LOADER,
  FETCH_MORE_COVERS,
  FETCH_MORE_COVERS_SUCCESS,
  SET_FETCH_MORE_COVERS_LOADER,
  FETCH_COVERS_WITH_AMOUNT_SUCCESS,
  GET_QUOTE,
  GET_QUOTE_SUCCESS,
  GET_QUOTE_DETAIL_SUCCESS,
  SET_GET_QUOTE_LOADER,
  SEARCH_BLOG_LIST,
  SEARCH_BLOG_LIST_SUCCESS,
  SET_SEARCH_BLOG_LIST_LOADER,
  SEARCH_BLOG,
  SEARCH_BLOG_SUCCESS,
  SET_SEARCH_BLOG_LOADER,
  FETCH_MORE_BLOGS,
  FETCH_MORE_BLOGS_SUCCESS,
  SET_FETCH_MORE_BLOGS_LOADER,
} from '../constants/ActionTypes';

export const actionMethodFailed = (payload) => {
  return {
    type: ACTION_METHOD_FAILED,
    payload,
  };
};

export const buyCover = (payload) => {
  return {
    type: BUY_COVER,
    payload,
  };
};
export const buyCoverSuccess = (payload) => {
  return {
    type: BUY_COVER_SUCCESS,
    payload,
  };
};
export const setBuyCoverLoader = (payload) => {
  return {
    type: SET_BUY_COVER_LOADER,
    payload,
  };
};
export const confirmBuyCover = (payload) => {
  return {
    type: CONFIRM_BUY_COVER,
    payload,
  };
};
export const confirmBuyCoverSuccess = (payload) => {
  return {
    type: CONFIRM_BUY_COVER_SUCCESS,
    payload,
  };
};
export const setConfirmBuyCoverLoader = (payload) => {
  return {
    type: SET_CONFIRM_BUY_COVER_LOADER,
    payload,
  };
};

export const searchCoverList = (payload) => {
  return {
    type: SEARCH_COVER_LIST,
    payload,
  };
};

export const searchCoverListSuccess = (payload) => {
  return {
    type: SEARCH_COVER_LIST_SUCCESS,
    payload,
  };
};

export const setSearchCoverListLoader = (payload) => {
  return {
    type: SET_SEARCH_COVER_LIST_LOADER,
    payload,
  };
};

export const fetchMoreCovers = (payload) => {
  return {
    type: FETCH_MORE_COVERS,
    payload,
  };
};

export const fetchMoreCoversSuccess = (payload) => {
  return {
    type: FETCH_MORE_COVERS_SUCCESS,
    payload,
  };
};

export const setFetchMoreCoversLoader = (payload) => {
  return {
    type: SET_FETCH_MORE_COVERS_LOADER,
    payload,
  };
};

export const fetchCoversWithAmountSuccess = (payload) => {
  return {
    type: FETCH_COVERS_WITH_AMOUNT_SUCCESS,
    payload,
  };
};

export const getQuote = (payload) => {
  return {
    type: GET_QUOTE,
    payload,
  };
};

export const getQuoteSuccess = (payload) => {
  return {
    type: GET_QUOTE_SUCCESS,
    payload,
  };
};

export const getQuoteDetailSuccess = (payload) => {
  return {
    type: GET_QUOTE_DETAIL_SUCCESS,
    payload,
  };
};

export const setGetQuoteLoader = (payload) => {
  return {
    type: SET_GET_QUOTE_LOADER,
    payload,
  };
};

export const searchBlogList = (payload) => {
  return {
    type: SEARCH_BLOG_LIST,
    payload,
  };
};

export const searchBlogListSuccess = (payload) => {
  return {
    type: SEARCH_BLOG_LIST_SUCCESS,
    payload,
  };
};

export const setSearchBlogListLoader = (payload) => {
  return {
    type: SET_SEARCH_BLOG_LIST_LOADER,
    payload,
  };
};

export const searchBlog = (payload) => {
  return {
    type: SEARCH_BLOG,
    payload,
  };
};

export const searchBlogSuccess = (payload) => {
  return {
    type: SEARCH_BLOG_SUCCESS,
    payload,
  };
};

export const setSearchBlogLoader = (payload) => {
  return {
    type: SET_SEARCH_BLOG_LOADER,
    payload,
  };
};

export const fetchMoreBlogs = (payload) => {
  return {
    type: FETCH_MORE_BLOGS,
    payload,
  };
};

export const fetchMoreBlogsSuccess = (payload) => {
  return {
    type: FETCH_MORE_BLOGS_SUCCESS,
    payload,
  };
};

export const setFetchMoreBlogsLoader = (payload) => {
  return {
    type: SET_FETCH_MORE_BLOGS_LOADER,
    payload,
  };
};
