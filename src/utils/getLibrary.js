import { ethers } from 'ethers';

const POLLING_INTERVAL = 12000;

export default function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
