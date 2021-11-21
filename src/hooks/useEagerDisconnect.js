import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import useAuth from './useAuth';

const useEagerDisconnect = () => {
  const { account } = useWeb3React();
  const { logout } = useAuth();
  const { message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (account && message === 'Unauthorized') {
      logout();
    }
  }, [message]);
};

export default useEagerDisconnect;
