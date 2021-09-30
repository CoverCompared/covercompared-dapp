import React from 'react';

const MSOServicesCard = (props) => {
  const { image, title, description } = props;

  return (
    <div className="w-full shadow-md md:rounded-3xl rounded-xl flex flex-col items-center bg-white px-4 py-6 dark:bg-featureCard-dark-bg col-span-12 sm:col-span-1 md:col-span-4">
      <div className="p-2 bg-primary-gd-1 rounded-2xl dark:bg-feature-icon-dark-bg">
        <img src={image} alt={title} className="md:w-10 w-8" />
      </div>
      <h5 className="mt-4 h-12 font-Montserrat font-semiBold text-dark-blue font-semibold md:text-h5 text-h6 dark:text-white text-center">
        {title}
      </h5>
      <div className="mt-3">
        {description.map((p) => (
          <div className="mt-1.5 font-Inter text-post-body-text text-body-md leading-6 dark:text-subtitle-dark-text text-center">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MSOServicesCard;
