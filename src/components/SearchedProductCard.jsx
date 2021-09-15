import React from 'react';
import { useHistory } from 'react-router';
import DiscountCard from './common/Discount';

const SearchedProductCard = (props) => {
  const history = useHistory();
  const { image, name, priceLabel, priceValue, discount } = props;
  return (
    <div
      onClick={() => history.push('/product/cover')}
      className="w-full shadow-insuranceCard dark:shadow-none rounded-3xl flex bg-gradient-to-r from-white to-white hover:from-primary-gd-1 hover:to-primary-gd-2 border cursor-pointer relative dark:bg-gradient-to-r dark:from-featureCard-dark-bg dark:to-featureCard-dark-bg dark:border-opacity-0"
    >
      <DiscountCard {...props} discountPercentage={discount} />
      <div className="w-full px-10 pb-5 pt-9 flex flex-col items-center text-black hover:text-white">
        <img alt="product img" className="w-10 h-10 rounded-md" src={image} />
        <p className="mt-3 px-3 font-Montserrat text-center font-semibold text-body-md dark:text-white">
          {name}
        </p>
        <p className="mt-1 text-center font-Montserrat text-body-xs dark:text-white">
          {priceLabel}
        </p>
        <h2 className="mt-1 text-center font-Montserrat font-semibold text-h2 dark:text-white">
          {priceValue}
        </h2>
        <button
          type="button"
          className="text-login-button-text mt-4 font-semibold text-body-md login-button-bg bg-login-button-bg hover:bg-white px-3 py-3 rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SearchedProductCard;
