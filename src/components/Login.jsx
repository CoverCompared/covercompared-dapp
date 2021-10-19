import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { walletLogin } from '../hooks/useAuth';
// import GoogleIcon from '../assets/img/google.png';
import SUPPORTED_WALLETS from '../config/walletConfig';
import { setLoginModalVisible } from '../redux/actions';
import { getLoginDetails } from '../redux/actions/Auth';

const Login = () => {
  // const { login } = useAuth();
  const dispatch = useDispatch();

  const { account, activate } = useWeb3React();
  const [connectStatus, setConnectStatus] = useState(false);
  const [curWalletId, setCurWalletId] = useState('injected');

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    // login(connect);
    walletLogin(connect, activate);
  };

  useEffect(() => {
    if (connectStatus && account) {
      dispatch(getLoginDetails({ wallet_address: account }));
      setConnectStatus(false);
      dispatch(setLoginModalVisible(false));
    }
  }, [connectStatus, account]);

  function getWalletOption() {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      return (
        <div
          className="md:col-span-5 col-span-5 h-full"
          key={key}
          id={`connect-${key}`}
          onClick={() => {
            tryActivation(option.connector);
          }}
        >
          <div className="flex flex-col items-center md:justify-center h-full py-9 px-6 md:h-52 xl:h-54 w-full rounded-2xl bg-white shadow-md cursor-pointer dark:bg-wallet-dark-bg">
            <img src={option.icon} alt="Metamask" className="md:h-11 h-8 mx-auto" />
            <div className="text-dark-blue font-semibold font-Montserrat md:text-body-md text-body-xs md:mt-5 mt-4 dark:text-white">
              {connectStatus && curWalletId === option.connector ? 'Connecting...' : option.name}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex items-center justify-center w-full">
          <div className="grid grid-cols-10 md:col-start-1 md:gap-x-6 gap-x-5 w-full">
            {getWalletOption()}
          </div>
        </div>
        {/* <div className="flex flex-col items-end justify-center h-full w-full">
            <div className="flex flex-col items-end w-full">
              <div className="font-Montserrat text-h5 font-semibold text-dark-blue mb-6 text-center w-full dark:text-white">
                Log In with Email
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />
              <input
                type="email"
                placeholder="Password"
                name="email"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border-2 px-4 mb-4 border-contact-input-grey focus:border-black rounded-xl placeholder-contact-input-grey text-black font-semibold text-body-md focus:ring-0 dark:text-white dark:bg-product-input-bg-dark dark:focus:border-white dark:border-opacity-0"
              />

              <button
                type="button"
                className="hover:text-login-button-text text-black rounded-xl font-semibold text-body-md w-full h-12 border-none outline-none shadow-md active:shadow-none bg-login-button-bg  duration-200"
              >
                Log In
              </button>
              <div className="font-Montserrat text-sm font-medium text-dark-blue mb-6 text-center w-full my-4 dark:text-white">
                or log in with
              </div>
              <button
                type="button"
                className="hover:text-login-button-text text-black flex justify-center items-center rounded-xl font-semibold text-body-md w-full h-12 border-none outline-none bg-white shadow-md active:shadow-none focus:bg-login-button-bg hover:bg-login-button-bg duration-200"
              >
                <img src={GoogleIcon} alt="" className="mr-3" />
                Google
              </button>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default Login;
