import { ethers } from 'ethers';

// Addresses
import { getAddress, getCoverComparedAddress } from './addressHelpers';

// ABI
import erc20Abi from '../config/abi/erc20.json';
import CovercomaredAbi from '../config/abi/covercompared.json';

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
