import React, { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import SidebarMobile from './components/SidebarMobile';
import Header from './components/Header';
import Footer from './components/Footer';
import { classNames } from '../functions/utils';
import Loading from '../components/common/Loading';

const LazyLoading = () => (
  <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-900">
    <Loading />
  </div>
);

const WithSidebar = (props) => {
  const { children } = props;
  const {
    props: { title, subtitle, bgImg, mobileBgImg, bgImgClass },
  } = children;

  return (
    <div className="min-h-screen flex bg-body-bg dark:bg-body-dark-bg font-Roboto">
      <Sidebar {...props} />
      <SidebarMobile {...props} />
      <div className="sm:ml-0 lg:ml-56 flex-1 mx-auto w-full flex flex-col">
        <Header {...props} {...{ title, subtitle }} />
        <main
          className={classNames(
            subtitle ? 'lg:mt-36 md:mt-16 mt-14' : 'lg:mt-24 md:mt-16 mt-14',
            `flex-1 relative focus:outline-none ${mobileBgImg} ${bgImg} ${bgImgClass}`,
          )}
        >
          <div className="min-h-full-9 md:min-h-full-3">
            <Suspense fallback={<LazyLoading />}>
              <div className="py-6 md:px-10 px-6">{children}</div>
            </Suspense>
          </div>
          <Footer {...props} />
        </main>
      </div>
    </div>
  );
};

export default WithSidebar;
