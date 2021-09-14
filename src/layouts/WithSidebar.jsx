import React from 'react';
import Sidebar from './components/Sidebar';
import SidebarMobile from './components/SidebarMobile';
import Header from './components/Header';
import Footer from './components/Footer';
import { classNames } from '../functions/utils';

const WithSidebar = (props) => {
  const { children } = props;
  const {
    props: { title, subtitle, showBuyButton, bgImg, mobileBgImg, bgImgClass },
  } = children;

  return (
    <div className="min-h-screen flex bg-body-bg dark:bg-body-dark-bg font-Inter">
      <Sidebar {...props} />
      <SidebarMobile {...props} />
      <div className="sm:ml-0 lg:ml-72 flex-1 mx-auto w-full flex flex-col">
        <Header {...props} {...{ title, subtitle, showBuyButton }} />
        <main
          className={classNames(
            subtitle ? 'md:mt-36 mt-14' : 'md:mt-24 mt-14',
            `flex-1 relative focus:outline-none bg-${mobileBgImg} md:bg-${bgImg} ${bgImgClass}`,
          )}
        >
          <div style={{ minHeight: 'calc(100% - 3rem)' }} className="hidden md:block">
            <div className="py-6 md:px-10 px-6">{children}</div>
          </div>
          <div style={{ minHeight: 'calc(100% - 9rem)' }} className="md:hidden">
            <div className="py-6 md:px-10 px-6">{children}</div>
          </div>
          <Footer {...props} />
        </main>
      </div>
    </div>
  );
};

export default WithSidebar;
