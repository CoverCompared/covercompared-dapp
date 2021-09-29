let env;
let baseURL;
const productionHostname = 'covercompared.polkacover.com';
const stagingHostname = 'staging-covercompared.polkacover.com';

if (window.location.hostname === productionHostname) {
  env = 'production';
  baseURL = 'https://covercompared.polkacover.com/api';
} else if (window.location.hostname === stagingHostname) {
  env = 'staging';
  baseURL = 'https://staging-covercompared.polkacover.com/api';
} else {
  env = 'local';
  // baseURL = 'http://localhost:3006/api';
  baseURL = 'https://staging-covercompared.polkacover.com/api';
}

export const ENV = env;
export const API_BASE_URL = baseURL;
