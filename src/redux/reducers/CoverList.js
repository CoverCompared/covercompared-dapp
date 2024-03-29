import {
  SET_BUY_COVER_LOADER,
  BUY_COVER_SUCCESS,
  SET_CONFIRM_BUY_COVER_LOADER,
  CONFIRM_BUY_COVER_SUCCESS,
  SET_SEARCH_COVER_LIST_LOADER,
  SEARCH_COVER_LIST_SUCCESS,
  SET_GET_COVER_BY_ID_LOADER,
  GET_COVER_BY_ID_SUCCESS,
  SET_FETCH_MORE_COVERS_LOADER,
  FETCH_MORE_COVERS_SUCCESS,
  FETCH_COVERS_WITH_AMOUNT_SUCCESS,
  SET_GET_QUOTE_LOADER,
  GET_QUOTE_SUCCESS,
  GET_QUOTE_DETAIL_SUCCESS,
  ACTION_METHOD_FAILED,
  SET_SEARCH_BLOG_LIST_LOADER,
  SEARCH_BLOG_LIST_SUCCESS,
  SET_SEARCH_BLOG_LOADER,
  SEARCH_BLOG_SUCCESS,
  SET_FETCH_MORE_BLOGS_LOADER,
  FETCH_MORE_BLOGS_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  paginationLoader: false,
  quoteLoader: false,
  isFailed: false,
  quote: null,
  query: null,
  page: 1,
  totalPages: 1,
  coverList: null,
  cover: null,
  blogList: null,
  blog: null,
  blogRange: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_METHOD_FAILED: {
      return {
        ...state,
        ...payload,
      };
    }
    case SET_BUY_COVER_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case BUY_COVER_SUCCESS: {
      return {
        ...state,
        ...payload,
        message: '',
        loader: false,
        isFailed: false,
      };
    }
    case SET_CONFIRM_BUY_COVER_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case CONFIRM_BUY_COVER_SUCCESS: {
      return {
        ...state,
        ...payload,
        message: '',
        loader: false,
        isFailed: false,
      };
    }
    case SET_SEARCH_BLOG_LIST_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SEARCH_BLOG_LIST_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        query: payload.query,
        blogList: payload.blogList,
        blogRange: payload.blogRange,
      };
    }
    case SET_FETCH_MORE_BLOGS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case FETCH_MORE_BLOGS_SUCCESS: {
      return {
        ...state,
        message: '',
        paginationLoader: false,
        isFailed: false,
        query: payload.query,
        blogList: [...state.blogList, ...payload.blogList],
        blogRange: payload.blogRange,
      };
    }
    case SET_SEARCH_BLOG_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SEARCH_BLOG_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        query: payload.query,
        blog: payload.blog,
      };
    }
    case SET_SEARCH_COVER_LIST_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SEARCH_COVER_LIST_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        query: payload.query,
        coverList: payload.coverList.list,
        page: payload.coverList.current_page,
        totalPages: payload.coverList.total_page,
      };
    }
    case SET_GET_COVER_BY_ID_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_COVER_BY_ID_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        cover: payload,
      };
    }
    case SET_FETCH_MORE_COVERS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case FETCH_MORE_COVERS_SUCCESS: {
      return {
        ...state,
        message: '',
        paginationLoader: false,
        isFailed: false,
        query: payload.query,
        coverList: [...state.coverList, ...payload.coverList.list],
        page: payload.coverList.current_page,
        totalPages: payload.coverList.total_page,
      };
    }
    case FETCH_COVERS_WITH_AMOUNT_SUCCESS: {
      return {
        ...state,
        coverList: state.coverList.map(
          (obj) => payload.coverList.list.find((o) => o.unique_id === obj.unique_id) || obj,
        ),
      };
    }
    case SET_GET_QUOTE_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_QUOTE_SUCCESS: {
      return {
        ...state,
        message: '',
        quoteLoader: false,
        isFailed: false,
        quote: payload,
      };
    }
    case GET_QUOTE_DETAIL_SUCCESS: {
      return {
        ...state,
        quoteDetail: payload,
      };
    }
    default:
      return state;
  }
};
