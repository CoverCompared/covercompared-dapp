import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { PRODUCT_CHAIN } from '../config';
import Modal from './common/Modal';
import CountrySelector from './common/MsoCountrySelector';
import MSOAdditionalDetails from './MSOAddtionalDetails';

const MSOPlanCard = (props) => {
  const {
    country,
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
    // noOfSpouse,
    // noOfDependent,
    // mainMemberParents,
    // spouseParents,
    totalUsers,
    setIsModalOpen,
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
    // noOfSpouse,
    // noOfDependent,
    // mainMemberParents,
    // spouseParents,
    totalUsers,
  };

  const { account, chainId } = useWeb3React();
  const btnEl = useRef(null);

  const [addonServices, setAddonServices] = useState(false);
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);
  const [isInEligibilitlyCheck, setIsInEligibilityCheck] = useState(false);
  const toggleCheckbox = (e) => {
    e.stopPropagation();

    if (!addonServices) setMsoTotalPrice(+quote + +MSOAddOnService);
    else setMsoTotalPrice(+quote);

    setAddonServices(!addonServices);
  };

  useEffect(() => {
    if (isEligible && isInEligibilitlyCheck) {
      setIsInEligibilityCheck(false);
      btnEl.current.click();
    }
  }, [isEligible, isInEligibilitlyCheck]);

  const validate = () => {
    if (!account) {
      toast.warning('You need to login in advance!');
      return false;
    }
    if (chainId !== PRODUCT_CHAIN.mso) {
      toast.warning('You need to switch over to correct network!');
      return false;
    }
    return true;
  };

  const handleBuy = () => {
    if (!validate()) return;
    if (setIsModalOpen) {
      setIsModalOpen(true);
      setIsInEligibilityCheck(true);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-featureCard-dark-bg cursor-pointer rounded-xl pb-6 md:col-span-6 lg:col-span-4 col-span-12  border-2 border-opacity-0 dark:hover:border-white hover:border-primary-gd-1  flex flex-col justify-between">
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
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 focus:shadow-0"
              checked={addonServices}
              onClick={toggleCheckbox}
              onChange={() => {}}
            />
            <div className="ml-2 font-Montserrat font-semibold text-body-2xs text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </div>
          </label>
          <div
            className="text-center font-bold font-Montserrat text-body-md bg-gradient-to-r from-planPrice-1 to-planPrice-2 bg-clip-text fill-transparent my-5"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            <Modal
              title="Policy Details"
              sizeClass="max-w-3xl"
              bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
              renderComponent={MSOAdditionalDetails}
              {...{
                country,
                selectedPlan,
                addonServices,
                isEligible,
                handleBuy,
                validateX: validate,
                name,
                quote,
                MSOAddOnService,
                type,
                MSOCoverUser,
                EHR,
                logo,
              }}
            >
              Read More
            </Modal>
          </div>
          <div className="flex justify-center pt-2">
            {isEligible ? (
              <Modal
                title="Members Information Form"
                sizeClass="max-w-6xl"
                renderComponent={CountrySelector}
                bgImg="bg-loginPopupBg"
                validate={validate}
                {...{ selectedPlan, addonServices, country }}
              >
                <button
                  type="button"
                  className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2  focus:outline-none focus:ring-0 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
                  ref={btnEl}
                >
                  Buy Now
                </button>
              </Modal>
            ) : (
              <button
                type="button"
                onClick={handleBuy}
                className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2  focus:outline-none focus:ring-0 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MSOPlanCard;
