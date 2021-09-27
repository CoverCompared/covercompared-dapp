import { ethers } from 'ethers';
import { simpleRpcProvider } from 'utils/providers';

// Addresses
import { getAddress, getCoverComparedAddress } from './addressHelpers';

// ABI
import erc20Abi from 'config/abi/erc20.json';
import CovercomaredAbi from 'config/abi/Cohort.json';

const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
}

export const getErc20Contract = (address, signer) => {
  return getContract(erc20Abi, address, signer);
}
export const getCovercomparedContract = (signer) => {
  return getContract(CovercomaredAbi, getCoverComparedAddress(), signer);
}
