import { BIG_TEN } from '../utils/bigNumber';

export const BASE_SCAN_URLS = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
  42: 'https://kovan.etherscan.io',
};

export const NetworkContextName = 'NETWORK';

export const BASE_URL = 'https://polkacover.finance';

export const BASE_SCAN_URL = BASE_SCAN_URLS[42];
export const DEFAULT_GAS_LIMIT = 3000000;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);

export const MSO_PLAN_TYPE = {
  BASIC_PLAN: 1,
  SILVER_PLAN: 2,
  GOLD_PLAN: 3,
  PLATINUM_PLAN: 4,
};

export const MORALIS_API_KEY = 'XnOD4AuQqplP3ioRL3WlSSLesYTVduIy7KjNs2NQBC4XM4ezTL3XEu1cncph0CpP';
export const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2/';
export const MORALIS_ID = 'rRG8PaL5SjENUXSdbo1q198qGwt7yA1U74iUY1WW';
export const SERVER_URL = 'https://hcufrn0eqoj1.usemoralis.com:2053/server';

export const BICONOMY_API_KEY = {
  4: 'TfBMzaWNW.fc5afe00-0108-40e3-8fe5-a1110594ca8d',
  42: 'hmIyM_AsF.ce90fe45-efc4-4bcf-87e2-a49863d8219c',
};
