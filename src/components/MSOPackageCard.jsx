import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import DiscountCard from './common/SmallPackageCard';
import { setCurrentProduct, addItemToCart } from '../redux/actions/AppActions';

const MSOPackageCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [addonServices, setAddonServices] = useState(false);

  const {
    InsurancePlanType,
    name,
    quote,
    MSOAddOnService,
    MSOPlanType,
    MSOPlanDuration,
    MSOCoverUser,
    EHR,
  } = props;
  const [msoTotalPrice, setMsoTotalPrice] = useState(quote);

  const handleCardClick = () => {
    dispatch(setCurrentProduct(props));
    // history.push('/mso-product');
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    dispatch(
      addItemToCart({
        type: 'mso',
        name,
        quote,
        wantAddon: addonServices,
        addOnQuote: MSOAddOnService,
        quote_currency: '$',
        MSOCoverUser,
        EHR,
      }),
    );
    toast.success('Item added to cart!');
  };

  const totalPrice = (e) => {
    e.stopPropagation();
    let totalPrice = msoTotalPrice;
    if (addonServices === false) {
      setAddonServices(true);
      totalPrice = JSON.parse(msoTotalPrice) + JSON.parse(MSOAddOnService);
      setMsoTotalPrice(totalPrice);
    } else {
      setAddonServices(false);
      totalPrice = JSON.parse(msoTotalPrice) - JSON.parse(MSOAddOnService);
      setMsoTotalPrice(totalPrice);
    }
  };

  useEffect(() => {
    setMsoTotalPrice(msoTotalPrice);
  }, [msoTotalPrice]);

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-4 md:pl-4 md:pr-8 px-4 rounded-xl mb-4 grid grid-cols-12 gap-x-1 relative cursor-pointer"
      >
        <div className="md:col-span-4 col-span-7 flex items-center h-full">
          <div className="md:w-20 md:h-20 w-16 h-16 rounded-xl bg-gray-200">
            {/* <img src={img} className="h-full w-full rounded-xl" alt={name} /> */}
          </div>
          <div className="md:ml-6 ml-2">
            <div className="font-Montserrat md:text-h6 text-body-sm font-semibold text-dark-blue mb-1 leading-4 dark:text-white group-hover:text-white">
              {name}
            </div>
            <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white mb-2">
              {MSOPlanType}
            </div>
            <div className="hidden md:block font-Montserrat text-body-xs font-semibold text-dark-blue dark:text-white group-hover:text-white">
              {EHR}
            </div>
          </div>
        </div>
        <div className="md:col-span-4 col-span-0 hidden md:flex flex-col justify-center font-Montserrat text-body-md text-dark-blue dark:text-white mr-2 my-4 md:my-0 group-hover:text-white">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox rounded-sm text-primary-gd-1 focus:text-dark-blue focus:ring-0 focus:border-opacity-0 duration-200 focus:shadow-0"
              checked={addonServices}
              onChange={totalPrice}
            />
            <span className="ml-2 font-Montserrat font-medium text-body-md text-dark-blue dark:text-white group-hover:text-white">
              Add on concierge services at {MSOAddOnService}$
            </span>
          </label>
          {/* <div>
            Add on concierge service{' '}
            <span className="font-semibold text-h6">{MSOAddOnService}$</span>
          </div> */}
          <div className="font-semibold mt-2">
            {MSOCoverUser
              ? MSOCoverUser.length > 50
                ? `${MSOCoverUser.slice(0, 50)}. . .`
                : MSOCoverUser
              : ''}
          </div>
        </div>
        <div className="col-span-5 md:col-span-4 flex items-center justify-end">
          <div className="mr-16 hidden md:block">
            <div className="font-Montserrat text-body-xs text-dark-blue dark:text-white group-hover:text-white">
              Price
            </div>
            <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
              {msoTotalPrice}$
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="ml-3 font-Montserrat md:flex items-center md:px-5 md:py-4 py-1.5 px-4 shadow-sm md:text-body-md md:text-body-xsm text-body-xs md:leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg hover:bg-white duration-200"
          >
            Add to Cart
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
