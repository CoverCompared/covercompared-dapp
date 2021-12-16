import React from 'react';
import ReactDOM from 'react-dom';

import { Web3ReactProvider } from '@web3-react/core';
import { MoralisProvider } from 'react-moralis';
// imports for redux
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore, { history } from './redux/store';
// import ApplicationUpdater from './utils/updater';

// imports for context provider
import { ThemeProvider } from './themeContext';

// imports for reportWebVitals
import reportWebVitals from './reportWebVitals';

// imports for component and styles
import App from './App';
import './index.css';
// import { NetworkContextName } from './config';
import getLibrary from './utils/getLibrary';
import { MORALIS_ID, SERVER_URL } from './config';

export const { persistor, store } = configureStore();

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (!window.ethereum) {
  window.ethereum = {
    isMetaMask: true,
    on: (...args) => {},
    request: (...args) => {},
    removeListener: (...args) => {},
    autoRefreshOnNetworkChange: true,
  };
}

if (!window.web3) {
  window.web3 = {};
}

if (!window.EthereumChain) {
  window.EthereumChain = {
    ethSign: (address, message) => {},
  };
}

// function Updaters() {
//   return (
//     <>
//       <ApplicationUpdater />
//     </>
//   );
// }

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <MoralisProvider appId={MORALIS_ID} serverUrl={SERVER_URL}>
              <ThemeProvider>
                {/* <Updaters /> */}
                <App />
              </ThemeProvider>
            </MoralisProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
