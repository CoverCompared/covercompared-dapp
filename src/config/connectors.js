import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from './chains';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}

export const ConnectorNames = {
  Injected: 'injected',
  WalletConnect: 'walletconnect',
};

export const connectorLocalStorageKey = 'connectorIdPolcacover';

export const NETWORK_URLS = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
};

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
});

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};
