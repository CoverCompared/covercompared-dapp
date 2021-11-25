import { BIG_TEN } from '../utils/bigNumber';

export const BASE_SCAN_URLS = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
};

export const NetworkContextName = 'NETWORK';

export const BASE_URL = 'https://polkacover.finance';

export const BASE_SCAN_URL = BASE_SCAN_URLS[42];
export const DEFAULT_GAS_LIMIT = 3000000;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
