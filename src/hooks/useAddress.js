import { useWeb3React } from '@web3-react/core';
import { useMemo, useCallback } from 'react';
import addresses from '../config/contracts';
import tokens from '../config/tokens';

const useAddress = () => {
  const { library, chainId } = useWeb3React();
  const getAddress = (address) => {
    return address[chainId] ? address[chainId] : address[1];
  };
  const getMSOAddress = useCallback(() => getAddress(addresses.mso), [library, chainId]);
  const getP4LAddress = useCallback(() => getAddress(addresses.p4l), [library, chainId]);
  const getExchangeAgentAddress = useCallback(
    () => getAddress(addresses.exchangeAgent),
    [library, chainId],
  );
  const getNexusMutualAddress = useCallback(
    () => getAddress(addresses.nexusMutual),
    [library, chainId],
  );
  const getInsureAceAddress = useCallback(
    () => getAddress(addresses.insureAce),
    [library, chainId],
  );
  const getCoverComparedAddress = useCallback(
    () => getAddress(addresses.coverCompared),
    [library, chainId],
  );
  const getPriceFeedAddressBySymbol = useCallback(
    (symbol) => getAddress(addresses.priceFeed[`${symbol}`]),
    [library, chainId],
  );
  const getCvrAddress = useCallback(() => getAddress(tokens.cvr), [library, chainId]);

  const getTokenAddress = useCallback((symbol) => getAddress(tokens[symbol]), [library, chainId]);

  const getDistributorAddress = useCallback(
    () => getAddress(addresses.distributor),
    [library, chainId],
  );

  const getClaimAddress = useCallback(() => getAddress(addresses.claims), [library, chainId]);

  const getClaimRewardAddress = useCallback(
    () => getAddress(addresses.claimsReward),
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
    getCvrAddress,
    getTokenAddress,
    getDistributorAddress,
    getClaimAddress,
    getClaimRewardAddress,
  };
};

export default useAddress;
