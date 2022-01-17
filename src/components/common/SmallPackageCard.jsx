import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';

import { setCurrentProduct } from '../../redux/actions/AppActions';
import DiscountCard from './Discount';
import BuyIcon from '../../assets/icons/buy.svg';
import ToolTip from './ToolTip';
import { setLoginModalVisible } from '../../redux/actions';
import { API_BASE_URL } from '../../redux/constants/config';
import { axiosPost } from '../../redux/constants/apicall';
import OverlayLoading from './OverlayLoading';

import Placeholder from '../../assets/img/placeholder.png';

const SmallPackageCard = (props) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const {
    address,
    name,
    company_icon,
    company,
    company_code,
    discount,
    logo,
    quote,
    quote_chain,
    supportedChains,
    cardType,
    duration_days_min,
    min_eth,
    quote_currency,
    product_id,
  } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async (e) => {
    // if (e) e.stopPropagation();
    setLoading(true);
    const res = await axiosPost(`${API_BASE_URL}/cover-capacity`, {
      address,
      company: company_code,
      product_id,
    });
    setLoading(false);
    const capacity = res?.data?.data.capacity || {};

    let hasCapacity = false;
    if (typeof capacity === 'object') hasCapacity = Math.min(...Object.values(capacity)) > 0;
    else if (company_code !== 'nexus') hasCapacity = true;

    if (!account) {
      toast.warning('You need to login in advance!');
      dispatch(setLoginModalVisible(true));
    } else if (!hasCapacity) {
      toast.warning(`Product has no capacity to be sold`);
    } else {
      dispatch(setCurrentProduct(props));
      history.push('/product/cover');
    }
  };

  return (
    <>
      {loading && <OverlayLoading />}
      <div
        onClick={handleBuyNow}
        className="group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md md:py-3 md:pl-3 md:pr-6 px-3 py-4 rounded-xl md:flex justify-between items-center relative col-span-6 cursor-pointer dark:bg-featureCard-dark-bg box-content"
      >
        <DiscountCard discountPercentage={discount} />
        <div className="flex md:justify-between items-center md:h-full">
          <div className="md:w-16 md:h-16 h-9 w-9 md:rounded-xl rounded-md relative shadow-2xl p-1 bg-white">
            <img
              loading="lazy"
              src={logo || Placeholder}
              className="h-full w-full rounded-xl"
              alt={name}
            />
            <img
              loading="lazy"
              src={company_icon || Placeholder}
              className="absolute right-1 bottom-1 h-3"
              alt=""
            />
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
              Chain: {supportedChains.join(',') || 'Ethereum'}
            </div>
          </div>
        </div>
        <div className="h-full flex items-center">
          <button
            type="button"
            className="font-Montserrat disabled:opacity-50 md:px-3 md:py-2 py-1.5 px-2 shadow-buyInsurance md:text-body-md text-body-xs leading-4 font-semibold rounded-lg text-login-button-text bg-login-button-bg hover:bg-white duration-200"
          >
            <div>Buy Now</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SmallPackageCard;
