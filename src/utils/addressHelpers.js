import addresses from '../config/contracts';

export const getAddress = (address) => {
  const chainId = process.env.CHAIN_ID ? process.env.CHAIN_ID : 42;
  return address[chainId] ? address[chainId] : address[1];
};

export const getCoverComparedAddress = () => {
  return getAddress(addresses.coverCompared);
};

export const getPriceFeedAddressBySymbol = (symbol) => {
  return getAddress(addresses.priceFeed[`${symbol}`]);
};
