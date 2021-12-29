import { all, put, takeLatest } from 'redux-saga/effects';
import { SET_PENDING_TRANSACTION } from '../constants/ActionTypes';
import { setPendingTransactionSuccess } from '../actions/AppActions';

function* initialTx({ payload }) {
  if (payload && window.localStorage.getItem('tx_log')) window.localStorage.removeItem('tx_log');
  return yield put(setPendingTransactionSuccess(payload));
}

export default all([takeLatest(SET_PENDING_TRANSACTION, initialTx)]);
