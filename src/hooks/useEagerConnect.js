import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useAuth from './useAuth';
import { connectorLocalStorageKey } from '../config/connectors';

const useEagerConnect = () => {
  const { login } = useAuth();
  const { account } = useWeb3React();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
