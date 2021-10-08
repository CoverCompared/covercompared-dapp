import React from 'react';
import ReactDOM from 'react-dom';

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';

// imports for redux
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './redux/store';

// imports for context provider
import { ThemeProvider } from './themeContext';

// imports for reportWebVitals
import reportWebVitals from './reportWebVitals';

// imports for component and styles
import App from './App';
import './index.css';
import { NetworkContextName } from './config';
import getLibrary from './utils/getLibrary';

export const { persistor, store } = configureStore();

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (!window.ethereum) {
  window.ethereum = {
    isMetaMask: true,
    on: (...args) => {},
    removeListener: (...args) => {},
    autoRefreshOnNetworkChange: false,
  };
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
