import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import WithSidebar from '../layouts/WithSidebar';
import WithoutSidebar from '../layouts/WithoutSidebar';
import { walletLogin, walletLogout } from '../hooks/useAuth';
import { connectorLocalStorageKey } from '../config/connectors';

const PublicRoute = (props) => {
  const { component, withSidebar, ...rest } = props;
  const { account, activate, deactivate } = useWeb3React();

  useEffect(() => {
    console.log(`Hi I'm mounted> page`);
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId && !account) {
      walletLogin(connectorId, activate);
    }
  }, []);

  const renderComponentWithSidebarOrNot = (prop, C) => {
    if (withSidebar) {
      return (
        <WithSidebar {...props}>
          <C {...{ ...prop, ...rest }} />
        </WithSidebar>
      );
    }

    return (
      <WithoutSidebar {...props}>
        <C {...{ ...prop, ...rest }} />
      </WithoutSidebar>
    );
  };

  return <Route {...rest} render={(prop) => renderComponentWithSidebarOrNot(prop, component)} />;
};

export default PublicRoute;
