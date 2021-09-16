import MetamaskIcon from '../assets/img/metamask.svg';
import LedgerIcon from '../assets/img/ledger.svg';

const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: 'injected',
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
    icon: MetamaskIcon,
  },
  WALLET_CONNECT: {
    connector: 'walletconnect',
    name: 'Wallet Connect',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    mobile: true,
    icon: LedgerIcon,
  },
};

export default SUPPORTED_WALLETS;
