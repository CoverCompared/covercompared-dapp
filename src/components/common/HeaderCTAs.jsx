import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import CartButton from './CartButton';
import InsuranceCards from '../InsuranceCards';
import ThemeToggleSwitch from '../ThemeToggleSwitch';
import BuyInsuranceIcon from '../../assets/img/buy-insurance-icon.svg';
import LoginIcon from '../../assets/img/Login.svg';
import Login from '../Login';
import Modal from './Modal';
import { shortenAddress } from '../../utils';
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../redux/actions/Auth';
import { emptyCart } from '../../redux/actions/AppActions';

const InsuranceGrid = (props) => (
  <div className="grid grid-cols-2 gap-4 xl:gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
    <InsuranceCards {...props} />
  </div>
);

const HeaderCTAs = (props) => {
  const { showBuyButton } = props;
  const { account } = useWeb3React();
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
    dispatch(emptyCart());
  };

  return (
    <div className="flex items-center">
      <ThemeToggleSwitch />
      {showBuyButton && (
        <Modal title="Buy Insurance" sizeClass="max-w-4xl" renderComponent={InsuranceGrid}>
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2"
          >
            <img src={BuyInsuranceIcon} alt="Buy Insurance" className="mr-2" />
            Buy Insurance
          </button>
        </Modal>
      )}
      <CartButton />
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
