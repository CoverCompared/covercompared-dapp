/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants/config';
import {
  CREATE_USER,
  LIST_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_BY_ID,
} from '../constants/ActionTypes';
import {
  createUserSuccess,
  setUserLoader,
  listUserSuccess,
  setListUserLoader,
  deleteUserFailed,
  deleteUserSuccess,
  updateUserSuccess,
  updateUserFailed,
  getUserByIdSuccess,
  actionMethodFailed,
  getUserById,
} from '../actions/User';
// import { signoutUserSuccess } from '../actions/Auth';
import * as selector from '../constants/selectors';
import { axiosGet, axiosPost, axiosPut, axiosDelete } from '../constants/apicall';
import { fallbackMessage } from '../constants/constants';

export const token = (state) => state.authUser;

function* createUser({ payload }) {
  try {
    yield put(setUserLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}users`;
    // const user = yield call(axiosPost, url, payload, yield select(selector.token));
    const user = yield call(
      axiosPost,
      url,
      payload,
      yield select(selector.token),
      null,
      yield select(selector.wallet_address),
    );
    if (user.body && user.body.email) {
      user.message = `User has been added successfully.`;
      yield put(createUserSuccess(user));
      // } else if (user.message === 'Unauthorized') {
      // yield put(signoutUserSuccess());
    } else if (user === undefined) {
      yield put(
        setUserLoader({
          isFailed: false,
          message: fallbackMessage,
          loader: true,
        }),
      );
    } else {
      yield put(
        setUserLoader({
          isFailed: true,
          message: user.message || fallbackMessage,
          loader: false,
        }),
      );
    }
  } catch (error) {
    yield put(
      setUserLoader({
        isFailed: true,
        message: error.message,
        loader: false,
      }),
    );
  }
}

function* listUsersAll({ payload }) {
  try {
    yield put(
      setListUserLoader({
        isFailed: false,
        message: '',
        loader: true,
      }),
    );
    const url = `${API_BASE_URL}users`;
    const listUser = yield call(
      axiosGet,
      url,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );

    if (listUser.body) {
      yield put(listUserSuccess(listUser));
      // } else if (listUser.message === 'Unauthorized') {
      //   yield put(signoutUserSuccess());
    } else if (listUser === undefined) {
      yield put(
        setListUserLoader({
          isFailed: false,
          message: '',
          loader: true,
        }),
      );
    } else {
      yield put(
        setListUserLoader({
          isFailed: true,
          message: listUser.error.message,
          loader: false,
        }),
      );
    }
  } catch (error) {
    yield put(
      setListUserLoader({
        isFailed: true,
        message: error.message,
        loader: false,
      }),
    );
  }
}

function* updateUser({ payload }) {
  try {
    const { id } = payload;
    yield put(setUserLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}users/${id}`;
    delete payload.id;

    let successMessage = `User has been updated successfully.`;
    if (payload.password) successMessage = `Password has been updated successfully.`;
    if (payload.portal_access >= 0)
      successMessage = `Portal access has been ${
        payload.portal_access ? 'enabled' : 'disabled'
      } successfully.`;

    // const response = yield call(axiosPut, url, payload, yield select(selector.token));
    const response = yield call(
      axiosPut,
      url,
      payload,
      yield select(selector.token),
      null,
      yield select(selector.wallet_address),
    );
    if (response.status === 200) {
      yield put(
        updateUserSuccess({
          isFailed: false,
          user: response.data.body,
          message: successMessage,
          loader: false,
        }),
      );
      getUserById();
    }
    // else if (response.status === 401) yield put(signoutUserSuccess());
    else
      yield put(
        updateUserFailed({
          isFailed: true,
          message: response.data.message,
          loader: false,
        }),
      );
  } catch (error) {
    yield put(
      updateUserFailed({
        isFailed: true,
        message: error.message || fallbackMessage,
        loader: false,
      }),
    );
  }
}

function* getUserByIdSaga({ payload }) {
  try {
    yield put(setUserLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}users/${payload.id}`;
    const urlProfile = `${API_BASE_URL}user-profile/${payload.id}`;
    // const response = yield call(axiosGet, url, yield select(selector.token));
    const response = yield call(
      axiosGet,
      url,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );
    // const responseProfile = yield call(axiosGet, urlProfile, yield select(selector.token));
    const responseProfile = yield call(
      axiosGet,
      urlProfile,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );
    let res = {};
    if (response.status === 200) {
      res = response.data.body;
      res.profiles = responseProfile.data.body;
    }

    if (response.status === 200)
      yield put(
        getUserByIdSuccess({
          isFailed: false,
          user: res,
          loader: false,
        }),
      );
    // else if (response.status === 401) yield put(signoutUserSuccess());
    else
      yield put(
        actionMethodFailed({
          isFailed: true,
          message: response.data.message,
          loader: false,
        }),
      );
  } catch (error) {
    yield put(
      actionMethodFailed({
        isFailed: true,
        message: error.message || fallbackMessage,
        loader: false,
      }),
    );
  }
}

function* deleteUser({ payload }) {
  try {
    yield put(setUserLoader({ isFailed: false, message: '', loader: true }));
    const url = `${API_BASE_URL}users/${payload.id}`;

    // const response = yield call(axiosDelete, url, yield select(selector.token));
    const response = yield call(
      axiosDelete,
      url,
      yield select(selector.token),
      yield select(selector.wallet_address),
    );
    if (response.status === 200)
      yield put(
        deleteUserSuccess({
          isFailed: false,
          message: response.data.message,
          loader: false,
        }),
      );
    // else if (response.status === 401) yield put(signoutUserSuccess());
    else
      yield put(
        deleteUserFailed({
          isFailed: true,
          message: response.data.message,
          loader: false,
        }),
      );
  } catch (error) {
    yield put(
      deleteUserFailed({
        isFailed: true,
        message: error.message || fallbackMessage,
        loader: false,
      }),
    );
  }
}

export default all([
  takeLatest(LIST_USER, listUsersAll),
  takeLatest(CREATE_USER, createUser),
  takeLatest(DELETE_USER, deleteUser),
  takeLatest(UPDATE_USER, updateUser),
  takeLatest(GET_USER_BY_ID, getUserByIdSaga),
]);
