import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import WithSidebar from '../layouts/WithSidebar';
import WithoutSidebar from '../layouts/WithoutSidebar';

const PublicRoute = (props) => {
  const { component, withSidebar, ...rest } = props;

  useEffect(() => {
    console.log(`Hi I'm mounted> page`);
    return () => {
      console.log(`Hi I'm un-mounted> page`);
    };
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
