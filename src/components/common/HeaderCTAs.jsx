import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import SwapComponent from './SwapCurrency';

import ThemeToggleSwitch from '../ThemeToggleSwitch';
import LoginIcon from '../../assets/img/Login.svg';
import { shortenAddress } from '../../utils';
import { walletLogout } from '../../hooks/useAuth';
import { logoutUser } from '../../redux/actions/Auth';
import { setLoginModalVisible } from '../../redux/actions';

const HeaderCTAs = (props) => {
  const { account, deactivate } = useWeb3React();
  // const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // logout();
    // walletLogout(deactivate);
    dispatch(logoutUser());
    // dispatch(setLoginModalVisible(false));
  };

  return (
    <div className="flex items-center">
      <ThemeToggleSwitch />
      <SwapComponent />
      {!account ? (
        <button
          type="button"
          onClick={() => dispatch(setLoginModalVisible(true))}
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img src={LoginIcon} alt="Login" className="mr-1" />
          Log In
        </button>
      ) : (
        <button
          type="button"
          onClick={handleLogout}
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img src={LoginIcon} alt="Login" className="mr-1" />
          {shortenAddress(account)}
        </button>
      )}
    </div>
  );
};

export default HeaderCTAs;
