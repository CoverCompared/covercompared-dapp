import React from 'react';
import { Route } from 'react-router-dom';
import WithSidebar from '../layouts/WithSidebar';
import WithoutSidebar from '../layouts/WithoutSidebar';

const PublicRoute = (props) => {
  const { component, withSidebar, ...rest } = props;

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
