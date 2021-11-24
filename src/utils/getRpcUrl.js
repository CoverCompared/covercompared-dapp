import sample from 'lodash/sample';
import { NETWORK_URLS } from '../config/connectors';

// Array of available nodes to connect to
export const nodes = [NETWORK_URLS[process.env.REACT_APP_CHAIN_ID ? parseInt(process.env.REACT_APP_CHAIN_ID, 10) : 1]];

const getNodeUrl = () => {
  return sample(nodes);
}

export default getNodeUrl;
