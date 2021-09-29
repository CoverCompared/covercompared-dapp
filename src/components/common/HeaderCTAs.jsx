import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';

import ThemeToggleSwitch from '../ThemeToggleSwitch';
import LoginIcon from '../../assets/img/Login.svg';
import Login from '../Login';
import Modal from './Modal';
import { shortenAddress } from '../../utils';
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../redux/actions/Auth';

const HeaderCTAs = (props) => {
  const { account } = useWeb3React();
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center">
      <ThemeToggleSwitch />
      {!account ? (
        <Modal title="Log In" bgImg="bg-loginPopupBg" renderComponent={Login}>
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
          >
            <img src={LoginIcon} alt="Login" className="mr-1" />
            Log In
          </button>
        </Modal>
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
