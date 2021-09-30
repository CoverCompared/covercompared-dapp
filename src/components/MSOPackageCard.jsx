import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { setCurrentProduct } from '../redux/actions/AppActions';
import { setLoginModalVisible, setRegisterModalVisible } from '../redux/actions';

const MSOPackageCard = (props) => {
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

  const { is_verified } = useSelector((state) => state.auth);

  const [addonServices, setAddonServices] = useState(false);
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);

  useEffect(() => {
    setMsoTotalPrice(msoTotalPrice);
  }, [msoTotalPrice]);

  const handleCardClick = () => {
    dispatch(
      setCurrentProduct({
        wantAddon: addonServices,
        addOnQuote: MSOAddOnService,
        quote,
        MSOCoverUser,
        name,
        MSOAddOnService,
        type,
        EHR,
        logo,
        unique_id,
        userTypeOptions,
        noOfSpouse,
        noOfDependent,
        mainMemberParents,
        spouseParents,
        totalUsers,
      }),
    );
    history.push('/mso-product');
  };

  const toggleCheckbox = (e) => {
    e.stopPropagation();

    if (!addonServices) setMsoTotalPrice(+quote + +MSOAddOnService);
    else setMsoTotalPrice(+quote);

    setAddonServices(!addonServices);
  };

  const handleBuyNow = (e) => {
    if (e) e.stopPropagation();
    if (!account) {
      dispatch(setLoginModalVisible(true));
      dispatch(setRegisterModalVisible(true));
      return;
    }
    if (is_verified === false) {
      dispatch(setRegisterModalVisible(true));
      return;
    }
    alert('Buy Now button clicked');
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-4 md:pl-4 md:pr-8 px-4 rounded-xl mb-4 grid grid-cols-12 gap-x-1 relative cursor-pointer"
      >
        <div className="md:col-span-4 col-span-7 flex items-center h-full">
          <div className="md:w-20 md:h-20 w-16 h-16 rounded-xl shadow-2xl p-1 relative bg-white">
            <img src={logo} className="h-full w-full rounded-xl" alt={name} />
          </div>
          <div className="md:ml-6 ml-2">
            <div className="font-Montserrat md:text-h6 text-body-sm font-semibold text-dark-blue mb-1 leading-4 dark:text-white group-hover:text-white">
              {name}
            </div>
            <div className="hidden md:block font-Montserrat text-body-xs font-semibold text-dark-blue dark:text-white group-hover:text-white">
              {EHR}
            </div>
            <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white">
              {type}
            </div>
          </div>
        </div>
        <div className="md:col-span-5 col-span-0 hidden md:flex flex-col justify-center font-Montserrat text-body-md text-dark-blue dark:text-white mr-2 my-4 md:my-0 group-hover:text-white">
          <div className="font-semibold mb-2">
            {MSOCoverUser
              ? MSOCoverUser.length > 50
                ? `${MSOCoverUser.slice(0, 50)}. . .`
                : MSOCoverUser
              : ''}
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
              checked={addonServices}
              onClick={toggleCheckbox}
            />
            <span className="ml-2 font-Montserrat font-medium text-body-md text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </span>
          </label>
          {/* <div>
            Add on concierge service{' '}
            <span className="font-semibold text-h6">{MSOAddOnService}$</span>
          </div> */}
        </div>
        <div className="col-span-5 md:col-span-3 flex items-center justify-end">
          <div className="hidden md:block">
            <div className="font-Montserrat text-body-xs text-dark-blue dark:text-white group-hover:text-white">
              Price
            </div>
            <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
              {msoTotalPrice}$
            </div>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="ml-5 font-Montserrat md:flex items-center md:px-5 md:py-4 py-1.5 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg hover:bg-white duration-200"
          >
            Buy Now
            <div className="md:hidden font-Montserrat md:text-h4 text-body-sm font-semibold leading-4 mt-1 text-login-button-text hover:bg-white">
              {msoTotalPrice}$
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default MSOPackageCard;
