import uniqid from 'uniqid';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  ADD_ITEM_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  EMPTY_CART,
  SYNC_CART,
} from '../constants/ActionTypes';
import {
  setAppLoader,
  addItemToCartSuccess,
  updateCartItemSuccess,
  removeCartItemSuccess,
  emptyCartSuccess,
  syncCartSuccess,
} from '../actions/AppActions';
import * as selector from '../constants/selectors';
import { axiosGet, axiosPost } from '../constants/apicall';

function* addItemToCart({ payload }) {
  try {
    yield put(
      setAppLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    let cart = yield select(selector.cart);
    const token = yield select(selector.token);
    cart = [...cart, { ...payload, uuid: uniqid() }];

    if (!token) return yield put(addItemToCartSuccess(cart));

    const url = `${API_BASE_URL}/user/cart-items`;
    const res = yield call(axiosPost, url, { cart_items: cart }, token);

    if (res?.data?.data) {
      return yield put(addItemToCartSuccess(res?.data?.data));
    }

    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* updateCartItem({ payload }) {
  try {
    yield put(
      setAppLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    let cart = yield select(selector.cart);
    const token = yield select(selector.token);
    cart = cart.map((m) => (m.uuid === payload.uuid ? { ...m, ...payload } : m));

    if (!token) return yield put(updateCartItemSuccess(cart));

    const url = `${API_BASE_URL}/user/cart-items`;
    const res = yield call(axiosPost, url, { cart_items: cart }, token);

    if (res?.data?.data) {
      return yield put(updateCartItemSuccess(res?.data?.data));
    }

    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* removeCartItem({ payload }) {
  try {
    yield put(
      setAppLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    let cart = yield select(selector.cart);
    const token = yield select(selector.token);
    cart = cart.filter((f) => f.uuid !== payload);

    if (!token) return yield put(removeCartItemSuccess(cart));

    const url = `${API_BASE_URL}/user/cart-items`;
    const res = yield call(axiosPost, url, { cart_items: cart }, token);

    if (res?.data?.data) {
      return yield put(removeCartItemSuccess(res?.data?.data));
    }

    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* emptyCart() {
  try {
    yield put(
      setAppLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    const token = yield select(selector.token);
    if (!token) return yield put(emptyCartSuccess([]));

    const url = `${API_BASE_URL}/user/cart-items`;
    const res = yield call(axiosPost, url, { cart_items: [] }, token);

    if (res?.data?.data) {
      return yield put(emptyCartSuccess(res?.data?.data));
    }

    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

function* SyncCart({ payload }) {
  try {
    yield put(
      setAppLoader({
        message: '',
        loader: true,
        isFailed: false,
      }),
    );

    let cart = yield select(selector.cart);
    const token = yield select(selector.token);

    const url = `${API_BASE_URL}/user/cart-items`;
    const res = yield call(axiosGet, url, token);

    if (res?.data?.data) {
      const filtered = cart.filter((f) => !res?.data?.data.some((e) => e.uuid === f.uuid));
      cart = [...res?.data?.data, ...filtered];

      const uploadRes = yield call(axiosPost, url, { cart_items: cart }, token);
      if (uploadRes?.data?.data) {
        return yield put(syncCartSuccess(uploadRes?.data?.data));
      }
    }

    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: res.data.message,
      }),
    );
  } catch (error) {
    return yield put(
      setAppLoader({
        loader: false,
        isFailed: true,
        message: error.message,
      }),
    );
  }
}

export default all([
  takeLatest(ADD_ITEM_TO_CART, addItemToCart),
  takeLatest(UPDATE_CART_ITEM, updateCartItem),
  takeLatest(REMOVE_CART_ITEM, removeCartItem),
  takeLatest(EMPTY_CART, emptyCart),
  takeLatest(SYNC_CART, SyncCart),
]);
