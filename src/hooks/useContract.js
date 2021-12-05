import { useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import {
  getContract,
  getMSOContract,
  getP4LContract,
  getNexusMutualContract,
  getInsureAceContract,
} from '../utils/contractHelpers';
import erc20Abi from '../config/abi/erc20.json';

export const useMSOContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getMSOContract(library.getSigner()), [library]);
};

export const useP4LContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getP4LContract(library.getSigner()), [library]);
};

export const useTokenContract = (address) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getContract(erc20Abi, address, library.getSigner()), [library]);
};

export const useNexusMutualContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getNexusMutualContract(library.getSigner()), [library]);
};

export const useInsureAceContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getInsureAceContract(library.getSigner()), [library]);
};
