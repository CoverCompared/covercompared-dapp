import addresses from '../config/contracts';
import tokens from '../config/tokens';

export const getAddress = (address) => {
  const chainId = process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID : 1;
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
}

export const getMSOAddress = () => {
  return getAddress(addresses.mso);
}

export const getCrvAddress = () => {
  return getAddress(tokens.crv);
}

export const getExchangeAgentAddress = () => {
  return getAddress(addresses.exchangeAgent);
}
