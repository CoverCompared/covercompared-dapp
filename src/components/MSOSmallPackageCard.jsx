import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setCurrentProduct, addItemToCart } from '../redux/actions/AppActions';
import BuyIcon from '../assets/icons/buy.svg';

const SmallPackageCard = (props) => {
  const history = useHistory();
  const {
    InsurancePlanType,
    MSOplanName,
    MSOPrice,
    MSOAddOnService,
    MSOPlanType,
    MSOPlanDuration,
    MSOCoverUser,
  } = props;

  const handleCardClick = () => {
    props.setCurrentProduct(props);
    history.push('/mso-product');
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    props.addItemToCart(props);
    toast.success('Item added to cart!');
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-3 pl-3 pr-6 rounded-xl flex justify-between items-center relative md:col-span-6 col-span-12 cursor-pointer dark:bg-featureCard-dark-bg"
    >
      <div className="flex justify-between items-center h-full">
        <div className="w-16 h-16 rounded-xl bg-gray-200">
          {/* <img src={img} className="h-full w-full rounded-xl" alt={packName} /> */}
        </div>
        <div className="ml-4">
          <div className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white group-hover:text-white">
            {MSOplanName}
          </div>
          <div className="font-Montserrat text-body-xs font-medium text-dark-blue mb-1 dark:text-white group-hover:text-white">
            {MSOPlanType}
          </div>
          <div className="font-Montserrat text-body-xs text-dark-blue dark:text-white flex items-center group-hover:text-white">
            Price{' '}
            <span className="font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white ml-2 group-hover:text-white">
              {MSOPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <div className="col-span-4 flex flex-col justify-center font-Montserrat text-h6 text-dark-blue dark:text-white mr-5 my-4 md:my-0 group-hover:text-white">
          <div className="text-body-xs">Add on service</div>
          <div className="font-semibold">{MSOAddOnService}</div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-10 w-10 rounded-lg text-login-button-text bg-login-button-bg hover:bg-white p-2"
        >
          <img src={BuyIcon} alt="cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default connect(null, { setCurrentProduct, addItemToCart })(SmallPackageCard);
