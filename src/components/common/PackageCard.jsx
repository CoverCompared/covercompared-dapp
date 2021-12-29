import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { setCurrentProduct } from '../../redux/actions/AppActions';
import DiscountCard from './Discount';
import ToolTip from './ToolTip';
import { setLoginModalVisible } from '../../redux/actions';
import Placeholder from '../../assets/img/placeholder.png';

const PackageCard = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const {
    name,
    cardType,
    company_icon,
    company,
    duration_days_min,
    min_eth,
    discount,
    logo,
    quote,
    quote_chain,
    supportedChains,
    quote_currency,
  } = props;

  const history = useHistory();

  const handleBuyNow = (e) => {
    // if (e) e.stopPropagation();
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
    } else {
      dispatch(setCurrentProduct(props));
      history.push('/product/cover');
    }
  };

  return (
    <>
      <div className="w-full" onClick={handleBuyNow}>
        <div className="grid grid-cols-12 gap-x-0 w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-4 md:pl-4 md:pr-8 px-4 rounded-xl mb-4 relative cursor-pointer">
          <DiscountCard discountPercentage={discount} />
          <div className="col-span-7 md:col-span-5 flex items-center h-full w-full">
            <div className="md:w-20 md:h-20 w-16 h-16 rounded-xl shadow-2xl p-1 relative bg-white">
              <img
                src={logo || Placeholder}
                className="h-full w-full rounded-xl bg-fixed"
                alt={name}
              />
              <img
                src={company_icon || Placeholder}
                className="absolute right-1 bottom-1 max-h-5"
                alt=""
              />
            </div>
            <div className="md:ml-6 md:mr-5 mr-1 ml-3">
              <div
                className="font-Montserrat text-h6 font-semibold text-dark-blue mb-1 leading-4 dark:text-white group-hover:text-white"
                data-for="search-tool-tip"
                data-tip={name}
                data-iscapture="true"
              >
                <div className="hidden md:block">
                  {name ? (name.length > 20 ? `${name.slice(0, 20)} . . .` : name) : ''}
                </div>
                <div className="md:hidden">
                  {name ? (name.length > 12 ? `${name.slice(0, 12)}...` : name) : ''}
                </div>
              </div>
              <ToolTip ToolTipId="search-tool-tip" bgColor="White" fontColor="#175186" />
              <div className="font-Montserrat text-body-xs font-medium text-dark-blue mb-1 dark:text-white group-hover:text-white">
                {company}
              </div>
              <div className="hidden md:block font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white">
                Chain: {supportedChains.join(',') || 'Ethereum'}
              </div>
            </div>
          </div>
          <div className="col-span-0 md:col-span-4 md:flex items-center hidden">
            <div className="grid grid-cols-12 gap-x-0 w-full">
              <div className="col-span-6 mr-16 md:block hidden">
                <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white">
                  Amount
                </div>
                <div className="font-Montserrat text-h6 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
                  {min_eth}
                </div>
              </div>
              <div className="col-span-6 mr-16 md:block hidden">
                <div className="font-Montserrat text-body-xs font-medium text-dark-blue dark:text-white group-hover:text-white">
                  Duration
                </div>
                <div className="font-Montserrat text-h6 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
                  {duration_days_min} days
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 md:col-span-3 flex items-center justify-end">
            <button
              type="button"
              className="ml-3 font-Montserrat disabled:opacity-50 md:inline-flex items-center md:px-5 md:py-4 py-3 px-4 shadow-buyInsurance md:text-body-md text-body-xs leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg hover:bg-white duration-200"
            >
              <div>Buy Now</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
