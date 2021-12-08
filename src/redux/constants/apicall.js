/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';

import { fallbackMessage } from './constants';
import configureStore from '../store';
import { logoutUser, getLoginDetailsSuccess } from '../actions/Auth';
import { API_BASE_URL } from './config';

export const axiosGet = (url, token = null, wallet_address = null) => {
  const headers = {};
  if (token) headers.Authorization = token;

  return axios
    .get(url, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch(async (error) => {
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

      try {
        if (
          ((!error.response.data?.success && data?.message === 'Unauthorized.') ||
            !error.response.data?.status) &&
          wallet_address
        ) {
          const loginUrl = `${API_BASE_URL}/login`;
          const loginPayload = { wallet_address };
          const loginRes = await axios.post(loginUrl, loginPayload, { headers });
          if (loginRes?.data?.data) {
            const store = configureStore()?.store;

            store.dispatch(getLoginDetailsSuccess(loginRes.data.data));
            axiosGet(url, loginRes.data.data.token);
          }
        }
      } catch (err) {
        console.log('err :>> ', err);
        return {
          status: code,
          data,
          headers,
        };
      }

      console.log('error :>> ', error);
      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosPost = (url, payload, token = null, headers = null, wallet_address = null) => {
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
    .catch(async (error) => {
      console.log('error in axio call :: ', error);
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

      try {
        if (
          ((!error.response.data?.success && data?.message === 'Unauthorized.') ||
            !error.response.data?.status) &&
          wallet_address
        ) {
          const loginUrl = `${API_BASE_URL}/login`;
          const loginPayload = { wallet_address };
          const loginRes = await axios.post(loginUrl, loginPayload, { headers });
          if (loginRes?.data?.data) {
            const store = configureStore()?.store;

            store.dispatch(getLoginDetailsSuccess(loginRes.data.data));
            axiosPost(url, payload, loginRes.data.data.token, headers);
          }
        }
      } catch (err) {
        console.log('err :>> ', err);
        return {
          status: code,
          data,
          headers,
        };
      }

      console.log('error :>> ', error);
      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosPut = (url, obj, token, headers = null, wallet_address = null) => {
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
    .catch(async (error) => {
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

      try {
        if (
          ((!error.response.data?.success && data?.message === 'Unauthorized.') ||
            !error.response.data?.status) &&
          wallet_address
        ) {
          const loginUrl = `${API_BASE_URL}/login`;
          const loginPayload = { wallet_address };
          const loginRes = await axios.post(loginUrl, loginPayload, { headers });
          if (loginRes?.data?.data) {
            const store = configureStore()?.store;

            store.dispatch(getLoginDetailsSuccess(loginRes.data.data));
            axiosPut(url, obj, loginRes.data.data.token, headers);
          }
        }
      } catch (err) {
        console.log('err :>> ', err);
        return {
          status: code,
          data,
          headers,
        };
      }

      console.log('error :>> ', error);
      return {
        status: code,
        data,
        headers,
      };
    });
};

export const axiosDelete = (url, token, wallet_address = null) => {
  return axios
    .delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch(async (error) => {
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

      try {
        if (
          ((!error.response.data?.success && data?.message === 'Unauthorized.') ||
            !error.response.data?.status) &&
          wallet_address
        ) {
          const loginUrl = `${API_BASE_URL}/login`;
          const loginPayload = { wallet_address };
          const loginRes = await axios.post(loginUrl, loginPayload, { headers });
          if (loginRes?.data?.data) {
            const store = configureStore()?.store;

            store.dispatch(getLoginDetailsSuccess(loginRes.data.data));
            axiosDelete(url, loginRes.data.data.token);
          }
        }
      } catch (err) {
        console.log('err :>> ', err);
        return {
          status: code,
          data,
          headers,
        };
      }

      console.log('error :>> ', error);
      return {
        status: code,
        data,
        headers,
      };
    });
};
