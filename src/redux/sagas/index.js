import { all } from 'redux-saga/effects';
import Auth from './Auth';
import CoverList from './CoverList';
import User from './User';

export default function* rootSaga(getState) {
  yield all([Auth, CoverList, User]);
}
