import React from 'react';
import { Link } from 'react-router-dom';

const GetCVROnReview = () => {
  return (
    <>
      <Link to="submit-review">
        <div className="absolute md:top-5 top-6 right-0 w-36 sm:w-auto md:px-5 sm:py-3 px-2 py-1 bg-getCVRBg text-white font-Montserrat font-semibold sm:text-body-md text-body-3xs underline">
          Submit a review and get 500 CVR token
        </div>
      </Link>
    </>
  );
};
export default GetCVROnReview;
