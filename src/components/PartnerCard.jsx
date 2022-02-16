import React from 'react';
import { Link } from 'react-router-dom';

const PartnerCard = ({ img, partnerName, description, ctaLink }) => {
  return (
    <a
      href={ctaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 rounded-2xl shadow-md bg-white dark:bg-featureCard-dark-bg"
    >
      <div className="flex justify-center items-center lg:h-24 lg:w-24 md:h-14 md:w-24 h-12 w-16 mx-auto">
        <img
          loading="lazy"
          src={img}
          alt={partnerName}
          className="lg:max-h-20 md:max-h-14 max-h-12 object-fill"
        />
      </div>
      <div className="text-dark-blue font-Montserrat font-semibold text-center md:my-5 my-3 font-h6 dark:text-white">
        {partnerName}
      </div>
      <div className="text-dark-blue font-Inter font-body-sm leading-6 text-center my-5 font-h6 dark:text-subtitle-dark-text">
        {description}
      </div>
    </a>
  );
};
export default PartnerCard;
