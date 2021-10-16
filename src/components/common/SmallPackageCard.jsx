import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { setCurrentProduct } from '../../redux/actions/AppActions';
import DiscountCard from './Discount';
import BuyIcon from '../../assets/icons/buy.svg';
import ToolTip from './ToolTip';
import { setLoginModalVisible } from '../../redux/actions';

import Placeholder from '../../assets/img/placeholder.png';

const SmallPackageCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const {
    name,
    company_icon,
    company,
    discount,
    logo,
    quote,
    quote_chain,
    cardType,
    duration_days_min,
    min_eth,
    quote_currency,
  } = props;

  const handleCardClick = () => {
    dispatch(setCurrentProduct(props));
    history.push('/product/cover');
  };

  const handleBuyNow = (e) => {
    if (e) e.stopPropagation();
    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
      return;
    }
    alert('Buy Now button clicked');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md md:py-3 md:pl-3 md:pr-6 px-3 py-4 rounded-xl md:flex justify-between items-center relative col-span-6 cursor-pointer dark:bg-featureCard-dark-bg box-content"
    >
      <DiscountCard discountPercentage={discount} />
      <div className="flex md:justify-between items-center md:h-full">
        <div className="md:w-16 md:h-16 h-9 w-9 md:rounded-xl rounded-md relative shadow-2xl p-1 bg-white">
          <img src={logo || Placeholder} className="h-full w-full rounded-xl" alt={name} />
          <img src={company_icon || Placeholder} className="absolute right-1 bottom-1 h-3" alt="" />
        </div>
        <div className="md:ml-4 ml-2">
          <div
            className="font-Montserrat md:text-body-lg text-h6 font-semibold text-dark-blue dark:text-white group-hover:text-white"
            data-for="search-tool-tip"
            data-tip={name}
            data-iscapture="true"
          >
            {name ? (name.length > 13 ? `${name.slice(0, 13)} ....` : name) : ''}
          </div>
          <ToolTip ToolTipId="search-tool-tip" bgColor="White" fontColor="#175186" />
          <div className="font-Montserrat md:text-body-xs text-10 font-medium text-dark-blue mb-1 dark:text-white group-hover:text-white">
            {company}
          </div>
          <div className="font-Montserrat text-10 font-medium text-dark-blue dark:text-white group-hover:text-white mt-1">
            Chain: {quote_chain}
          </div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <button
          type="button"
          onClick={handleBuyNow}
          className="h-10 w-10 rounded-lg text-login-button-text bg-login-button-bg hover:bg-white p-2"
        >
          <img src={BuyIcon} alt="cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SmallPackageCard;
