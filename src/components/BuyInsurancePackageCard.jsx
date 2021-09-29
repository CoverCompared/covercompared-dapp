import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DiscountCard from './common/Discount';

const BuyInsurancePackageCard = (props) => {
  const history = useHistory();
  const { account } = useWeb3React();
  const { img, packName, ProviderName, priceRange, startPrice, discount } = props;

  const handleClick = () => {
    if (!account) {
      toast.warning('You need to login in advance!');
    }
  };

  return (
    <>
      <div
        onClick={() => history.push('/product/cover')}
        className="w-full bg-white shadow-md py-4 pl-4 pr-8 rounded-xl flex justify-between items-center mb-4 relative cursor-pointer dark:bg-featureCard-dark-bg"
      >
        <DiscountCard {...props} discountPercentage={discount} />
        <div className="flex justify-between items-center h-full">
          <div className="w-20 h-20 rounded-xl bg-gray-200">
            <img src={img} className="h-full w-full rounded-xl" alt={packName} />
          </div>
          <div className="ml-6 mr-10">
            <div className="font-Montserrat text-h6 font-semibold text-dark-blue leading-4 dark:text-white">
              {packName}
            </div>
            <div className="font-Montserrat text-body-xs font-light text-dark-blue dark:text-white">
              {ProviderName}
            </div>
            <div className="font-Montserrat text-body-xs font-semibold text-dark-blue dark:text-white mt-1">
              Some <br /> Information
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div className="mr-14">
            <div className="font-Montserrat text-body-xs font-light text-dark-blue dark:text-white text-left">
              Price Range
            </div>
            <div className="font-Montserrat text-19 font-semibold text-dark-blue dark:text-white text-left">
              {priceRange}$
            </div>
          </div>
          <div>
            <div className="font-Montserrat text-body-xs font-light text-dark-blue dark:text-white text-left">
              Start From
            </div>
            <div className="font-Montserrat text-19 font-semibold text-dark-blue dark:text-white text-left">
              ${startPrice}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Link to="facebook.com">
            <button
              type="button"
              className="ml-3 font-Montserrat inline-flex items-center px-7 py-4 shadow-sm text-sm leading-4 font-semibold rounded-xl text-login-button-text bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-buy-button-gd-1 hover:to-buy-button-gd-2 duration-200 hover:text-white"
              onClick={handleClick}
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default BuyInsurancePackageCard;
