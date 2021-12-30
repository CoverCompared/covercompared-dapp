import { all } from 'redux-saga/effects';
import App from './App';
import Auth from './Auth';
import CoverList from './CoverList';
import DeviceInsurance from './DeviceInsurance';
import EligibilityChecker from './EligibilityChecker';
import MsoInsurance from './MsoInsurance';
import User from './User';
import UserProfile from './UserProfile';

export default function* rootSaga(getState) {
  yield all([
    App,
    Auth,
    CoverList,
    DeviceInsurance,
    EligibilityChecker,
    MsoInsurance,
    User,
    UserProfile,
  ]);
}
