import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import Modal from './common/Modal';
import DiscountCard from './common/SmallPackageCard';
import CountrySelector from './common/MsoCountrySelector';
import MSOAdditionalDetails from './MSOAddtionalDetails';
import { setCurrentProduct } from '../redux/actions/AppActions';
import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions';

const MSOPlanCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const {
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

  const { is_verified } = useSelector((state) => state.auth);

  const [country, setCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addonServices, setAddonServices] = useState(false);
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);

  const toggleCheckbox = (e) => {
    e.stopPropagation();

    if (!addonServices) setMsoTotalPrice(+quote + +MSOAddOnService);
    else setMsoTotalPrice(+quote);

    setAddonServices(!addonServices);
  };

  // const handleCardClick = () => {
  //   dispatch(
  //     setCurrentProduct({
  //       wantAddon: addonServices,
  //       addOnQuote: MSOAddOnService,
  //       quote,
  //       MSOCoverUser,
  //       name,
  //       MSOAddOnService,
  //       type,
  //       EHR,
  //       logo,
  //       unique_id,
  //       userTypeOptions,
  //       noOfSpouse,
  //       noOfDependent,
  //       mainMemberParents,
  //       spouseParents,
  //       totalUsers,
  //     }),
  //   );
  // };

  // const handleBuyNow = (e) => {
  //   if (e) e.stopPropagation();
  //   if (!account) {
  //     dispatch(setLoginModalVisible(true));
  //     dispatch(setRegisterModalVisible(true));
  //     return;
  //   }
  //   if (is_verified === false) {
  //     dispatch(setRegisterModalVisible(true));
  //     return;
  //   }
  //   alert('Buy Now button clicked');
  // };

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
            />
            <div className="ml-2 font-Montserrat font-semibold text-body-2xs text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </div>
          </label>
          <Modal
            title="Policy Details"
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
            }}
          >
            <div
              className="text-center font-bold font-Montserrat text-body-md bg-gradient-to-r from-planPrice-1 to-planPrice-2 bg-clip-text fill-transparent my-5"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              Read More
            </div>
          </Modal>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-Montserrat md:px-5 py-4 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-white bg-gradient-to-r from-primary-gd-1 to-primary-gd-2"
            >
              Buy Now
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            title="Country of Residence"
            sizeClass="max-w-2xl"
            renderComponent={CountrySelector}
            onClose={() => setIsModalOpen(false)}
            bgImg="bg-loginPopupBg"
            {...{ setIsModalOpen, selectedPlan }}
          />
        </div>
      </div>
    </>
  );
};

export default MSOPlanCard;
