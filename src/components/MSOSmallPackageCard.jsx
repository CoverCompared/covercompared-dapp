import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../redux/actions/AppActions';
import BuyIcon from '../assets/icons/buy.svg';

const SmallPackageCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    name,
    quote,
    MSOAddOnService,
    type,
    MSOCoverUser,
    EHR,
    logo,
    InsurancePlanType,
    MSOPlanDuration,
  } = props;

  const handleCardClick = () => {
    dispatch(setCurrentProduct(props));
    history.push('/mso-product');
  };

  const handleButNow = (e) => {
    if (e) e.stopPropagation();
    alert('Buy Now button clicked');
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-3 pl-3 pr-6 rounded-xl flex justify-between items-center relative md:col-span-6 col-span-12 cursor-pointer dark:bg-featureCard-dark-bg"
    >
      <div className="flex justify-between items-center h-full">
        <div className="w-16 h-16 rounded-xl shadow-2xl p-1 relative bg-white">
          <img src={logo} className="h-full w-full rounded-xl" alt={name} />
        </div>
        <div className="ml-4">
          <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white group-hover:text-white">
            {name}
          </div>
          <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white">
            {type}
          </div>
          <div className="font-Montserrat text-body-xs text-dark-blue dark:text-white flex items-center group-hover:text-white">
            Price{' '}
            <span className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white ml-2 group-hover:text-white">
              {quote}$
            </span>
          </div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <div className="col-span-4 flex flex-col justify-center font-Montserrat text-h6 text-dark-blue dark:text-white mr-5 my-4 md:my-0 group-hover:text-white">
          <div className="text-body-xs">Add on service</div>
          <div className="font-semibold">{MSOAddOnService}$</div>
        </div>
        <button
          type="button"
          onClick={handleButNow}
          className="h-10 w-10 rounded-lg text-login-button-text bg-login-button-bg hover:bg-white p-2"
        >
          <img src={BuyIcon} alt="cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SmallPackageCard;
