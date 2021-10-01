import { ethers } from 'ethers';
import Web3 from 'web3';

// Addresses
import { getAddress, getCoverComparedAddress } from './addressHelpers';

// ABI
import erc20Abi from '../config/abi/erc20.json';
import CovercomaredAbi from '../config/abi/covercompared.json';
import AggregatorV3InterfaceABI from '../config/abi/aggregatorV3InterfaceABI.json';
import { NETWORK_URLS } from '../config/connectors';

const chainId = parseInt(process.env.CHAIN_ID, 10);
const web3 = new Web3(NETWORK_URLS[chainId]);

const getContract = (abi, address, signer) => {
  const simpleRpcProvider = ethers.getDefaultProvider('kovan');
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (address, signer) => {
  return getContract(erc20Abi, address, signer);
};

export const getCovercomparedContract = (signer) => {
  return getContract(CovercomaredAbi, getCoverComparedAddress(), signer);
};

export const getPriceFeedContract = (address) => {
  // return new web3.eth.Contract(AggregatorV3InterfaceABI, address);
  return getContract(AggregatorV3InterfaceABI, address, null);
};
