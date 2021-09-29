import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import CartButton from './CartButton';
import InsuranceCards from '../InsuranceCards';
import SwapComponent from './SwapCurrency';
import ThemeToggleSwitch from '../ThemeToggleSwitch';
import BuyInsuranceIcon from '../../assets/img/buy-insurance-icon.svg';
import LoginIcon from '../../assets/img/Login.svg';
import BuyIcon from '../../assets/icons/buy.svg';
import BuyWhiteIcon from '../../assets/dark-icons/Buy.svg';
import Login from '../Login';
import Modal from './Modal';
import { ThemeContext } from '../../themeContext';
import { shortenAddress } from '../../utils';

const InsuranceGrid = (props) => (
  <div className="grid grid-cols-2 gap-4 xl:gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
    <InsuranceCards {...props} />
  </div>
);

const HeaderCTAs = (props) => {
  const { account } = useWeb3React();
  const history = useHistory();
  const { theme } = useContext(ThemeContext);
  const { showBuyButton } = props;
  return (
    <div className="flex items-center">
      {/* <SwapComponent /> */}
      <ThemeToggleSwitch />
      {/* {showBuyButton && (
        <Modal title="Buy Insurance" sizeClass="max-w-4xl" renderComponent={InsuranceGrid}>
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2"
          >
            <img src={BuyInsuranceIcon} alt="Buy Insurance" className="mr-2" />
            Buy Insurance
          </button>
        </Modal>
      )} */}
      <CartButton />
      <Modal title="Log In" bgImg="bg-loginPopupBg" renderComponent={Login}>
        <button
          type="button"
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-lg text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img src={LoginIcon} alt="Login" className="mr-1" />
          {account ? shortenAddress(account) : 'Log In'}
        </button>
      </Modal>
    </div>
  );
};

export default HeaderCTAs;
