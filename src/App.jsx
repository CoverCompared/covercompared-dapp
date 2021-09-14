import React, { Suspense, useEffect } from 'react';
import uniqid from 'uniqid';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './components/common/Loading';
import routes from './routes';
import PublicRoute from './routes/PublicRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const LazyLoading = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <Loading />
  </div>
);

const App = (props) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LazyLoading />}>
        <Switch>
          {routes.map((m) => (
            <PublicRoute key={uniqid()} {...m} />
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
