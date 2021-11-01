import { connectRouter } from 'connected-react-router';
import AppReducer from './AppReducer';
import Auth from './Auth';
import CoverList from './CoverList';
import DeviceInsurance from './DeviceInsurance';
import EligibilityChecker from './EligibilityChecker';
import MsoInsurance from './MsoInsurance';
import User from './User';
import UserProfile from './UserProfile';

export default (history) => ({
  router: connectRouter(history),
  app: AppReducer,
  auth: Auth,
  coverList: CoverList,
  deviceInsurance: DeviceInsurance,
  eligibilityChecker: EligibilityChecker,
  msoInsurance: MsoInsurance,
  user: User,
  userProfile: UserProfile,
});
