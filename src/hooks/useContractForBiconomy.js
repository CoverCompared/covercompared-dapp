import { useMemo } from 'react';
import useBiconomy from './useBiconomy';
import useAddress from './useAddress';
import {
  getMSOContract,
  getP4LContract,
  getNexusMutualContract,
  getInsureAceContract,
} from '../utils/contractHelpers';

export const useMSOContract = () => {
  const { account, biconomy } = useBiconomy();
  const { getMSOAddress } = useAddress();
  return useMemo(
    () => getMSOContract(getMSOAddress(), biconomy.getSignerByAddress(account)),
    [biconomy],
  );
};

export const useP4LContract = () => {
  const { account, biconomy } = useBiconomy();
  const { getP4LAddress } = useAddress();
  return useMemo(
    () => getP4LContract(getP4LAddress(), biconomy.getSignerByAddress(account)),
    [biconomy],
  );
};

export const useNexusMutualContract = () => {
  const { account, biconomy } = useBiconomy();
  const { getNexusMutualAddress } = useAddress();
  return useMemo(
    () => getNexusMutualContract(getNexusMutualAddress(), biconomy.getSignerByAddress(account)),
    [biconomy],
  );
};

export const useInsureAceContract = () => {
  const { account, biconomy } = useBiconomy();
  const { getInsureAceAddress } = useAddress();
  return useMemo(
    () => getInsureAceContract(getInsureAceAddress(), biconomy.getSignerByAddress(account)),
    [biconomy],
  );
};
