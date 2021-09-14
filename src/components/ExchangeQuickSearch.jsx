import React, { useState } from 'react';
import { useHistory } from 'react-router';
import uniqid from 'uniqid';
import SmallPackageCard from './common/SmallPackageCard';
import Select from './common/Select';

const exchangeOptions = [
  {
    option: 'Coinbase',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Binance',
    icon: 'https://via.placeholder.com/100',
  },
  {
    option: 'Okex',
    icon: 'https://via.placeholder.com/100',
  },
];
const coverageOptions = [
  { option: '$1000-$5000' },
  { option: '$5000-$10000' },
  { option: '$10000-20000' },
];
const countryOptions = [
  { option: 'USA' },
  { option: 'UAE' },
  { option: 'Pakistan' },
  { option: 'India' },
];

const PackagesArr = [
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '300',
    discount: '30',
  },
  {
    img: 'https://via.placeholder.com/400.png',
    packName: 'Pack Name',
    providerName: 'Provider Name',
    startingPrice: '100',
    discount: '20',
  },
];

const ExchangeQuickSearch = (props) => {
  const history = useHistory();
  const [exchange, setExchange] = useState(null);
  const [coverage, setCoverage] = useState(null);
  const [country, setCountry] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // if (exchange && coverage && country) setShowResults(true);
  // else setShowResults(false);

  return (
    <div className="w-full bg-body-bg dark:bg-body-dark-bg">
      <Select
        {...props}
        fieldTitle="Which Exchange do you want cover self against ?"
        options={exchangeOptions}
        selectedOption={exchange}
        setSelectedOption={setExchange}
      />
      <div className="mt-3">
        <Select
          {...props}
          fieldTitle="What level of cover are you looking for ?"
          options={coverageOptions}
          selectedOption={coverage}
          setSelectedOption={setCoverage}
        />
      </div>
      <div className="mt-3">
        <Select
          {...props}
          fieldTitle="Which country are you located in ?"
          options={countryOptions}
          selectedOption={country}
          setSelectedOption={setCountry}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => history.push('/search/crypto-exchange')}
          className="text-login-button-text font-medium text-body-md login-button-bg bg-gradient-to-r from-login-button-bg to-login-button-bg hover:from-primary-gd-1 hover:to-primary-gd-2 hover:text-white px-5 py-3 rounded-xl"
        >
          See all result
        </button>
      </div>

      <div className="mt-6 grid grid-cols-12 md:grid-col-6 lg:grid-cols-12 xl:grid-col-12 gap-y-4 md:gap-4 lg:gap-x-6 lg:gap-y-4 w-full">
        {PackagesArr.map((obj) => (
          <SmallPackageCard key={uniqid()} {...obj} {...props} />
        ))}
      </div>
    </div>
  );
};

export default ExchangeQuickSearch;
