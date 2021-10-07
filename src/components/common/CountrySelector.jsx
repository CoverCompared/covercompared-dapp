import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { CheckCircleIcon } from '@heroicons/react/outline';

import DeviceBuyBox from '../DeviceBuyBox';

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

const CountrySelector = ({ setIsModalOpen }) => {
  const [country, setCountry] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const allCountries = useMemo(() => countryList().getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCountry && userEmail) return setShowSuccess(true);
    return setShowDeviceForm(true);
  };

  const renderFormBody = () => {
    if (country?.value === 'NOT')
      return (
        <div className="mt-6">
          <div className="text-center mb-3">
            <h5 className="font-Montserrat font-semibold text-h6">
              Please fill your information in form below
            </h5>
            <h6 className="font-Montserrat font-medium text-body-lg">
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
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0, width: '100%', position: 'absolute', top: 37 }}
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
            className="w-full rounded-md border border-gray-300 focus:border-blue-border h-9 mt-2"
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
        <h5 className="text-Montserrat text-3xl">Thank you!</h5>
        <p className="text-md">Your information has been submitted successfully</p>
        <p className="text-md">
          You will receive an email when this policy is available in your country
        </p>
      </div>
    );
  }

  if (showDeviceForm) return <DeviceBuyBox />;

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
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0, width: '100%', position: 'absolute', top: 37 }}
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
export default CountrySelector;
