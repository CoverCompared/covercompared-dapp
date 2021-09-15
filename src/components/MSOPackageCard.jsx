import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DiscountCard from './common/SmallPackageCard';
import { setCurrentProduct } from '../redux/actions/AppActions';

const MSOPackageCard = (props) => {
  const history = useHistory();
  const {
    InsurancePlanType,
    MSOplanName,
    MSOPrice,
    MSOAddOnService,
    MSOPlanType,
    MSOPlanDuration,
    MSOCoverUser,
    EHR,
  } = props;

  const handleCardClick = () => {
    props.setCurrentProduct(props);
    history.push('/mso-product');
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-4 md:pl-4 md:pr-8 px-4 rounded-xl mb-4 grid grid-cols-12 gap-x-1 relative cursor-pointer"
      >
        <div className="md:col-span-4 col-span-7 flex items-center h-full">
          <div className="md:w-20 md:h-20 w-16 h-16 rounded-xl bg-gray-200">
            {/* <img src={img} className="h-full w-full rounded-xl" alt={name} /> */}
          </div>
          <div className="md:ml-6 ml-2">
            <div className="font-Montserrat md:text-h6 text-body-sm font-semibold text-dark-blue mb-1 leading-4 dark:text-white group-hover:text-white">
              {MSOplanName}
            </div>
            <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white mb-2">
              {MSOPlanType}
            </div>
            <div className="hidden md:block font-Montserrat text-body-xs font-semibold text-dark-blue dark:text-white group-hover:text-white">
              {EHR}
            </div>
          </div>
        </div>
        <div className="md:col-span-4 col-span-0 hidden md:flex flex-col justify-center font-Montserrat text-body-md text-dark-blue dark:text-white mr-5 my-4 md:my-0 group-hover:text-white">
          <div>
            Add on concierge service{' '}
            <span className="font-semibold text-h6">{MSOAddOnService}</span>
          </div>
          <div className="font-semibold mt-2">
            {MSOCoverUser
              ? MSOCoverUser.length > 50
                ? `${MSOCoverUser.slice(0, 50)}. . .`
                : MSOCoverUser
              : ''}
          </div>
        </div>
        <div className="col-span-5 md:col-span-4 flex items-center justify-end">
          <div className="mr-16 hidden md:block">
            <div className="font-Montserrat text-body-xs text-dark-blue dark:text-white group-hover:text-white">
              Price
            </div>
            <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
              {MSOPrice}
            </div>
          </div>
          <Link to="facebook.com">
            <button
              type="button"
              className="ml-3 font-Montserrat md:flex items-center md:px-5 md:py-4 py-1.5 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg hover:bg-white duration-200"
            >
              Add to Cart
              <div className="md:hidden font-Montserrat md:text-h4 text-body-sm font-semibold leading-4 mt-1 text-login-button-text hover:bg-white">
                {MSOPrice}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default connect(null, { setCurrentProduct })(MSOPackageCard);
