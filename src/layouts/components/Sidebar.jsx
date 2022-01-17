import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useWeb3React } from '@web3-react/core';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { ThemeContext } from '../../themeContext';
import { classNames } from '../../functions/utils';
import getNav from '../../components/common/sidebarNav';
import { setLoginModalVisible, setRegisterModalVisible } from '../../redux/actions';
import { socialMediaLinks } from '../../functions/data';

import coverComparedLogo from '../../assets/img/logo-final-light.png';
import coverComparedDarkLogo from '../../assets/img/cover-compared-logo-dark.png';
import SideBarMailIcon from '../../assets/img/side-bar-mail-icon.svg';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Sidebar = (props) => {
  const navigation = getNav();
  const history = useHistory();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { is_verified } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!account) dispatch(setLoginModalVisible(true));
    if (!is_verified) dispatch(setRegisterModalVisible(true));
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 min-h-screen ">
      <div className="w-56 flex flex-col fixed z-10 bg-sidebar-grey-bg dark:bg-sidebar-dark-bg">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="border-r border-gray-200 flex flex-col h-screen overflow-hidden">
          <div className="flex-shrink-0 px-4 py-5 flex items-center justify-center">
            <Link to="/">
              <img
                className="h-20"
                src={theme === 'dark' ? coverComparedDarkLogo : coverComparedLogo}
                alt="Workflow"
              />
            </Link>
          </div>

          <PerfectScrollbar>
            <div className="px-4 pb-4">
              <div className="mt-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <button
                      type="button"
                      key={uniqid()}
                      onClick={() =>
                        item.authProtected && (!account || !is_verified)
                          ? handleLogin()
                          : history.push(item.to)
                      }
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
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <div className="flex justify-center mb-6">
                  {socialMediaLinks.map((item) => (
                    <a key={uniqid()} href={item.href} target="_blank" rel="noreferrer">
                      <div className="rounded-full h-5 w-5 hover:bg-bluegradient flex items-center justify-center mx-1.5">
                        <img loading="lazy" src={item.icon} alt={item.name} className="h-4" />
                      </div>
                    </a>
                  ))}
                </div>

                {process.env.SHOW_UPCOMING_FEATURES_TO_CONFIRM && (
                  <div className="flex flex-col items-center bg-sidebar-bg w-full py-3 px-4 rounded-lg text-white">
                    <img loading="lazy" src={SideBarMailIcon} alt="Mail" className="h-20" />
                    <p className="text-center text-body-md font-Roboto font-medium">
                      Get Over 500 CVR Tokens when you sign up!
                    </p>
                    <p className="text-center text-body-md font-Roboto font-medium">
                      Click here for more details!
                    </p>
                    <button
                      type="button"
                      className="font-Montserrat mt-2 px-5 py-3 border border-transparent shadow-sm text-md font-semibold rounded-xl text-sidebar-bg bg-white focus:outline-none focus:ring-0"
                    >
                      See Details
                    </button>
                  </div>
                )}

                <div className="mt-3">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="CoverCompared"
                    options={{ height: 400 }}
                  />
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
