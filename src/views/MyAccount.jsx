import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import GetCVROnReview from '../components/GetCVROnReview';
import Modal from '../components/common/Modal';
import ClaimCards from '../components/ClaimCards';
import AdditionalDetails from '../components/AdditionalDetails';
import { getUserPolicies } from '../redux/actions/UserProfile';
import OverlayLoading from '../components/common/OverlayLoading';
import MSOReceiptCard from '../components/MSOReceiptCard';
import DeviceReceiptCard from '../components/DeviceReceiptCard';

const DeviceCard = (props) => {
  return <DeviceReceiptCard {...props} />;
};

const MyAccount = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { policies, loader } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserPolicies());
  }, []);

  console.log('policies :>> ', policies);

  const renderDeviceCard = (device) => {
    const {
      _id,
      tax,
      amount,
      txn_hash,
      total_amount,
      discount_amount,
      details: {
        email,
        first_name,
        last_name,
        phone,
        brand,
        value,
        device_type,
        purchase_month,
        currency,
        model,
      },
    } = device;
    return (
      <div className="w-full bg-white dark:bg-featureCard-dark-bg shadow-md py-4 pl-4 xl:pr-8 pr-4 rounded-xl grid grid-cols-12 gap-x-5 gap-y-6 mb-4 relative">
        <div className="flex items-center h-full w-full sm:col-span-6 lg:col-span-6 col-span-12">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-xl bg-gray-200">
            <img
              src="https://via.placeholder.com/400x250.png"
              alt=""
              className="h-full w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-Montserrat text-h5 font-semibold text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">{`${device_type} - ${brand} `}</div>
            <div className="font-Montserrat text-body-md font-medium text-dark-blue md:ml-6 ml-4 md:mr-10 dark:text-white flex flex-col">
              {model || ''}
            </div>
          </div>
        </div>

        <div className="flex sm:justify-end items-center sm:col-span-6 lg:col-span-6 col-span-12">
          <button
            type="button"
            onClick={() => history.push(`submit-review/${_id}`)}
            className="md:px-5 p-3 md:mr-4 mr-2 bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white text-login-button-text font-Montserrat font-semibold md:text-body-md text-body-sm rounded-xl "
          >
            Submit Review
          </button>
          <Modal
            title="Policy Details"
            bgImg="md:bg-additionalDetailsBg1 bg-mobilePopupBg bg-right-bottom bg-no-repeat bg-contain"
            renderComponent={DeviceCard}
            {...{
              tax,
              txn_hash,
              quote: amount,
              total: total_amount,
              discountAmount: discount_amount,
              fName: first_name,
              lName: last_name,
              email,
              phone,
              brand,
              value,
              deviceType: device_type,
              purchaseMonth: purchase_month,
              plan_currency: currency,
              selectedModel: model,
            }}
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
    );
  };

  return (
    <>
      {loader && <OverlayLoading />}
      <GetCVROnReview {...props} />
      {/* <MobilePageTitle title="My Insurance" /> */}
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-4 dark:text-white">
        My Profile
      </div>

      <div className="xl:pl-5 xl:pr-24">
        <div className="md:col-span-4 col-span-12 md:flex items-center mb-4">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <label className="text-sm font-medium text-gray-500 ml-2">{email}</label>
          </div>
          {/* <div className="mt-1 flex rounded-md shadow-sm">  
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                disabled
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 bg-gray-50"
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:border-0"
            >
              <PencilAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div> */}
        </div>
      </div>
      <div className="font-Montserrat md:text-h2 text-h4 font-semibold text-dark-blue mb-8 dark:text-white">
        My Insurance
      </div>
      <div className="xl:pl-5 xl:pr-24">
        {policies?.map((m, i) => {
          if (m.product_type === 'device_insurance') {
            return renderDeviceCard(m);
          }

          return <></>;
        })}

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
export default MyAccount;
