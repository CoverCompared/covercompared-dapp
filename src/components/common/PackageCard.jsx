import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentProduct } from '../../redux/actions/AppActions';
import DiscountCard from './Discount';
import Loading from './Loading';
import NsureNetworkLogo from '../../assets/img/nsure-network.svg';
import NexusMutualLogo from '../../assets/img/nexus-mutual-icon.png';
import InsureAceLogo from '../../assets/img/insurace-icon.png';

const PackageCard = (props) => {
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

  const history = useHistory();
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
  return (
    <>
      <div className="w-full" onClick={handleCardClick}>
        <div className="grid grid-cols-12 gap-x-0 w-full group bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:hover:from-primary-gd-1 dark:hover:to-primary-gd-2 from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 shadow-md py-4 md:pl-4 md:pr-8 px-4 rounded-xl mb-4 relative cursor-pointer">
          <DiscountCard discountPercentage={discount} />
          <div className="col-span-7 md:col-span-5 flex items-center h-full w-full">
            <div className="md:w-20 md:h-20 w-16 h-16 rounded-xl shadow-2xl p-1 relative dark:bg-white group-hover:text-white">
              <img src={logo} className="md:h-full md:w-full rounded-xl w-14 h-14" alt={name} />
              <img src={providerLogo} className="absolute right-1 bottom-1 max-h-5" alt="" />
            </div>
            <div className="md:ml-6 mr-5 ml-4">
              <div className="font-Montserrat text-h6 font-semibold text-dark-blue mb-1 leading-4 dark:text-white group-hover:text-white">
                <div className="hidden md:block">
                  {name ? (name.length > 20 ? `${name.slice(0, 20)} . . .` : name) : ''}
                </div>
                <div className="md:hidden">
                  {name ? (name.length > 12 ? `${name.slice(0, 12)}...` : name) : ''}
                </div>
              </div>
              <div className="font-Montserrat text-body-xsm font-medium text-dark-blue dark:text-white group-hover:text-white">
                {company}
              </div>
              <div className="font-Montserrat text-body-xsm md:block hidden font-medium text-dark-blue dark:text-white group-hover:text-white mt-2">
                Chain: {quote_chain}
              </div>
            </div>
          </div>
          <div className="col-span-0 md:col-span-5 md:flex items-center hidden">
            <div className="grid grid-cols-12 gap-x-0 w-full">
              <div className="col-span-6 font-Montserrat text-h6 font-semibold text-dark-blue dark:text-white group-hover:text-white">
                <div className=" mr-5 my-4 md:my-0">{duration_days_min} days</div>
                <div className="mr-5 my-4 md:my-0">
                  {min_eth} {quote_currency}
                </div>
              </div>
              <div className="col-span-6 mr-16 md:block hidden">
                <div className="font-Montserrat text-body-xsm font-medium text-dark-blue dark:text-white group-hover:text-white">
                  Start From
                </div>
                <div className="font-Montserrat text-h4 font-semibold text-dark-blue mt-2 leading-4 dark:text-white group-hover:text-white">
                  {quote !== undefined ? (
                    quote ? (
                      quote.toFixed(4)
                    ) : (
                      '---'
                    )
                  ) : (
                    <Loading heightClass="h-4" widthClass="w-4" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 md:col-span-2 flex items-center justify-end">
            <Link to="facebook.com">
              <button
                type="button"
                className="ml-3 font-Montserrat md:inline-flex items-center md:px-5 md:py-4 py-1.5 px-4 shadow-buyInsurance md:text-body-md text-body-xsm leading-4 font-semibold rounded-xl text-login-button-text bg-login-button-bg hover:bg-white duration-200"
              >
                <div>Add to Cart</div>
                <div className="mt-1 md:hidden">
                  {quote !== undefined ? (
                    quote ? (
                      quote.toFixed(4)
                    ) : (
                      '---'
                    )
                  ) : (
                    <Loading heightClass="h-4" widthClass="w-4" />
                  )}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { setCurrentProduct })(PackageCard);
