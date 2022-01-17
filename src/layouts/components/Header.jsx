import React from 'react';
import HeaderCTAs from '../../components/common/HeaderCTAs';
import HeaderMobile from './HeaderMobile';

const Header = (props) => {
  const { title, subtitle } = props;

  return (
    <>
      <HeaderMobile {...props} />
      <div
        style={{ width: 'calc(100% - 14rem)' }}
        className={`hidden lg:flex lg:flex-shrink-0 bg-body-bg dark:bg-body-dark-bg pt-7 fixed z-20  ${
          !subtitle && 'pb-4'
        }`}
      >
        <div className="flex flex-1 justify-between px-10 pb-3">
          <div className="flex-1 flex flex-col">
            <h2 className="font-Montserrat text-h2 font-semibold dark:text-white">{title}</h2>
            {/* {subtitle && (
              <p className="text-header-lead-text font-normal font-Roboto text-sm dark:text-subtitle-dark-text">
                {subtitle}
              </p>
            )} */}
          </div>
          <div className="ml-4 flex items-start md:ml-6">
            <HeaderCTAs {...props} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
