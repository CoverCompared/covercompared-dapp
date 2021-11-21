import React from 'react';
import uniqid from 'uniqid';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BigNumber from 'bignumber.js';
import routes from './routes';
// import useEagerDisconnect from './hooks/useEagerDisconnect';
import SVGGradients from './components/common/SVGGradients';
import PublicRoute from './routes/PublicRoute';
import PreRenderedModals from './components/PreRenderedModals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App = (props) => {
  // useEagerDisconnect();
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SVGGradients />
      <PreRenderedModals />
      <Switch>
        {routes.map((m) => (
          <PublicRoute key={uniqid()} {...m} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
