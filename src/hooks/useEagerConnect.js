import { useEffect } from 'react';
import useAuth from './useAuth';
import { connectorLocalStorageKey } from '../config/connectors';

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
