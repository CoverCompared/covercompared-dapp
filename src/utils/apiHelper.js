import axios from "axios";
import Moralis from 'moralis';

import { MORALIS_BASE_URL, MORALIS_API_KEY, MORALIS_ID, SERVER_URL } from "../config";

Moralis.initialize(MORALIS_ID);
Moralis.serverURL = SERVER_URL;

export const axiosPost = (endpoint, payload, headers = null) => {
    const url = `${MORALIS_BASE_URL}${endpoint}`;
    if (!headers) headers = {};
    if (!headers['Content-Type'] && !headers['content-type'])
      headers['Content-Type'] = 'application/json';
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
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
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers,
        };
    });
};

export const axiosGet = (endpoint) => {
    const url = `${MORALIS_BASE_URL}${endpoint}`;
    const headers = {};
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
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
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers,
        };
    });
};
  
export const axiosGetMain = (endpoint) => {
    const url = `${MORALIS_BASE_URL}${endpoint}?chain=eth`;
    const headers = {};
    if (MORALIS_API_KEY) headers['X-API-Key'] = MORALIS_API_KEY;
  
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
            message: "failed!",
          };
        } else {
          code = 500;
          data = {
            message: error.message || "failed!",
          };
        }
  
        return {
          status: code,
          data,
          headers,
        };
    });
};