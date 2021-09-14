import React, { useContext } from 'react';
import InsuranceCards from '../InsuranceCards';
import ThemeToggleSwitch from '../ThemeToggleSwitch';
import BuyInsuranceIcon from '../../assets/img/buy-insurance-icon.svg';
import LoginIcon from '../../assets/img/Login.svg';
import BuyIcon from '../../assets/icons/buy.svg';
import BuyWhiteIcon from '../../assets/dark-icons/Buy.svg';
import Login from '../Login';
import Modal from './Modal';
import { ThemeContext } from '../../themeContext';

const InsuranceGrid = (props) => (
  <div className="grid grid-cols-2 gap-4 xl:gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
    <InsuranceCards {...props} />
  </div>
);

const HeaderCTAs = (props) => {
  const { theme } = useContext(ThemeContext);
  const { showBuyButton } = props;
  return (
    <div className="flex items-center">
      <ThemeToggleSwitch />
      {showBuyButton && (
        <Modal
          title="Buy Insurance"
          sizeClass="max-w-4xl"
          renderComponent={<InsuranceGrid {...props} />}
        >
          <button
            type="button"
            className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-buyInsurance text-body-md leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2"
          >
            <img src={BuyInsuranceIcon} alt="Buy Insurance" className="mr-2" />
            Buy Insurance
          </button>
        </Modal>
      )}
      <button
        type="button"
        className="ml-3 flex justify-center items-center p-2 rounded-xl bg-white dark:bg-featureCard-dark-bg shadow-lg"
      >
        <img src={theme === 'light' ? BuyIcon : BuyWhiteIcon} alt="Login" className="w-6 h-6" />
      </button>
      <Modal title="Log In" renderComponent={<Login {...props} bgImg="loginPopupBg" />}>
        <button
          type="button"
          className="ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-sm text-body-md leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
        >
          <img src={LoginIcon} alt="Login" className="mr-1" />
          Log In
        </button>
      </Modal>
    </div>
  );
};

export default HeaderCTAs;
