import { useWeb3React } from '@web3-react/core';
import { useMemo, useCallback } from 'react';
import addresses from '../config/contracts';
import tokens from '../config/tokens';

const useAddress = () => {
  const { library, chainId } = useWeb3React();
  const getAddress = (address) => {
    return address[chainId] ? address[chainId] : address[1];
  };
  const getMSOAddress = useCallback(async () => getAddress(addresses.mso), [library, chainId]);
  const getP4LAddress = useCallback(async () => getAddress(addresses.p4l), [library, chainId]);
  const getExchangeAgentAddress = useCallback(
    async () => getAddress(addresses.exchangeAgent),
    [library, chainId],
  );
  const getNexusMutualAddress = useCallback(
    async () => getAddress(addresses.nexusMutual),
    [library, chainId],
  );
  const getInsureAceAddress = useCallback(
    async () => getAddress(addresses.insureAce),
    [library, chainId],
  );
  const getCoverComparedAddress = useCallback(
    async () => getAddress(addresses.coverCompared),
    [library, chainId],
  );
  const getPriceFeedAddressBySymbol = useCallback(
    async (symbol) => getAddress(addresses.priceFeed[`${symbol}`]),
    [library, chainId],
  );
  const getCrvAddress = useCallback(async () => getAddress(tokens.crv), [library, chainId]);

  const getDistributorAddress = useCallback(
    async () => getAddress(addresses.distributor),
    [library, chainId],
  );

  return {
    getMSOAddress,
    getP4LAddress,
    getExchangeAgentAddress,
    getNexusMutualAddress,
    getInsureAceAddress,
    getCoverComparedAddress,
    getPriceFeedAddressBySymbol,
    getCrvAddress,
    getDistributorAddress,
  };
};

export default useAddress;
