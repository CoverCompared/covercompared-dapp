import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { useDispatch } from 'react-redux';
import { setupNetwork } from '../utils/wallet';
import { connectorLocalStorageKey, connectorsByName } from '../config/connectors';
import { getLoginDetails } from '../redux/actions';
// import { profileClear } from 'state/profile'

const useAuth = () => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorID) => {
      const connector = connectorsByName[connectorID];
      window.localStorage.setItem(connectorLocalStorageKey, connectorID);
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector;
                walletConnector.walletConnectProvider = null;
              }
              console.error('Authorization Error', 'Please authorize to access your account');
            } else {
              console.error(error.name, error.message);
            }
          }
        });

        if (account) {
          dispatch(getLoginDetails({ wallet_address: account }));
        }
      } else {
        console.error('Unable to find connector', 'The connector config is wrong');
      }
    },
    [activate, account],
  );

  const logout = useCallback(() => {
    deactivate();
    window.localStorage.removeItem(connectorLocalStorageKey);
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
  }, [deactivate, dispatch]);

  return { login, logout };
};

export const walletLogin = (connectorID, activate) => {
  const connector = connectorsByName[connectorID];
  window.localStorage.setItem(connectorLocalStorageKey, connectorID);
  if (connector) {
    activate(connector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        const hasSetup = await setupNetwork();
        if (hasSetup) {
          activate(connector);
        }
      } else {
        window.localStorage.removeItem(connectorLocalStorageKey);
        if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector;
            walletConnector.walletConnectProvider = null;
          }
          console.error('Authorization Error', 'Please authorize to access your account');
        } else {
          console.error(error.name, error.message);
        }
      }
    });

    // if (account) {
    //   dispatch(getLoginDetails({ wallet_address: account }));
    // }
  } else {
    console.error('Unable to find connector', 'The connector config is wrong');
  }
};

export const walletLogout = (deactivate) => {
  deactivate();
  window.localStorage.removeItem(connectorLocalStorageKey);
  if (window.localStorage.getItem('walletconnect')) {
    connectorsByName.walletconnect.close();
    connectorsByName.walletconnect.walletConnectProvider = null;
  }
};
export default useAuth;
