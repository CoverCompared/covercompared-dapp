import React, { Fragment, useRef, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import uniqid from 'uniqid';
import { XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../components/common/Modal';
import Login from '../../components/Login';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import { toggleSidebar } from '../../redux/actions/AppActions';
import { classNames } from '../../functions/utils';
import { ThemeContext } from '../../themeContext';

import LoginIcon from '../../assets/img/Login.svg';
import coverComparedLogo from '../../assets/img/logo-final-light.svg';
import coverComparedDarkLogo from '../../assets/img/cover-compared-logo-dark.svg';
import { ReactComponent as HomeIcon } from '../../assets/img/home-icon.svg';
import { ReactComponent as MyInsuranceIcon } from '../../assets/img/dashboard-icon.svg';
import { ReactComponent as AboutUsIcon } from '../../assets/img/about-us-icon.svg';
import { ReactComponent as AboutTokenIcon } from '../../assets/img/about-token-icon.svg';
import { ReactComponent as ContactUsIcon } from '../../assets/img/contact-us-icon.svg';
import { ReactComponent as LearnMoreIcon } from '../../assets/img/learn-more-icon.svg';
import { ReactComponent as SubscribeIcon } from '../../assets/img/subscribe-icon.svg';
import { ReactComponent as PartnerIcon } from '../../assets/img/partner-icon.svg';
import 'react-perfect-scrollbar/dist/css/styles.css';

const nav = [
  { name: 'Home', to: '/', icon: HomeIcon },
  { name: 'My Insurances', to: '/my-insurance', icon: MyInsuranceIcon },
  { name: 'About Us', to: '/about-us', icon: AboutUsIcon },
  { name: 'About Token', to: '/about-token', icon: AboutTokenIcon },
  { name: 'Contact Us', to: '/contact-us', icon: ContactUsIcon },
  { name: 'Learn More', to: '/learn-more', icon: LearnMoreIcon },
  { name: 'Subscribe', to: '/subscribe', icon: SubscribeIcon },
  { name: 'Partners', to: '/partners', icon: PartnerIcon },
];

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.app);
  const { path } = props;
  const dialogRef = useRef(null);
  const navigation = nav.map((m) => ({ ...m, current: m.to === path }));
  const { theme } = useContext(ThemeContext);

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
                  className="h-10 w-auto"
                  src={theme === 'dark' ? coverComparedDarkLogo : coverComparedLogo}
                  alt="logo"
                />
              </Link>
              <ThemeToggleSwitch />
            </div>
            <div className="mt-6 flex-1 h-0 overflow-y-auto">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={uniqid()}
                    to={item.to}
                    className="flex items-center text-sm font-medium py-1"
                  >
                    <item.icon className={classNames(item.current ? 'active-svg' : '', 'mr-2')} />
                    <div
                      style={item.current ? { WebkitTextFillColor: 'transparent' } : {}}
                      className={classNames(
                        item.current
                          ? 'bg-clip-text bg-gradient-to-r from-primary-gd-1 to-primary-gd-2'
                          : 'text-menu-no-active',
                        'font-Montserrat font-semibold text-body-lg',
                      )}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="border-t-2 border-grey-300 mt-5 mb-6 w-full" />
              <div className="flex items-center mt-6">
                <Modal title="Log In" bgImg="bg-mobileLoginPopupBg bg-100%" renderComponent={Login}>
                  <button
                    type="button"
                    className="md:ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-sm md:text-body-md text-body-sm leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg"
                  >
                    <img src={LoginIcon} alt="Login" className="mr-1" />
                    Log In
                  </button>
                </Modal>
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
