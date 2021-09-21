import React from 'react';
import SidebarMobile from './components/SidebarMobile';
import HeaderNoSidebar from './components/HeaderNoSidebar';
import Footer from './components/Footer';

const WithoutSidebar = (props) => {
  const { children } = props;
  const {
    props: { title, showBuyButton, bgImg, mobileBgImg, bgImgClass },
  } = children;

  return (
    <div className="min-h-screen min-w-screen flex bg-body-bg dark:bg-body-dark-bg font-Inter">
      <SidebarMobile {...props} />
      <div className="flex-1 mx-auto w-full flex flex-col">
        <HeaderNoSidebar {...props} {...{ title, showBuyButton }} />
        <main
          className={`flex-1 relative focus:outline-none lg:mt-28 lg:pt-8 mt-16 md:bg-${bgImg} bg-${mobileBgImg} ${bgImgClass}`}
        >
          <div className="min-h-full-9 md:min-h-full-3">
            <div className="py-6 md:px-10 px-6">{children}</div>
          </div>
          <Footer {...props} />
        </main>
      </div>
    </div>
  );
};

export default WithoutSidebar;
