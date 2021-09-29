import MetamaskIcon from '../assets/img/metamask.svg';
import WalletConnectIcon from '../assets/img/walletconnect-logo.svg';

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
    icon: WalletConnectIcon,
  },
};

export default SUPPORTED_WALLETS;
