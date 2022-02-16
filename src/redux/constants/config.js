let env;
let baseURL;
const productionHostname = ['app.covercompared.com', 'covercompared.polkacover.com', 'covercompared.com'];
const stagingHostname = ['staging-covercompared.polkacover.com'];

if (productionHostname.includes(window.location.hostname)) {
  env = 'production';
  baseURL = `https://${window.location.hostname}/api`;
} else if (stagingHostname.includes(window.location.hostname)) {
  env = 'staging';
  baseURL = 'https://staging-covercompared.polkacover.com/api';
} else {
  env = 'local';
  // baseURL = 'http://localhost:3006/api';
  baseURL = 'https://staging-covercompared.polkacover.com/api';
  // baseURL = 'https://app.covercompared.com/api';
}

export const ENV = env;
export const API_BASE_URL = baseURL;
