import React, { useState } from 'react';

import Modal from './common/Modal';
import CountrySelector from './common/MsoCountrySelector';
import MSOAdditionalDetails from './MSOAddtionalDetails';

const MSOPlanCard = (props) => {
  const {
    isEligible,
    InsurancePlanType,
    MSOPlanDuration,
    name,
    quote,
    MSOAddOnService,
    type,
    MSOCoverUser,
    EHR,
    logo,
    unique_id,
    userTypeOptions,
    noOfSpouse,
    noOfDependent,
    mainMemberParents,
    spouseParents,
    totalUsers,
  } = props;

  const selectedPlan = {
    InsurancePlanType,
    MSOPlanDuration,
    name,
    quote,
    MSOAddOnService,
    type,
    MSOCoverUser,
    EHR,
    logo,
    unique_id,
    userTypeOptions,
    noOfSpouse,
    noOfDependent,
    mainMemberParents,
    spouseParents,
    totalUsers,
  };

  const [addonServices, setAddonServices] = useState(false);
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);

  const toggleCheckbox = (e) => {
    e.stopPropagation();

    if (!addonServices) setMsoTotalPrice(+quote + +MSOAddOnService);
    else setMsoTotalPrice(+quote);

    setAddonServices(!addonServices);
  };

  const BuyButton = () => {
    return (
      <Modal
        title="Members Information Form"
        sizeClass="max-w-6xl"
        renderComponent={CountrySelector}
        bgImg="bg-loginPopupBg"
        {...{ selectedPlan, addonServices }}
      >
        <div className="flex justify-center pt-2">
          <button
            type="button"
            disabled={!isEligible}
            className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2  focus:outline-none focus:ring-0 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
          >
            Buy Now
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-featureCard-dark-bg cursor-pointer rounded-xl pb-6 md:col-span-6 lg:col-span-3 col-span-12  border-2 border-opacity-0 dark:hover:border-white hover:border-primary-gd-1  flex flex-col justify-between">
        <div>
          <div className="w-full rounded-xl bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 font-semibold font-Montserrat text-white text-h6 mb-7">
            <div className="bg-MSOCardBg bg-cover py-6 px-4 h-full w-full flex justify-center">
              {name}
            </div>
          </div>
          <div
            className="text-center font-bold font-Montserrat text-body-md bg-gradient-to-r from-planPrice-1 to-planPrice-2 bg-clip-text fill-transparent mb-4"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            ${msoTotalPrice}/ year
          </div>
          <ul className="font-Montserrat font-medium text-body-xs text-dark-blue dark:text-white pr-4 pl-7 list-disc">
            <li className="mb-1.5">{type}</li>
            <li className="mb-1.5">{EHR}</li>
            <li className="mb-1.5">{MSOCoverUser}</li>
          </ul>
        </div>
        <div className="px-2 mt-4 text-center">
          <label className="cursor-pointer flex justify-center">
            <input
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
              checked={addonServices}
              onClick={toggleCheckbox}
              onChange={() => {}}
            />
            <div className="ml-2 font-Montserrat font-semibold text-body-2xs text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </div>
          </label>
          <Modal
            title="Policy Details"
            sizeClass="max-w-3xl"
            bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
            renderComponent={MSOAdditionalDetails}
            {...{
              name,
              quote,
              MSOAddOnService,
              type,
              MSOCoverUser,
              EHR,
              logo,
              BuyButton,
            }}
          >
            <div
              className="text-center font-bold font-Montserrat text-body-md bg-gradient-to-r from-planPrice-1 to-planPrice-2 bg-clip-text fill-transparent my-5"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              Read More
            </div>
          </Modal>

          <BuyButton />
        </div>
      </div>
    </>
  );
};

export default MSOPlanCard;
