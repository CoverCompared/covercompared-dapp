import { connectRouter } from 'connected-react-router';
import AppReducer from './AppReducer';
import Auth from './Auth';
import CoverList from './CoverList';
import DeviceInsurance from './DeviceInsurance';
import User from './User';

export default (history) => ({
  router: connectRouter(history),
  app: AppReducer,
  auth: Auth,
  coverList: CoverList,
  deviceInsurance: DeviceInsurance,
  user: User,
});
