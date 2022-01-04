import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { submitUserCountry } from '../../redux/actions/EligibilityChecker';

const countries = [
  { value: 'SWE', label: 'Switzerland' },
  { value: 'TUR', label: 'Turkey' },
  { value: 'POL', label: 'Poland' },
  { value: 'KEN', label: 'Kenya' },
  { value: 'NER', label: 'Nigeria' },
  { value: 'EST', label: 'Estonia' },
  { value: 'DEU', label: 'Germany' },
  { value: 'SVN', label: 'Slovenia' },
  { value: 'ZAF', label: 'South Africa' },
  { value: 'RUS', label: 'Russia' },
  { value: 'ARE', label: 'United Arab Emirates' },
  { value: 'BHR', label: 'Bahrain' },
  { value: 'OMN', label: 'Oman' },
  { value: 'KWT', label: 'Kuwait' },
  { value: 'SAU', label: 'Saudi Arabia' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'NOT', label: 'None of Them' },
];

const MsoEligibilityChecker = ({ setIsModalOpen, setIsEligible, onClose, setTitle }) => {
  const dispatch = useDispatch();

  const [country, setCountry] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const allCountries = useMemo(
    () =>
      countryList()
        .getData()
        .filter((f) => !countries.find((ct) => ct.label === f.label)),
    [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userCountry && userEmail) {
      setShowSuccess(true);
      setTitle('');
      dispatch(
        submitUserCountry({
          product_type: 'mso_policy',
          country: userCountry.value,
          email: userEmail,
        }),
      );
      return;
    }

    setIsEligible(true);
    if (onClose) onClose();
  };

  const renderFormBody = () => {
    if (country?.value === 'NOT')
      return (
        <div className="mt-6">
          <div className="text-center mb-3">
            <h5 className="font-Montserrat font-semibold text-h6 dark:text-white">
              If your country of residence is not listed, please share it with us
            </h5>
          </div>

          <div className="relative">
            <Select
              className="country-select"
              options={allCountries}
              value={userCountry}
              onChange={setUserCountry}
              placeholder="Your country of residence"
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
        submit
      </button>
    );
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CheckCircleIcon className="w-28 h-28 text-green-500" />
        <h5 className="font-Montserrat text-3xl my-3 dark:text-white">
          Thank you for sharing your details
        </h5>
        <p className="font-Inter text-counter-card-text dark:text-white text-body-md text-center">
          Medical Second Opinion products are currently unavailable in your country, we will let you
          know once they are available.
        </p>
      </div>
    );
  }

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
              placeholder="country of residence"
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
export default MsoEligibilityChecker;
