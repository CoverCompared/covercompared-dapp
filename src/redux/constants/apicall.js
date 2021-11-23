/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import { fallbackMessage } from './constants';
import configureStore from '../store';
import { logoutUser } from '../actions/Auth';

export const axiosGet = (url, token = null) => {
  const headers = {};
  if (token) headers.Authorization = token;

  return axios
    .get(url, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let code = null;
      let data = null;
      let headers = null;
      if (error.response) {
        code = error.response.status;
        data = error.response.data;
        headers = error.response.headers;
      } else if (error.request) {
        code = 500;
        data = {
          message: fallbackMessage,
        };
      } else {
        code = 500;
        data = {
          message: error.message || fallbackMessage,
        };
      }

      if (!data?.success && data?.message === 'Unauthorized.') {
        if (configureStore) {
          const store = configureStore()?.store;
          store.dispatch(logoutUser());
        }
      }

      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosPost = (url, payload, token = null, headers = null) => {
  if (!headers) headers = {};
  if (!headers['Content-Type'] && !headers['content-type'])
    headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = token;

  return axios
    .post(url, payload, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let code = null;
      let data = null;
      let headers = null;
      if (error.response) {
        code = error.response.status;
        data = error.response.data;
        headers = error.response.headers;
      } else if (error.request) {
        code = 500;
        data = {
          message: fallbackMessage,
        };
      } else {
        code = 500;
        data = {
          message: error.message || fallbackMessage,
        };
      }

      if (!data?.success && data?.message === 'Unauthorized.') {
        if (configureStore) {
          const store = configureStore()?.store;
          store.dispatch(logoutUser());
        }
      }

      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosPut = (url, obj, token, headers = null) => {
  if (!headers) headers = {};
  if (!headers['Content-Type'] && !headers['content-type'])
    headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = token;
  return axios
    .put(url, obj, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let code = null;
      let data = null;
      let headers = null;
      if (error.response) {
        code = error.response.status;
        data = error.response.data;
        headers = error.response.headers;
      } else if (error.request) {
        code = 500;
        data = {
          message: fallbackMessage,
        };
      } else {
        code = 500;
        data = {
          message: error.message || fallbackMessage,
        };
      }

      if (!data?.success && data?.message === 'Unauthorized.') {
        if (configureStore) {
          const store = configureStore()?.store;
          store.dispatch(logoutUser());
        }
      }

      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosDelete = (url, token) => {
  return axios
    .delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let code = null;
      let data = null;
      let headers = null;
      if (error.response) {
        code = error.response.status;
        data = error.response.data;
        headers = error.response.headers;
      } else if (error.request) {
        code = 500;
        data = {
          message: fallbackMessage,
        };
      } else {
        code = 500;
        data = {
          message: error.message || fallbackMessage,
        };
      }

      if (!data?.success && data?.message === 'Unauthorized.') {
        if (configureStore) {
          const store = configureStore()?.store;
          store.dispatch(logoutUser());
        }
      }

      return {
        status: code,
        data,
        headers,
      };
    });
};
