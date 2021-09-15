import React, { Fragment, useRef, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import uniqid from 'uniqid';
import { XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../../components/common/Modal';
import BuyInsuranceIcon from '../../assets/img/buy-insurance-icon.svg';
import LoginIcon from '../../assets/img/Login.svg';
import InsuranceCards from '../../components/InsuranceCards';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import Login from '../../components/Login';
import { toggleSidebar } from '../../redux/actions/AppActions';
import { classNames } from '../../functions/utils';
import coverComparedLogo from '../../assets/img/cover-compared-logo.svg';
import coverComparedDarkLogo from '../../assets/img/cover-compared-logo-dark.svg';
import HomeIcon from '../../assets/img/home-icon.svg';
import MyInsuranceIcon from '../../assets/img/dashboard-icon.svg';
import AboutUsIcon from '../../assets/img/about-us-icon.svg';
import AboutTokenIcon from '../../assets/img/about-token-icon.svg';
import ContactUsIcon from '../../assets/img/contact-us-icon.svg';
import LearnMoreIcon from '../../assets/img/learn-more-icon.svg';
import SubscribeIcon from '../../assets/img/subscribe-icon.svg';
import PartnerIcon from '../../assets/img/partner-icon.svg';
import HomeIconActive from '../../assets/active-nav-icons/home-icon.svg';
import MyInsuranceIconActive from '../../assets/active-nav-icons/my-insurance.svg';
import AboutUsIconActive from '../../assets/active-nav-icons/about-us.svg';
import AboutTokenIconActive from '../../assets/active-nav-icons/Ticket Star.svg';
import ContactUsIconActive from '../../assets/active-nav-icons/Message.svg';
import SubscribeIconActive from '../../assets/active-nav-icons/Notification.svg';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeContext } from '../../themeContext';

const nav = [
  { name: 'Home', to: '/', icon: HomeIcon, activeIcon: HomeIconActive },
  {
    name: 'My Insurances',
    to: '/my-insurance',
    icon: MyInsuranceIcon,
    activeIcon: MyInsuranceIconActive,
  },
  { name: 'About Us', to: '/about-us', icon: AboutUsIcon, activeIcon: AboutUsIconActive },
  {
    name: 'About Token',
    to: '/about-token',
    icon: AboutTokenIcon,
    activeIcon: AboutTokenIconActive,
  },
  { name: 'Contact Us', to: '/contact-us', icon: ContactUsIcon, activeIcon: ContactUsIconActive },
  { name: 'Learn More', to: '/learn-more', icon: LearnMoreIcon, activeIcon: AboutTokenIconActive },
  { name: 'Subscribe', to: '/subscribe', icon: SubscribeIcon, activeIcon: SubscribeIconActive },
  { name: 'Partners', to: '/partners', icon: PartnerIcon, activeIcon: PartnerIcon },
];

const InsuranceGrid = (props) => (
  <div className="grid grid-cols-2 gap-4 xl:gap-y-8 md:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
    <InsuranceCards {...props} />
  </div>
);

const Sidebar = (props) => {
  const { path, sidebarOpen } = props;
  const dialogRef = useRef(null);
  const navigation = nav.map((m) => ({ ...m, current: m.to === path }));
  const { theme } = useContext(ThemeContext);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 flex lg:hidden"
        onClose={() => props.toggleSidebar(false)}
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
                  onClick={() => props.toggleSidebar(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center justify-between">
              <Link to="/">
                <img
                  className="h-8 w-auto"
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
                    <img
                      src={item.current ? item.activeIcon : item.icon}
                      alt={item.name}
                      className="mr-2"
                    />
                    <div
                      style={item.current ? { WebkitTextFillColor: 'transparent' } : {}}
                      className={classNames(
                        item.current
                          ? 'bg-clip-text bg-gradient-to-r from-primary-gd-1 to-primary-gd-2'
                          : 'text-menu-no-active',
                        'font-Montserrat font-semibold text-body-md',
                      )}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="border-t-2 border-grey-300 mt-5 mb-6 w-full" />
              <div className="flex justify-between items-center mt-6">
                <Modal
                  title="Buy Insurance"
                  sizeClass="max-w-4xl"
                  renderComponent={<InsuranceGrid {...props} />}
                >
                  <button
                    type="button"
                    className="md:ml-3 font-Montserrat inline-flex items-center px-4 py-3 shadow-buyInsurance md:text-body-md text-body-sm leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2"
                  >
                    <img src={BuyInsuranceIcon} alt="Buy Insurance" className="mr-2" />
                    Buy Insurance
                  </button>
                </Modal>
                <Modal
                  title="Log In"
                  bgImg="bg-loginPopupBg"
                  renderComponent={<Login {...props} />}
                >
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

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);
