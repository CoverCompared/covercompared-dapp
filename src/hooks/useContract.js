import { useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import useAddress from './useAddress';
import {
  getContract,
  getMSOContract,
  getP4LContract,
  getPriceFeedContract,
  getExchangeAgentContract,
  getNexusMutualContract,
  getInsureAceContract,
  getDistributorContract,
} from '../utils/contractHelpers';
import erc20Abi from '../config/abi/erc20.json';

export const useMSOContract = () => {
  const { library } = useActiveWeb3React();
  const { getMSOAddress } = useAddress();
  return useMemo(() => getMSOContract(getMSOAddress(), library.getSigner()), [library]);
};

export const useP4LContract = () => {
  const { library } = useActiveWeb3React();
  const { getP4LAddress } = useAddress();
  return useMemo(() => getP4LContract(getP4LAddress(), library.getSigner()), [library]);
};

export const useTokenContract = (address) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getContract(erc20Abi, address, library.getSigner()), [library]);
};

export const usePriceFeedContract = (symbol) => {
  const { library } = useActiveWeb3React();
  const { getPriceFeedAddressBySymbol } = useAddress();
  return useMemo(
    () => getPriceFeedContract(getPriceFeedAddressBySymbol(symbol), library.getSigner()),
    [library],
  );
};

export const useExchangeAgentContract = () => {
  const { library } = useActiveWeb3React();
  const { getExchangeAgentAddress } = useAddress();
  return useMemo(
    () => getExchangeAgentContract(getExchangeAgentAddress(), library.getSigner()),
    [library],
  );
};

export const useNexusMutualContract = () => {
  const { library } = useActiveWeb3React();
  const { getNexusMutualAddress } = useAddress();
  return useMemo(
    () => getNexusMutualContract(getNexusMutualAddress(), library.getSigner()),
    [library],
  );
};

export const useInsureAceContract = () => {
  const { library } = useActiveWeb3React();
  const { getInsureAceAddress } = useAddress();
  return useMemo(() => getInsureAceContract(getInsureAceAddress(), library.getSigner()), [library]);
};

export const useDistributorContract = () => {
  const { library } = useActiveWeb3React();
  const { getDistributorAddress } = useAddress();
  return useMemo(
    () => getDistributorContract(getDistributorAddress(), library.getSigner()),
    [library],
  );
};
