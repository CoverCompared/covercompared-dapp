import React from 'react';
import ReactDOM from 'react-dom';

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

export const { persistor, store } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
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
