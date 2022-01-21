import sample from 'lodash/sample';
import { NETWORK_URLS } from '../config/connectors';
import { APP_CHAIN_ID } from '../config';
// Array of available nodes to connect to
export const nodes = [NETWORK_URLS[APP_CHAIN_ID ? parseInt(APP_CHAIN_ID, 10) : 1]];

const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;
