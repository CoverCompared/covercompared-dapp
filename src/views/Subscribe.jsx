import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  return (
    <>
      <div className="md:px-28">
        <div className="md:rounded-2xl rounded-3xl bg-gradient-to-r from-global-banner-gd-1 to-global-banner-gd-2">
          <div className="md:px-20 px-6 md:py-12 py-10 bg-subscribeBannerBg bg-no-repeat bg-100%">
            <div className="text-center px-10 text-white font-Montserrat font-extrabold md:text-h1 text-h2">
              DONT MISS THIS !!
            </div>
            <div className="text-center px-10 md:px-0 m-0.5 md:mb-7 mb-10 text-white font-Montserrat md:text-body-lg text-body-md md:leading-5">
              Enter your mail to get project update.
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={email}
                placeholder="Enter Email Here"
                onChange={(e) => setEmail(e.target.value)}
                className="md:h-12 h-11 md:w-2/5 w-4/5 broder-2 border-white md:rounded-lg rounded-xl font-medium px-4 py-2.5 outline-none bg-transparent focus:outline-none focus:ring-0 placeholder-white focus:border-login-button-bg text-white font-Montserrat text-body-sm"
              />
              <button
                type="button"
                className="outline-none md:h-12 h-11 py-0.75 px-5 md:px-12 bg-white text-primary-gd-1 font-Montserrat font-semibold md:rounded-lg rounded-xl ml-2.5 text-body-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subscribe;
