import addresses from '../config/contracts';
import tokens from '../config/tokens';
import { APP_CHAIN_ID } from '../config';

export const getAddress = (address) => {
  const chainId = APP_CHAIN_ID || 1;
  // const chainId = '42';
  return address[chainId] ? address[chainId] : address[1];
};

export const getCoverComparedAddress = () => {
  return getAddress(addresses.coverCompared);
};

export const getPriceFeedAddressBySymbol = (symbol) => {
  return getAddress(addresses.priceFeed[`${symbol}`]);
};

export const getP4LAddress = () => {
  return getAddress(addresses.p4l);
};

export const getMSOAddress = () => {
  return getAddress(addresses.mso);
};

export const getCvrAddress = () => {
  return getAddress(tokens.cvr);
};

export const getCvrAddressByChainId = (chainId) => {
  return tokens.cvr[`${chainId}`];
};

export const getExchangeAgentAddress = () => {
  return getAddress(addresses.exchangeAgent);
};

export const getNexusMutualAddress = () => {
  return getAddress(addresses.nexusMutual);
};

export const getDistributorAddress = () => {
  return addresses.distributor[42];
};

export const getInsureAceAddress = () => {
  return getAddress(addresses.insureAce);
};
