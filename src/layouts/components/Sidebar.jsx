import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import TelegramIcon from '../../assets/img/telegram.svg';
import InstagramIcon from '../../assets/img/instagram.svg';
import LinkdinIcon from '../../assets/img/linkedin.svg';
import GithubIcon from '../../assets/img/github.svg';
import GitbookIcon from '../../assets/img/gitbook.svg';
import TwitterIcon from '../../assets/img/twitter.svg';
import SideBarMailIcon from '../../assets/img/side-bar-mail-icon.svg';
import HomeIconActive from '../../assets/active-nav-icons/home-icon.svg';
import MyInsuranceIconActive from '../../assets/active-nav-icons/my-insurance.svg';
import AboutUsIconActive from '../../assets/active-nav-icons/about-us.svg';
import AboutTokenIconActive from '../../assets/active-nav-icons/Ticket Star.svg';
import ContactUsIconActive from '../../assets/active-nav-icons/Message.svg';
import SubscribeIconActive from '../../assets/active-nav-icons/Notification.svg';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeContext } from '../../themeContext';

const socialMedia = [
  { href: 'https://google.com', name: 'Telegram', icon: TelegramIcon },
  { href: 'https://google.com', name: 'Twitter', icon: TwitterIcon },
  { href: 'https://google.com', name: 'Instagram', icon: InstagramIcon },
  { href: 'https://google.com', name: 'Linkdin', icon: LinkdinIcon },
  { href: 'https://google.com', name: 'Github', icon: GithubIcon },
  { href: 'https://google.com', name: 'Gitbook', icon: GitbookIcon },
];

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

const Sidebar = (props) => {
  const { path } = props;
  const navigation = nav.map((m) => ({ ...m, current: m.to === path }));
  const { theme } = useContext(ThemeContext);

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 min-h-screen ">
      <div className="w-72 flex flex-col fixed z-10 bg-sidebar-grey-bg dark:bg-sidebar-dark-bg">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="border-r border-gray-200 flex flex-col h-screen overflow-hidden">
          <div className="flex-shrink-0 px-4 py-6 flex items-center justify-center">
            <Link to="/">
              <img
                className="h-16"
                src={theme === 'dark' ? coverComparedDarkLogo : coverComparedLogo}
                alt="Workflow"
              />
            </Link>
          </div>

          <PerfectScrollbar>
            <div className="px-4">
              <div className="mt-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
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
                        loading="eager"
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
              </div>

              <div className="mt-8 flex flex-col items-center">
                <div className="flex justify-center mb-2">
                  {socialMedia.map((item) => (
                    <a key={uniqid()} href={item.href}>
                      <div className="rounded-full h-5 w-5 hover:bg-bluegradient flex items-center justify-center mx-1.5">
                        <img src={item.icon} alt={item.name} className="h-4" />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex flex-col items-center bg-sidebar-bg w-full py-3 px-4 rounded-lg text-white">
                  <img src={SideBarMailIcon} alt="Mail" className="h-20" />
                  <p className="text-center text-body-md font-Inter font-medium">
                    Get Over 500 CVR Tokens when you sign up!
                  </p>
                  <p className="text-center text-body-md font-Inter font-medium">
                    Click here for more details!
                  </p>
                  <button
                    type="button"
                    className="font-Montserrat mt-2 px-8 py-4 border border-transparent shadow-sm text-lg font-semibold rounded-2xl text-sidebar-bg bg-white focus:outline-none focus:ring-0"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
