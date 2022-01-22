import React, { useState } from 'react';
import Modal from './common/Modal';
import CountrySelector from './common/MsoCountrySelector';
import WishingWell from '../assets/img/wishing-well-logo.png';
import WCD from '../assets/img/world-class-doctor-logo.png';

const MSOAdditionalDetails = (props) => {
  const {
    name,
    MSOCoverUser,
    logo,
    wantAddon,
    addOnQuote,
    selectedPlan,
    addonServices,
    isEligible,
    handleBuy,
    validateX,
  } = props;
  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-x-5 gap-y-2 mt-2 mb-4 md:divide-x-2">
          <div className="w-full flex flex-col items-center col-span-12 md:col-span-5 self-center md:pr-2">
            <img
              loading="lazy"
              src={WishingWell}
              alt=""
              className="w-auto h-28 p-3 dark:bg-white"
            />
          </div>
          <div className="w-full flex flex-col items-center col-span-12 md:col-span-7 self-center md:pl-7">
            <img loading="lazy" src={WCD} alt="" className="w-auto h-28 p-3 dark:bg-white" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-buy-button-gd-1 to-buy-button-gd-2 text-center text-white font-semibold mb-10">
          INTERNATIONAL MEDICAL SECOND OPINION
        </div>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* <div className="lg:col-span-4 md:col-span-5 col-span-11">
            <img
              loading="lazy"
              src={logo}
              className="w-full h-52 rounded-2xl md:block hidden"
              alt="Product"
            />
            <div className="md:hidden flex items-center">
              <img loading="lazy" src={logo} className="w-24 h-24 rounded-2xl" alt="Product" />
              <div className="font-Montserrat font-semibold text-dark-blue text-h5 dark:text-white ml-6 text-left">
                {name}
              </div>
            </div>
          </div> */}
          <div className="md:col-span-7 col-span-12 flex-col flex justify-center">
            <div className="font-Montserrat font-semibold text-dark-blue text-h5 dark:text-white hidden md:block ">
              {name}
            </div>
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mt-6 mb-2 dark:text-white text-left">
              Description
            </div>
            <div className="font-Inter text-counter-card-text text-body-xs leading-5 dark:text-subtitle-dark-text text-left">
              <div>{MSOCoverUser}</div>
              <div>EHR & Portal</div>
              <div>Plan Type: Annual</div>
              {wantAddon ? <div>Add on concierge services at {addOnQuote}$</div> : ''}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:mt-12 mt-6">
          <div className="lg:col-span-12 md:col-span-12 col-span-12">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white text-left">
              Additional Details
            </div>
            <div className="font-Inter text-counter-card-text text-body-xs leading-5 dark:text-subtitle-dark-text text-left">
              <div>
                International medical second opinion from World class doctor’s consortium of world
                class hospitals as per the list given earlier. (40 hospitals).
              </div>
              <div>Covering all major illnesses including critical illnesses</div>
              <div className="font-Montserrat font-semibold text-body-md text-dark-blue dark:text-white mb-2 mt-3">
                Features
              </div>
              <ul className="list-disc pl-6">
                <li>{MSOCoverUser}</li>
                <li>Maximum 2 consultations in a year.</li>
                <li>Call with consulting doctor possible within 30 days of MSO REPORT</li>
                <li>One year membership payable in 1 instalment</li>
                <li>8 weeks cooling period from the day of confirmation of order</li>
                <li>Turn around time – 10 days from receipt of medical records</li>
              </ul>
              <div className="font-Montserrat font-semibold text-body-md text-dark-blue dark:text-white mb-2 mt-4">
                Features EHR (Electronic Health Records)
              </div>
              <ul className="list-disc pl-6">
                <li>EHR with mobile app for entire family</li>
              </ul>
              <div className="font-Montserrat font-semibold text-body-md text-dark-blue dark:text-white mb-2 mt-4">
                Modalities of service
              </div>
              <ul className="list-disc pl-6">
                <li>Local service provider - Toll free number will be provided </li>
                <li>
                  Email:{' '}
                  <a className="underline cursor-pointer" href="mailto:support@wishingwellcorp.com">
                    support@wishingwellcorp.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-6">
          <div className="lg:col-span-12 md:col-span-12 col-span-12">
            <div className="font-Montserrat font-semibold text-body-md text-dark-blue mb-2 dark:text-white text-left">
              <a
                className="underline"
                target="_blank"
                href="https://covercompared-assets.s3.me-south-1.amazonaws.com/mso-covercompared-t-n-c.pdf"
                rel="noreferrer"
              >
                Term & Condition
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          {isEligible ? (
            <Modal
              title="Members Information Form"
              sizeClass="max-w-6xl"
              renderComponent={CountrySelector}
              validate={validateX}
              bgImg="bg-loginPopupBg"
              {...{ selectedPlan, addonServices }}
            >
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2  focus:outline-none focus:ring-0 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
                >
                  Buy Now
                </button>
              </div>
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
    </>
  );
};
export default MSOAdditionalDetails;
