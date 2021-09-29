import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderCTAs from '../../components/common/HeaderCTAs';
import coverComparedLogo from '../../assets/img/logo-final-light.svg';
import CoverCompareDarkLogo from '../../assets/img/cover-compared-logo-dark.svg';
import { ThemeContext } from '../../themeContext';
import HeaderMobile from './HeaderMobile';

const HeaderNoSidebar = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <HeaderMobile {...props} />
      <div className="z-30 flex-shrink-0 bg-white dark:bg-body-dark-bg pt-8 fixed w-full hidden lg:flex">
        <div className="flex-1 px-10">
          <div className="flex justify-between border-b border-light-gray-border pb-2">
            <Link to="/">
              <img
                className="h-16"
                src={theme === 'light' ? coverComparedLogo : CoverCompareDarkLogo}
                alt="Workflow"
              />
            </Link>
            <div className="ml-4 flex items-start md:ml-6">
              <HeaderCTAs {...props} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNoSidebar;
