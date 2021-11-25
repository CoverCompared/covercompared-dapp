import { ethers } from 'ethers';
// Addresses
import { getCoverComparedAddress, getExchangeAgentAddress, getMSOAddress, getP4LAddress } from './addressHelpers';
import ethSimpleProvider from './providers';
// ABI
import erc20Abi from '../config/abi/erc20.json';
import msoAbi from '../config/abi/mso.json';
import p4lAbi from '../config/abi/p4l.json';
import CovercomaredAbi from '../config/abi/covercompared.json';
import AggregatorV3InterfaceABI from '../config/abi/aggregatorV3InterfaceABI.json';
import exchaneAgentAbi from '../config/abi/exchaneAgentAbi.json';

export const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? ethSimpleProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (address, signer) => {
  return getContract(erc20Abi, address, signer);
};

export const getCovercomparedContract = (signer) => {
  return getContract(CovercomaredAbi, getCoverComparedAddress(), signer);
};

export const getMSOContract = (signer) => {
  return getContract(msoAbi, getMSOAddress(), signer);
}

export const getP4LContract = (signer) => {
  return getContract(p4lAbi, getP4LAddress(), signer);
}

export const getPriceFeedContract = (address) => {
  return getContract(AggregatorV3InterfaceABI, address, null);
};

export const getExchangeAgentContract = () => {
  return getContract(exchaneAgentAbi, getExchangeAgentAddress(), null);
}
