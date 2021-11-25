import { ethers } from 'ethers';

const POLLING_INTERVAL = 12000;

export default function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export const signMessage = async (provider, account, message) => {
  // if (window.EthereumChain) {
  //   const { signature } = await window.EthereumChain.ethSign(account, message)
  //   return signature
  // }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  // if (provider.provider?.wc) {
  //   const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
  //   const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
  //   return signature
  // }

  return provider.getSigner(account).signMessage(ethers.utils.arrayify(ethers.utils.keccak256(message)))
}
