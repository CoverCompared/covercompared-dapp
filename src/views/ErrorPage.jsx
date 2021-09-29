import React, { useState } from 'react';
import ErrorImg from '../assets/img/404.svg';

const ErrorPage = (props) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <img src={ErrorImg} alt="404" />
        <div className="text-dark-blue font-Montserrat text-h2 font-bold mt-12 mb-2 dark:text-white text-center">
          Whoops... this page is not available
        </div>
        <div className="font-Inter text-body-sm text-post-body-text dark:text-subtitle-dark-text text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis nisi.
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
