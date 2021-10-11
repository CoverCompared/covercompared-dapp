import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { useWeb3React } from '@web3-react/core';
import countryList from 'react-select-country-list';
import { CheckCircleIcon } from '@heroicons/react/outline';

import useAuth from '../../hooks/useAuth';
import SUPPORTED_WALLETS from '../../config/walletConfig';
import MsoUserInfoForm from '../MsoUserInfoForm';

const countries = [
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'OMN', label: 'Oman' },
  { value: 'KWT', label: 'Kuwait' },
  { value: 'USA', label: 'United States' },
  { value: 'BHR', label: 'Bahrain' },
  { value: 'SAU', label: 'Saudi Arabia' },
  { value: 'NOT', label: 'None of Them' },
];

const MsoCountrySelector = ({ setIsModalOpen, setMaxWidth, setTitle, selectedPlan }) => {
  useEffect(() => {
    console.log("Hi I'm mounted> country select");
    return () => {
      console.log("Hi I'm un-mounted> country select");
    };
  }, []);

  const { login } = useAuth();

  const { account } = useWeb3React();
  const [curWalletId, setCurWalletId] = useState('injected');
  const [connectStatus, setConnectStatus] = useState(false);

  const [country, setCountry] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const allCountries = useMemo(() => countryList().getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCountry && userEmail) {
      setShowSuccess(true);
      setTitle('');
      return;
    }
    setShowUserInfoForm(true);

    if (account) {
      setMaxWidth('max-w-5xl');
      setTitle('Members Information Form');
    } else {
      setTitle('Login');
    }
  };

  const tryActivation = (connect) => {
    setCurWalletId(connect);
    setConnectStatus(true);
    login(connect);
  };

  const getWalletOption = () => {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      return (
        <div
          className="md:col-span-5 col-span-5 h-full"
          key={key}
          id={`connect-${key}`}
          onClick={() => tryActivation(option.connector)}
        >
          <div className="flex flex-col items-center md:justify-center h-full py-9 px-6 md:h-52 xl:h-54 w-full rounded-2xl bg-white shadow-md cursor-pointer dark:bg-wallet-dark-bg">
            <img src={option.icon} alt="Metamask" className="md:h-11 h-8 mx-auto" />
            <div className="text-dark-blue font-semibold font-Montserrat md:text-body-md text-body-xs md:mt-5 mt-4 dark:text-white">
              {connectStatus && curWalletId === option.connector ? 'Connecting...' : option.name}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderFormBody = () => {
    if (country?.value === 'NOT')
      return (
        <div className="mt-6">
          <div className="text-center mb-3">
            <h5 className="font-Montserrat font-semibold text-h6">
              Please fill your information in form below
            </h5>
            <h6 className="font-Inter font-medium text-counter-card-text text-body-md mt-1 mb-4">
              We will let you know when this policy is available in your country
            </h6>
          </div>

          <div className="relative">
            <Select
              className="country-select"
              options={allCountries}
              value={userCountry}
              onChange={setUserCountry}
              placeholder="Select your country"
            />
            <input
              onChange={() => {}}
              tabIndex={-1}
              autoComplete="off"
              style={{
                opacity: 0,
                height: 0,
                width: '100%',
                position: 'absolute',
                top: 44,
              }}
              value={userCountry}
              required
            />
          </div>

          <input
            required
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 h-11 mt-2 font-Montserrat font-medium text-body-md"
            placeholder="Enter your email"
          />
        </div>
      );

    return null;
  };

  const renderActionButtons = () => {
    return country?.value === 'NOT' ? (
      <div className="grid grid-cols-2 gap-x-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl font-semibold bg-gradient-to-r from-primary-gd-2 to-primary-gd-1"
        >
          skip
        </button>
        <button
          type="submit"
          className="py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl bg-gradient-to-r font-semibold from-primary-gd-1 to-primary-gd-2"
        >
          submit
        </button>
      </div>
    ) : (
      <button
        type="submit"
        disabled={!country}
        className="w-full py-3 px-8 mt-8 text-white font-Montserrat font-md rounded-2xl font-semibold bg-gradient-to-r from-primary-gd-1 to-primary-gd-2 disabled:from-primary-gd-2 disabled:to-primary-gd-2 disabled:bg-gray-400 disabled:cursor-default"
      >
        Proceed
      </button>
    );
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CheckCircleIcon className="w-28 h-28 text-green-500" />
        <h5 className="font-Montserrat text-3xl my-3">Thank you!</h5>
        <p className="font-Inter text-counter-card-text text-body-md">
          Your information has been submitted successfully
        </p>
        <p className="font-Inter text-counter-card-text text-body-md">
          You will receive an email when this policy is available in your country
        </p>
      </div>
    );
  }

  if (showUserInfoForm && !account) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex items-center justify-center w-full">
          <div className="grid grid-cols-10 md:col-start-1 md:gap-x-6 gap-x-5 w-full">
            {getWalletOption()}
          </div>
        </div>
      </div>
    );
  }

  if (showUserInfoForm)
    return <MsoUserInfoForm {...{ ...selectedPlan, countries, country, setIsModalOpen }} />;

  return (
    <div className="grid grid-cols-12">
      <div className="grid col-span-8 col-start-3">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Select
              className="country-select"
              options={countries}
              value={country}
              onChange={setCountry}
              placeholder="Select country of residence"
            />
            <input
              onChange={() => {}}
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0, width: '100%', position: 'absolute', top: 44 }}
              value={country}
              required
            />
          </div>

          {renderFormBody()}
          {renderActionButtons()}
        </form>
      </div>
    </div>
  );
};
export default MsoCountrySelector;
