import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

const ReviewCard = ({ name, image, rating, uploaded, description }) => {
  return (
    <>
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-300 mr-4">
              <img src={image} alt={name} className="h-full w-full rounded-full" />
            </div>
            <div>
              <div className="font-Inter text-h6 font-medium leading-tight dark:text-white">
                {name}
              </div>
              <div className="font-Inter text-body-xsm font-light leading-tight text-counter-card-text dark:text-subtitle-dark-text">
                {uploaded}
              </div>
            </div>
          </div>
          <div className="ml-2">
            <StarRatings
              rating={rating}
              starDimension="22px"
              starSpacing="0px"
              starEmptyColor="rgba(196, 196, 196, 1)"
              starRatedColor="rgba(254, 195, 45, 1)"
              svgIconPath="M21.8912 16.092C21.5459 16.4267 21.3872 16.9107 21.4659 17.3854L22.6512 23.9454C22.7512 24.5014 22.5165 25.064 22.0512 25.3854C21.5952 25.7187 20.9885 25.7587 20.4912 25.492L14.5859 22.412C14.3805 22.3027 14.1525 22.244 13.9192 22.2374H13.5579C13.4325 22.256 13.3099 22.296 13.1979 22.3574L7.29118 25.452C6.99918 25.5987 6.66852 25.6507 6.34452 25.5987C5.55518 25.4494 5.02852 24.6974 5.15785 23.904L6.34452 17.344C6.42318 16.8654 6.26452 16.3787 5.91918 16.0387L1.10452 11.372C0.70185 10.9814 0.56185 10.3947 0.74585 9.86536C0.924517 9.33736 1.38052 8.95203 1.93118 8.86536L8.55785 7.90403C9.06185 7.85203 9.50452 7.54536 9.73118 7.09203L12.6512 1.10536C12.7205 0.972031 12.8099 0.849365 12.9179 0.745365L13.0378 0.652031C13.1005 0.582698 13.1725 0.525365 13.2525 0.478698L13.3979 0.425365L13.6245 0.332031H14.1858C14.6872 0.384031 15.1285 0.684031 15.3592 1.13203L18.3179 7.09203C18.5312 7.52803 18.9459 7.8307 19.4245 7.90403L26.0512 8.86536C26.6112 8.94536 27.0792 9.33203 27.2645 9.86536C27.4392 10.4 27.2885 10.9867 26.8779 11.372L21.8912 16.092Z"
            />
          </div>
        </div>
        <div className="font-Inter text-body-md text-counter-card-text dark:text-subtitle-dark-text">
          {description}
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
