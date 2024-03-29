import React, { Fragment, useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import { Dialog, Transition } from '@headlessui/react';
import uniqid from 'uniqid';
import { XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import { toggleSidebar } from '../../redux/actions/AppActions';
import { logoutUser } from '../../redux/actions/Auth';
import { walletLogout } from '../../hooks/useAuth';
import { shortenAddress } from '../../utils';
import { classNames } from '../../functions/utils';
import { ThemeContext } from '../../themeContext';
import getNav from '../../components/common/sidebarNav';
import { setLoginModalVisible, setRegisterModalVisible } from '../../redux/actions';

import LoginIcon from '../../assets/img/Login.svg';
import coverComparedLogo from '../../assets/img/logo-final-light.png';
import coverComparedDarkLogo from '../../assets/img/cover-compared-logo-dark.png';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { account, deactivate, library } = useWeb3React();
  const { sidebarOpen } = useSelector((state) => state.app);
  const { is_verified } = useSelector((state) => state.auth);
  const history = useHistory();
  const dialogRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const navigation = getNav();

  const handleLogout = () => {
    walletLogout(deactivate);
    dispatch(logoutUser());
    dispatch(setLoginModalVisible(false));
  };
  const handleLogin = () => {
    dispatch(setLoginModalVisible(true));
    dispatch(setRegisterModalVisible(true));
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        unmount
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
        onClose={() => dispatch(toggleSidebar(false))}
        initialFocus={dialogRef}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-xs w-full bg-white dark:bg-sidebar-dark-bg pt-5 pb-4 flex-1 flex flex-col px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  ref={dialogRef}
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-0"
                  onClick={() => dispatch(toggleSidebar(false))}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center justify-between">
              <Link to="/">
                <img
                  className="h-14 w-auto"
                  src={theme === 'dark' ? coverComparedDarkLogo : coverComparedLogo}
                  alt="logo"
                />
              </Link>
              <ThemeToggleSwitch />
            </div>
            <div className="mt-6 flex-1 h-0 overflow-y-auto">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <button
                    type="button"
                    key={uniqid()}
                    onClick={() =>
                      item.authProtected && !account && !is_verified
                        ? handleLogin()
                        : history.push(item.to)
                    }
                    className="flex items-center text-sm font-medium py-1.5"
                  >
                    <item.icon className={classNames(item.current ? 'active-svg' : '', 'mr-2')} />
                    <div
                      style={item.current ? { WebkitTextFillColor: 'transparent' } : {}}
                      className={classNames(
                        item.current
                          ? 'bg-clip-text bg-gradient-to-r from-primary-gd-1 to-primary-gd-2'
                          : 'text-menu-no-active',
                        'font-Montserrat font-semibold text-h6',
                      )}
                    >
                      {item.name}
                    </div>
                  </button>
                ))}
              </nav>
              <div className="border-t-2 border-grey-300 mt-5 mb-6 w-full" />
              <div className="flex items-center mt-6">
                {!account ? (
                  <button
                    type="button"
                    onClick={() => dispatch(setLoginModalVisible(true))}
                    className="md:ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-sm md:text-body-md text-body-sm leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
                  >
                    <img loading="lazy" src={LoginIcon} alt="Login" className="mr-1" />
                    Log In
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="md:ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-sm md:text-body-md text-body-sm leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
                  >
                    <img loading="lazy" src={LoginIcon} alt="Login" className="mr-1" />
                    {shortenAddress(account)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapStateToProps = ({ app }) => ({
  sidebarOpen: app.sidebarOpen,
});

export default Sidebar;
