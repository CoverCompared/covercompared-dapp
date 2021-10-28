import { all } from 'redux-saga/effects';
import Auth from './Auth';
import CoverList from './CoverList';
import DeviceInsurance from './DeviceInsurance';
import MsoInsurance from './MsoInsurance';
import User from './User';

export default function* rootSaga(getState) {
  yield all([Auth, CoverList, DeviceInsurance, MsoInsurance, User]);
}
