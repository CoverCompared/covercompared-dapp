import React, { Suspense } from 'react';
import SidebarMobile from './components/SidebarMobile';
import HeaderNoSidebar from './components/HeaderNoSidebar';
import Footer from './components/Footer';
import Loading from '../components/common/Loading';

const LazyLoading = () => (
  <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-900">
    <Loading />
  </div>
);

const WithoutSidebar = (props) => {
  const { children } = props;
  const {
    props: { title, bgImg, mobileBgImg, bgImgClass },
  } = children;

  return (
    <div className="min-h-screen min-w-screen flex bg-body-bg dark:bg-body-dark-bg font-Inter">
      <SidebarMobile {...props} />
      <div className="flex-1 mx-auto w-full flex flex-col">
        <HeaderNoSidebar {...props} {...{ title }} />
        <main
          className={`flex-1 relative focus:outline-none lg:mt-28 lg:pt-8 mt-16 ${bgImg} ${mobileBgImg} ${bgImgClass}`}
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

export default WithoutSidebar;
