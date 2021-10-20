import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { walletLogin } from './useAuth';
import { connectorLocalStorageKey } from '../config/connectors';

const useEagerConnect = () => {
  // const { login } = useAuth();
  const { account, activate } = useWeb3React();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId && !account) {
      walletLogin(connectorId, activate);
    }
  }, []);
};

export default useEagerConnect;
