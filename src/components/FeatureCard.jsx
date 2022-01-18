import React from 'react';

const FeatureCard = ({ icon, title, body }) => {
  return (
    <div className="w-full shadow-md md:rounded-3xl rounded-xl flex flex-col items-center bg-white md:p-6 px-4 py-6 dark:bg-featureCard-dark-bg col-span-2 sm:col-span-1">
      <div className="p-2 bg-feature-icon-bg rounded-2xl dark:bg-feature-icon-dark-bg">
        <img loading="lazy" src={icon} alt={title} className="md:w-10 w-8" />
      </div>
      <h5 className="mt-4 font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-h6 dark:text-white">
        {title}
      </h5>
      <p className="mt-2 font-Inter text-post-body-text text-body-md leading-6 dark:text-subtitle-dark-text">
        {body}
      </p>
    </div>
  );
};

export default FeatureCard;
