import { BASE_URL, APP_CHAIN_ID } from '../config';

export const setupNetwork = async (_chainId) => {
  const provider = window.ethereum;
  if (provider) {
    // const chainId = APP_CHAIN_ID
    //   ? parseInt(APP_CHAIN_ID, 10)
    //   : 1;
    const chainId = _chainId ? parseInt(_chainId, 10) : parseInt(APP_CHAIN_ID, 10);
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  } else {
    console.error("Can't setup network on metamask because window.ethereum is undefined");
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  });

  return tokenAdded;
};
