import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { setCurrentProduct, addItemToCart } from '../../redux/actions/AppActions';
import DiscountCard from './Discount';
import Loading from './Loading';
import BuyIcon from '../../assets/icons/buy.svg';
import NsureNetworkLogo from '../../assets/img/nsure-network.svg';
import NexusMutualLogo from '../../assets/img/nexus-mutual-icon.png';
import InsureAceLogo from '../../assets/img/insurace-icon.png';

const SmallPackageCard = (props) => {
  const history = useHistory();
  const {
    name,
    company,
    duration_days_min,
    min_eth,
    discount,
    logo,
    quote,
    quote_chain,
    quote_currency,
  } = props;
  const [providerLogo, setProviderLogo] = useState(NsureNetworkLogo);

  useEffect(() => {
    let providerLogo = NsureNetworkLogo;
    if (company === 'Nexus Mutual') {
      providerLogo = NexusMutualLogo;
    } else if (company === 'InsurAce') {
      providerLogo = InsureAceLogo;
    }
    setProviderLogo(providerLogo);
  });

  const handleCardClick = () => {
    props.setCurrentProduct(props);
    history.push('/product/cover');
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    props.addItemToCart(props);
    toast.success('Item added to cart!');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md md:py-3 md:pl-3 md:pr-6 px-3 py-4 rounded-xl md:flex justify-between items-center relative col-span-6 cursor-pointer dark:bg-featureCard-dark-bg box-content"
    >
      <DiscountCard discountPercentage={discount} />
      <div className="flex md:justify-between items-center md:h-full">
        <div className="md:w-16 md:h-16 h-9 w-9 md:rounded-xl rounded-md relative shadow-2xl p-1 bg-white">
          <img src={logo} className="h-full w-full rounded-xl" alt={name} />
          <img src={providerLogo} className="absolute right-1 bottom-1 h-3" alt="" />
        </div>
        <div className="md:ml-4 ml-2">
          <div className="font-Montserrat md:text-body-lg text-h6 font-semibold text-dark-blue dark:text-white group-hover:text-white">
            {name ? (name.length > 13 ? `${name.slice(0, 13)} ....` : name) : ''}
          </div>
          <div className="font-Montserrat md:text-body-xs text-10 font-medium text-dark-blue mb-1 dark:text-white group-hover:text-white">
            {company}
          </div>
          <div className="font-Montserrat text-10 font-medium text-dark-blue dark:text-white group-hover:text-white mt-1">
            Chain: {quote_chain}
          </div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <div className="col-span-6 mr-3 font-Montserrat text-body-lg font-semibold text-dark-blue dark:text-white group-hover:text-white">
          <div className=" mr-5 my-4 md:my-0">{duration_days_min} days</div>
          <div className="mr-5 my-4 md:my-0">
            {min_eth} {quote_currency}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-10 w-10 rounded-lg text-login-button-text bg-login-button-bg hover:bg-white p-2"
        >
          <img src={BuyIcon} alt="cart" className="w-6 h-6" />
        </button>
      </div>
      <button
        type="button"
        onClick={handleAddToCart}
        className="md:hidden py-1.5 mt-4 w-full rounded-lg text-login-button-text bg-login-button-bg hover:bg-white p-2 font-semibold text-body-xs"
      >
        Start From <br />{' '}
        {quote !== undefined ? (
          quote ? (
            quote.toFixed(4)
          ) : (
            '---'
          )
        ) : (
          <Loading heightClass="h-4" widthClass="w-4" />
        )}
      </button>
    </div>
  );
};

export default connect(null, { setCurrentProduct, addItemToCart })(SmallPackageCard);
