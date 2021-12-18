import { ethers } from 'ethers';
import ethSimpleProvider from './providers';
// ABI
import erc20Abi from '../config/abi/erc20.json';
import msoAbi from '../config/abi/mso.json';
import p4lAbi from '../config/abi/p4l.json';
import CovercomaredAbi from '../config/abi/covercompared.json';
import AggregatorV3InterfaceABI from '../config/abi/aggregatorV3InterfaceABI.json';
import TwapPriceFeedAbi from '../config/abi/TwapPriceFeedAbi.json';
import exchaneAgentAbi from '../config/abi/exchaneAgentAbi.json';
import nexusMutualAbi from '../config/abi/nexusMutualAbi.json';
import insureAceAbi from '../config/abi/insureAceAbi.json';
import distributorAbi from '../config/abi/distributor.json';

export const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? ethSimpleProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (address, signer) => {
  return getContract(erc20Abi, address, signer);
};

export const getCovercomparedContract = (address, signer) => {
  return getContract(CovercomaredAbi, address, signer);
};

export const getMSOContract = (address, signer) => {
  return getContract(msoAbi, address, signer);
};

export const getP4LContract = (address, signer) => {
  return getContract(p4lAbi, address, signer);
};

export const getPriceFeedContract = (address, signer) => {
  // return getContract(AggregatorV3InterfaceABI, address, signer);
  return getContract(TwapPriceFeedAbi, address, signer);
};

export const getExchangeAgentContract = (address, signer) => {
  return getContract(exchaneAgentAbi, address, signer);
};

export const getNexusMutualContract = (address, signer) => {
  return getContract(nexusMutualAbi, address, signer);
};

export const getInsureAceContract = (address, signer) => {
  return getContract(insureAceAbi, address, signer);
};

export const getDistributorContract = (address, signer) => {
  return getContract(distributorAbi, address, signer);
};
