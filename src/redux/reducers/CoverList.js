import {
  SET_SEARCH_COVER_LIST_LOADER,
  SEARCH_COVER_LIST_SUCCESS,
  SET_SEARCH_MSO_LIST_LOADER,
  SEARCH_MSO_LIST_SUCCESS,
  SET_FETCH_MORE_COVERS_LOADER,
  FETCH_MORE_COVERS_SUCCESS,
  FETCH_COVERS_WITH_AMOUNT_SUCCESS,
  SET_GET_QUOTE_LOADER,
  GET_QUOTE_SUCCESS,
  GET_DEVICE_DETAILS_SUCCESS,
  SET_GET_DEVICE_DETAILS_LOADER,
  GET_DEVICE_PLAN_DETAILS_SUCCESS,
  SET_GET_DEVICE_PLAN_DETAILS_LOADER,
  ACTION_METHOD_FAILED,
  SET_SEARCH_BLOG_LIST_LOADER,
  SEARCH_BLOG_LIST_SUCCESS,
  SET_SEARCH_BLOG_LOADER,
  SEARCH_BLOG_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  message: '',
  loader: false,
  paginationLoader: false,
  isFailed: false,
  quote: null,
  query: null,
  page: 1,
  totalPages: 1,
  coverList: null,
  deviceDetails: null,
  devicePlanDetails: null,
  blogList: null,
  blog: null,
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_METHOD_FAILED: {
      return {
        ...state,
        ...payload,
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
        // page: payload.coverList.current_page,
        // totalPages: payload.coverList.total_page,
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
    case SEARCH_MSO_LIST_SUCCESS: {
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
    case SET_SEARCH_MSO_LIST_LOADER: {
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
        loader: false,
        isFailed: false,
        quote: payload,
      };
    }
    case SET_GET_DEVICE_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_DEVICE_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        deviceDetails: payload,
      };
    }
    case SET_GET_DEVICE_PLAN_DETAILS_LOADER: {
      return {
        ...state,
        ...payload,
      };
    }
    case GET_DEVICE_PLAN_DETAILS_SUCCESS: {
      return {
        ...state,
        message: '',
        loader: false,
        isFailed: false,
        devicePlanDetails: payload,
      };
    }
    default:
      return state;
  }
};
