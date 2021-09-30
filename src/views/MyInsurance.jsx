import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import GetCVROnReview from '../components/GetCVROnReview';
import MobilePageTitle from '../components/common/MobilePageTitle';
import Modal from '../components/common/Modal';
import ClaimCards from '../components/ClaimCards';
import AdditionalDetails from '../components/AdditionalDetails';
import { setRegisterModalVisible } from '../redux/actions';

const MyInsurance = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const [email, setEmail] = useState(state.email || '');

  const handleUpdate = (e) => {
    if (e) e.preventDefault();
  };

  return (
    <>
      <GetCVROnReview {...props} />
      {/* <MobilePageTitle title="My Insurance" /> */}
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-8 dark:text-white">
        My Profile
      </div>
      <form
        onClick={handleUpdate}
        className="grid grid-cols-12 gap-x-4 gap-y-4 mb-16 xl:pl-5 xl:pr-24"
      >
        <div className="md:col-span-4 col-span-12 md:flex items-center">
          <div className="font-Montserrat text-body-md font-semibold dark:text-white text-dark-blue">
            Email
          </div>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Email"
            className="w-full md:ml-3 mt-2 md:mt-0 bg-transparent h-12 border-2 border-gray-300 rounded-xl outline-none placeholder-contact-input-dark-grey focus:outline-none focus:ring-0 ring-0 focus:border-gray-500 focus:ring-shadow-none text-black font-Montserrat font-medium text-body-md duration-200"
          />
        </div>
        <div className="flex items-center md:col-span-4 col-span-12">
          <button
            type="submit"
            className="py-3 px-8 w-full md:w-min text-white font-Montserrat font-body-md rounded-xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
          >
            Update
          </button>
        </div>
      </form>
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-8 dark:text-white">
        My Insurance
      </div>
      <div className="xl:pl-5 xl:pr-24">
        <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
          <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
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
          <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
            <button
              type="button"
              onClick={() => history.push('submit-review')}
              className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
            >
              Submit Review
            </button>
            <Modal
              title="Additional Details"
              bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
              renderComponent={AdditionalDetails}
            >
              <button
                type="button"
                className="md:px-5 px-3 py-3 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
              >
                Policy Details
              </button>
            </Modal>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
          <div className="flex items-center h-full sm:col-span-6 lg:col-span-7 col-span-12">
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
          <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-5 col-span-12">
            <Modal
              title="Instruction"
              bgImg="md:bg-submitClaimBg bg-submitClaimPopupBg bg-cover"
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
