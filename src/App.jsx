import React, { Suspense } from 'react';
import uniqid from 'uniqid';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
import PublicRoute from './routes/PublicRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = (props) => {
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
      <Switch>
        {routes.map((m) => (
          <PublicRoute key={uniqid()} {...m} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
