import { useEffect, useState, useRef, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Biconomy } from '@biconomy/mexa';
import { simpleRpcProvider } from '../utils/providers';
import { BICONOMY_API_KEY, APP_CHAIN_ID } from '../config';
/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useBiconomy = () => {
  const { library, chainId, ...web3React } = useWeb3React();

  const biconomy = useMemo(() => {
    return new Biconomy(library || simpleRpcProvider, {
      apiKey: BICONOMY_API_KEY[chainId],
      debug: true,
    });
  }, [library]);
  const provider = useMemo(() => {
    return new ethers.providers.Web3Provider(biconomy);
  }, [biconomy]);

  return {
    library: provider,
    biconomy,
    chainId: chainId ?? parseInt(APP_CHAIN_ID, 10),
    ...web3React,
  };
};

export default useBiconomy;
