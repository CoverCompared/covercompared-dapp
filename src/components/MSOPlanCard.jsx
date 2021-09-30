import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import DiscountCard from './common/SmallPackageCard';
import { setCurrentProduct } from '../redux/actions/AppActions';

const MSOPlanCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const [addonServices, setAddonServices] = useState(false);
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);

  const toggleCheckbox = (e) => {
    e.stopPropagation();

    if (!addonServices) setMsoTotalPrice(+quote + +MSOAddOnService);
    else setMsoTotalPrice(+quote);

    setAddonServices(!addonServices);
  };

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

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white dark:bg-featureCard-dark-bg cursor-pointer rounded-xl pb-6 md:col-span-6 lg:col-span-3 col-span-12  border-2 border-opacity-0 hover:border-primary-gd-1 dark:hover:border-white flex flex-col justify-between"
      >
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
          <div className="font-Montserrat font-medium text-body-xs text-dark-blue dark:text-white text-center px-4">
            <div className="mb-1">{type}</div>
            <div className="mb-1">{EHR}</div>
            <div className="mb-1 font-semibold">{MSOCoverUser}</div>
          </div>
        </div>
        <div className="px-2 mt-4 text-center">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:border-0 focus:border-opacity-0 focus:ring-0 focus:ring-offset-0 duration-100 focus:shadow-0"
              checked={addonServices}
              onClick={toggleCheckbox}
            />
            <div className="ml-2 font-Montserrat font-medium text-body-md text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </div>
          </label>
        </div>
      </div>
    </>
  );
};
export default MSOPlanCard;
