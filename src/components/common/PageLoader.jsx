import React from 'react';
import * as Spinner from 'react-spinkit';

const PageLoader = ({ text = '' }) => {
  return (
    <div className="flex items-center justify-center bg-white inset-0 opacity-80 rounded-lg absolute loader">
      <div className="flex flex-col items-center justify-center loader-content">
        <Spinner name="three-bounce" />
        <div className="text-base mt-1 loader-message">{text}</div>
      </div>
    </div>
  );
};

export default PageLoader;
