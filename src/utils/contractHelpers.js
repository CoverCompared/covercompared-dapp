import { ethers } from 'ethers';
import Web3 from 'web3';

// Addresses
import { getAddress, getCoverComparedAddress } from './addressHelpers';

// ABI
import erc20Abi from '../config/abi/erc20.json';
import CovercomaredAbi from '../config/abi/covercompared.json';
import AggregatorV3InterfaceABI from '../config/abi/aggregatorV3InterfaceABI.json';

const web3 = new Web3("https://kovan.infura.io/v3/92a35c94033b48c6a8d248ac76e7650e");

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
 return new web3.eth.Contract(AggregatorV3InterfaceABI, address);
};
