import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../redux/actions/AppActions';
import coverComparedLogo from '../../assets/img/cover-compared-logo.svg';
import coverComparedWhiteLogo from '../../assets/img/cover-compared-logo-dark.svg';
import BuyIcon from '../../assets/icons/buy.svg';
import BuyWhiteIcon from '../../assets/dark-icons/Buy.svg';
import { ThemeContext } from '../../themeContext';

const HeaderMobile = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative">
      <div className="absolute w-full inset-y-0 right-0 top-8 px-4 flex items-center justify-between sm:pr-6 lg:hidden">
        <Link to="/">
          <img
            className="h-8 w-auto"
            src={theme === 'light' ? coverComparedLogo : coverComparedWhiteLogo}
            alt="logo"
          />
        </Link>
        <div className="flex justify-end items-center">
          <button
            type="button"
            className="mr-2 flex justify-center items-center p-2 rounded-xl bg-white dark:bg-featureCard-dark-bg shadow-lg"
          >
            <img src={theme === 'light' ? BuyIcon : BuyWhiteIcon} alt="Login" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-0"
            onClick={() => props.toggleSidebar(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuAlt2Icon className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { toggleSidebar })(HeaderMobile);
