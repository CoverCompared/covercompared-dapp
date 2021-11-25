export const SupportedChainId = {
  MAINNET: 1,
  RINKEBY: 4,
  KOVAN: 42,
};

export const chainIds = {
  ethereum: {
    mainnet: {
      chainId: 1,
      rpcUrls: ['https://mainnet.infura.io/v3/92a35c94033b48c6a8d248ac76e7650e'],
      explorer: 'https://etherscan.io/',
    },
    testnet: {
      chainId: 4,
      rpcUrls: ['https://rinkeby.infura.io/v3/92a35c94033b48c6a8d248ac76e7650e'],
      explorer: 'https://rinkeby.etherscan.io/',
    },
  },
  bsc: {
    mainnet: {
      chainId: 56,
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      explorer: 'https://bscscan.com/',
    },
    testnet: {
      chainId: 97,
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      explorer: 'https://testnet.bscscan.com/',
    },
  },
  polygon: {
    mainnet: {
      chainId: 137,
      rpcUrls: ['https://rpc-mainnet.matic.network'],
      explorer: 'https://polygonscan.com/',
    },
    testnet: {
      chainId: 80001,
      rpcUrls: ['https://rpc-mumbai.matic.today'],
      explorer: 'https://mumbai.polygonscan.com/',
    },
  },
  starkware: {
    mainnet: {
      chainId: null,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: null,
      rpcUrls: [''],
      explorer: '',
    },
  },
  arbitrum: {
    mainnet: {
      chainId: 200,
      rpcUrls: ['https://arbitrum.xdaichain.com/'],
      explorer: 'https://blockscout.com/xdai/arbitrum',
    },
    testnet: {
      chainId: 421611,
      rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
      explorer: 'https://rinkeby-explorer.arbitrum.io',
    },
  },
  avalanche: {
    mainnet: {
      chainId: 43114,
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      explorer: 'https://cchain.explorer.avax.network/',
    },
    testnet: {
      chainId: 43113,
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      explorer: 'https://cchain.explorer.avax-test.network',
    },
  },
  optimism: {
    mainnet: {
      chainId: 10,
      rpcUrls: ['https://mainnet.optimism.io/'],
      explorer: 'https://optimism.io',
    },
    testnet: {
      chainId: 69,
      rpcUrls: ['https://rinkeby.optimism.io/'],
      explorer: 'https://optimism.io',
    },
  },
  terra: {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
  thorchain: {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
  cex: {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
  fantom: {
    mainnet: {
      chainId: 250,
      rpcUrls: ['https://rpc.ftm.tools'],
      explorer: 'https://ftmscan.com',
    },
    testnet: {
      chainId: 4002,
      rpcUrls: ['https://rpc.testnet.fantom.network'],
      explorer: 'https://testnet.ftmscan.com/',
    },
  },
  xdai: {
    mainnet: {
      chainId: 100,
      rpcUrls: ['https://rpc.xdaichain.com'],
      explorer: 'https://forum.poa.network/c/xdai-chain',
    },
    testnet: {
      chainId: 200,
      rpcUrls: ['https://arbitrum.xdaichain.com/'],
      explorer: 'https://blockscout.com/xdai/arbitrum',
    },
  },
  solana: {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
  stablecoin: {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
  'multi-chain': {
    mainnet: {
      chainId: 56,
      rpcUrls: [],
      explorer: '',
    },
    testnet: {
      chainId: 97,
      rpcUrls: [],
      explorer: '',
    },
  },
};

export const ALL_SUPPORTED_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.RINKEBY];
