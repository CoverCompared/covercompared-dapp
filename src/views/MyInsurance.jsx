import React from 'react';
import { useHistory } from 'react-router';
import GetCVROnReview from '../components/GetCVROnReview';
import MobilePageTitle from '../components/common/MobilePageTitle';
import Modal from '../components/common/Modal';
import ClaimCards from '../components/ClaimCards';
import AdditionalDetails from '../components/AdditionalDetails';

const MyInsurance = (props) => {
  const history = useHistory();
  return (
    <>
      {/* <GetCVROnReview {...props} /> */}
      <MobilePageTitle title="My Insurance" />
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-8 dark:text-white">
        Lorem Ipsum dolor sit amet
      </div>
      <div className="md:pl-5 md:pr-24">
        <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 md:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
          <div className="flex items-center h-full w-full md:col-span-7 col-span-12">
            <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl bg-gray-200">
              <img
                src="https://via.placeholder.com/400x250.png"
                alt=""
                className="h-full w-full rounded-xl"
              />
            </div>
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white">
              Uniswap - Nsure Network
            </div>
          </div>
          <div className="flex md:justify-end items-center md:col-span-5 col-span-12">
            <button
              type="button"
              onClick={() => history.push('submit-review')}
              className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Submit Review
            </button>
            <Modal
              title="Additional Details"
              bgImg="md:bg-additionalDetailsBg bg-loginPopupMobileBg bg-100%"
              renderComponent={AdditionalDetails}
            >
              <button
                type="button"
                className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Additional Details
              </button>
            </Modal>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 pr-8 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
          <div className="flex items-center h-full md:col-span-6 col-span-12">
            <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl bg-gray-200">
              <img
                src="https://via.placeholder.com/400x250.png"
                alt=""
                className="h-full w-full rounded-xl"
              />
            </div>
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white">
              Uniswap - Nexus Mutual
            </div>
          </div>
          <div className="flex md:justify-end items-center md:col-span-6 col-span-12">
            <Modal
              title="Instruction"
              bgImg="md:bg-submitclaimBg bg-submitclaimPopupBg bg-cover"
              renderComponent={ClaimCards}
            >
              <button
                type="button"
                className="md:px-6 py-3 px-4 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Submit Claim
              </button>
            </Modal>
            <button
              type="button"
              className="md:px-7 px-5 py-3 bg-discount-apply-btn-bg text-white font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Reedem Claim
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyInsurance;
